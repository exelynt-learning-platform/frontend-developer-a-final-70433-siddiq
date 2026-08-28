import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export const DeleteConfirmationDialog = ({
  open,
  employee = null,
  onClose,
  onConfirm,
  isDeleting = false,
}) => {
  if (!employee) return null;

  return (
    <Dialog
      open={open}
      onClose={isDeleting ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'error.main', pb: 1 }}>
        <WarningAmberIcon fontSize="large" color="error" />
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
          Confirm Employee Deletion
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          Are you sure you want to delete this employee record?
        </Typography>

        <Box
          sx={{
            p: 2,
            bgcolor: '#FEF2F2',
            border: '1px solid #FEE2E2',
            borderRadius: 2,
            mt: 1.5,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'error.dark' }}>
            {employee.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            ID: #{employee.id} • {employee.email || employee.emailId || 'No Email'}
          </Typography>
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
          This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} disabled={isDeleting} color="inherit">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={isDeleting}
          startIcon={isDeleting ? <CircularProgress size={16} color="inherit" /> : null}
        >
          {isDeleting ? 'Deleting...' : 'Delete Employee'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
