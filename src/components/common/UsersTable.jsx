import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectUsers,
  selectUsersStatus,
} from '../../store/usersFeature/usersSelectors.js';
import {
  Box,
  CircularProgress,
  Paper,
  TableContainer,
  Typography,
  Pagination,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchUsers } from '../../store/usersFeature/usersThunk.js';
import { AddUserButton } from './AddUserButton.jsx';
import { DisplayUserTable } from './DisplayUserTable.jsx';
import PropTypes from 'prop-types';

export const UsersTable = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const status = useSelector(selectUsersStatus);
  const error = useSelector(selectError);
  const [nextId, setNextId] = useState(0);
  const [userToEdit, setUserToEdit] = useState(null);
  const [initializeId, setInitializeId] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(3);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (users.length > 0 && !initializeId) {
      const maxId = Math.max(...users.map((user) => user.id));
      setNextId(maxId + 1);
      setInitializeId(true);
    }
  }, [users, initializeId]);

  const incrementId = () => {
    setNextId((prevId) => prevId + 1);
  };

  const editUser = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setUserToEdit(userToEdit);
  };

  const removeUserToEdit = () => {
    setUserToEdit(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastRow = page * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <Box component={Paper}>
      <Typography
        variant="h4"
        component={'h2'}
        textAlign={'center'}
        gutterBottom
        color={'primary.contrastText'}
        sx={{ paddingTop: 2 }}
      >
        USERS
      </Typography>
      <TableContainer component={Paper} sx={{ margin: 2, maxWidth: '96%' }}>
        {status === 'loading' && <CircularProgress />}
        {status === 'failed' && (
          <Typography color={'error.main'}>{error}</Typography>
        )}
        {status === 'succeeded' && (
          <DisplayUserTable
            currentUsers={currentUsers}
            editUser={editUser}
            userToEdit={userToEdit}
          />
        )}
      </TableContainer>
      <Pagination
        count={Math.ceil(users.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 2,
        }}
      />
      <AddUserButton
        nextId={nextId}
        incrementId={incrementId}
        userToEdit={userToEdit}
        removeUserToEdit={removeUserToEdit}
      />
    </Box>
  );
};
UsersTable.propTypes = {
  searchQuery: PropTypes.string,
};
