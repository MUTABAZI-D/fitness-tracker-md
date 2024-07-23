import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
} from '@mui/material';

import { UserActionMenu } from './UserActionMenu.jsx';
export const DisplayUserTable = ({ currentUsers, editUser, userToEdit }) => {
  return (
    <Table aria-label="simple table" stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Age</TableCell>
          <TableCell>Weight</TableCell>
          <TableCell>Height</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Email</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {currentUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.age}</TableCell>
            <TableCell>{user.weight}</TableCell>
            <TableCell>{user.height}</TableCell>
            <TableCell>{user.location}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>
              <Stack
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {user.email}{' '}
                <UserActionMenu
                  userId={user.id}
                  editUser={editUser}
                  userToEdit={userToEdit}
                />
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

DisplayUserTable.propTypes = {
  currentUsers: PropTypes.array.isRequired,
  editUser: PropTypes.func.isRequired,
  userToEdit: PropTypes.object,
};
