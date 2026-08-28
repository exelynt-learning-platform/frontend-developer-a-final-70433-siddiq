import React from 'react';
import { Paper, Box, Typography, Button } from '@mui/material';
import FolderOffOutlinedIcon from '@mui/icons-material/FolderOffOutlined';
import AddIcon from '@mui/icons-material/Add';

export const EmptyState = ({
  title = 'No employees found',
  description = 'There are no employees registered in the system yet. Click below to add a new employee record.',
  onAddClick,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 6,
        textAlign: 'center',
        border: '1px dashed #CBD5E1',
        bgcolor: '#F8FAFC',
        borderRadius: 3,
        my: 2,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            bgcolor: '#EEF2FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'primary.main',
          }}
        >
          <FolderOffOutlinedIcon sx={{ fontSize: 32 }} />
        </Box>
        <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
          {description}
        </Typography>
        {onAddClick && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={onAddClick}
            sx={{ mt: 1 }}
          >
            Add First Employee
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default EmptyState;
