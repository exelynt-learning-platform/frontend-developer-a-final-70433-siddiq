import React from 'react';
import { Paper, Box, Typography, Button, Alert, AlertTitle } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';

export const ErrorState = ({ message = 'Failed to load employee details.', onRetry }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        textAlign: 'center',
        border: '1px border #FEE2E2',
        bgcolor: '#FEF2F2',
        borderRadius: 3,
        my: 2,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
        <ErrorOutlineIcon sx={{ fontSize: 48, color: 'error.main' }} />
        <Typography variant="h6" color="error.dark" sx={{ fontWeight: 600 }}>
          Something went wrong
        </Typography>
        <Typography variant="body2" color="error.main" sx={{ maxWidth: 450 }}>
          {message}
        </Typography>
        {onRetry && (
          <Button
            variant="contained"
            color="error"
            startIcon={<RefreshIcon />}
            onClick={onRetry}
            sx={{ mt: 1 }}
          >
            Try Again
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default ErrorState;
