import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Spinner = () => {
  return (
    <Box sx={{ display: 'flex', margin: '0 auto', width: 50 }}>
      <CircularProgress />
    </Box>
  );
}