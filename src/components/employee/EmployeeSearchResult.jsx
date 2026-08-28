import React from 'react';
import { Paper, Box, Typography, Button, Avatar, Chip, Alert, AlertTitle, Divider, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BadgeIcon from '@mui/icons-material/Badge';

export const EmployeeSearchResult = ({
  searchResult,
  searchStatus,
  searchError,
  onClearSearch,
  onEdit,
  onDelete,
}) => {
  if (searchStatus === 'idle') return null;

  if (searchStatus === 'loading') {
    return (
      <Paper elevation={0} sx={{ p: 4, mb: 3, border: '1px solid #E2E8F0', borderRadius: 3, textAlign: 'center' }}>
        <CircularProgress size={32} color="primary" />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
          Searching employee database...
        </Typography>
      </Paper>
    );
  }

  if (searchStatus === 'not_found' || (searchStatus === 'failed' && !searchResult)) {
    return (
      <Alert
        severity="warning"
        variant="filled"
        sx={{
          mb: 3,
          borderRadius: 3,
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)',
          color: '#FFFFFF',
          bgcolor: '#D97706',
          '& .MuiAlert-icon': { color: '#FFFFFF' },
        }}
        action={
          <Button color="inherit" size="small" onClick={onClearSearch}>
            Dismiss
          </Button>
        }
      >
        <AlertTitle sx={{ fontWeight: 700 }}>Search Result</AlertTitle>
        {searchError || 'Employee not found.'} No matching employee record was found with this ID.
      </Alert>
    );
  }

  if (searchStatus === 'succeeded' && searchResult) {
    const { id, name, email, emailId, mobile, country, state, district, avatar } = searchResult;
    const displayEmail = email || emailId || 'N/A';

    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          border: '2px solid #818CF8',
          borderRadius: 3,
          bgcolor: '#EEF2FF',
          position: 'relative',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src={avatar}
              alt={name}
              sx={{ width: 56, height: 56, bgcolor: 'primary.main', fontSize: '1.2rem', fontWeight: 600 }}
            >
              {name ? name.charAt(0).toUpperCase() : 'E'}
            </Avatar>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700 }}>
                  {name}
                </Typography>
                <Chip
                  label={`ID: ${id}`}
                  size="small"
                  color="primary"
                  icon={<BadgeIcon />}
                  sx={{ fontWeight: 600 }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Search Match Found
              </Typography>
            </Box>
          </Box>

          <Button
            size="small"
            color="inherit"
            startIcon={<ClearIcon />}
            onClick={onClearSearch}
            sx={{ textTransform: 'none', color: 'text.secondary' }}
          >
            Clear Search
          </Button>
        </Box>

        <Divider sx={{ my: 2, borderColor: '#C7D2FE' }} />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 2,
            mb: 2.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              <strong>Email:</strong> {displayEmail}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PhoneIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              <strong>Mobile:</strong> {mobile || 'N/A'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PublicIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              <strong>Country:</strong> {country || 'N/A'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              <strong>State/District:</strong> {[state, district].filter(Boolean).join(', ') || 'N/A'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => onEdit(searchResult)}
          >
            Edit Employee
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => onDelete(searchResult)}
          >
            Delete Employee
          </Button>
        </Box>
      </Paper>
    );
  }

  return null;
};

export default EmployeeSearchResult;
