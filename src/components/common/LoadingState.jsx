import React from 'react';
import { Box, CircularProgress, Typography, Skeleton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export const LoadingState = ({ message = 'Loading employee data...', type = 'table' }) => {
  if (type === 'table') {
    return (
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Skeleton variant="text" width={100} height={24} /></TableCell>
              <TableCell><Skeleton variant="text" width={140} height={24} /></TableCell>
              <TableCell><Skeleton variant="text" width={100} height={24} /></TableCell>
              <TableCell><Skeleton variant="text" width={80} height={24} /></TableCell>
              <TableCell align="right"><Skeleton variant="text" width={80} height={24} /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2, 3, 4, 5].map((row) => (
              <TableRow key={row}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Skeleton variant="circular" width={36} height={36} />
                    <Skeleton variant="text" width={120} height={20} />
                  </Box>
                </TableCell>
                <TableCell><Skeleton variant="text" width={160} height={20} /></TableCell>
                <TableCell><Skeleton variant="text" width={110} height={20} /></TableCell>
                <TableCell><Skeleton variant="text" width={90} height={20} /></TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Skeleton variant="rectangular" width={32} height={32} sx={{ borderRadius: 1 }} />
                    <Skeleton variant="rectangular" width={32} height={32} sx={{ borderRadius: 1 }} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        gap: 2,
      }}
    >
      <CircularProgress color="primary" size={40} />
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingState;
