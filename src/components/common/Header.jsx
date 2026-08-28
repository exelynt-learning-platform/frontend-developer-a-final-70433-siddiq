import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Chip } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddIcon from '@mui/icons-material/Add';

export const Header = ({ totalEmployees = 0, onAddClick }) => {
  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: '1px solid #E2E8F0' }}>
      <Toolbar sx={{ justifyContent: 'space-between', py: 1, px: { xs: 2, sm: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 3,
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
            }}
          >
            <PeopleAltIcon />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" color="text.primary" sx={{ lineHeight: 1.2 }}>
                Employee Portal
              </Typography>
              <Chip
                label={`${totalEmployees} total`}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ fontWeight: 600, fontSize: '0.75rem' }}
              />
            </Box>
            <Typography variant="caption" color="text.secondary">
              Exelynt Corporate Directory & Management System
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onAddClick}
          sx={{
            px: 2.5,
            py: 1,
            fontSize: '0.9rem',
          }}
        >
          Add Employee
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
