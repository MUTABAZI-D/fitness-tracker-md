import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export const CardComponent = ({ data, title }) => {
  return (
    <Box sx={{ minWidth: 350, marginBottom: 2 }}>
      <Card variant="outlined" sx={{ height: 200 }}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            color={'secondary.main'}
          >
            Registered {title}
          </Typography>
          <Typography>Number: {data.length}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

CardComponent.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
};
