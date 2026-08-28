import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  Box,
  Avatar,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';
import LoadingState from '../common/LoadingState';
import ErrorState from '../common/ErrorState';
import EmptyState from '../common/EmptyState';

export const EmployeeTable = ({
  employees = [],
  isLoading,
  error,
  onRetry,
  onEdit,
  onDelete,
  onAddClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isLoading) {
    return <LoadingState type="table" />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (!employees || employees.length === 0) {
    return <EmptyState onAddClick={onAddClick} />;
  }

  // Mobile View: Card List layout
  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {employees.map((emp) => {
          const { id, name, email, emailId, mobile, country, avatar } = emp;
          const displayEmail = email || emailId || 'N/A';

          return (
            <Card
              key={id}
              elevation={0}
              sx={{
                border: '1px solid #E2E8F0',
                borderRadius: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(0,0,0,0.06)',
                },
              }}
            >
              <CardContent sx={{ p: 2.5, pb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar
                    src={avatar}
                    alt={name}
                    sx={{ width: 48, height: 48, bgcolor: 'primary.main', fontWeight: 600 }}
                  >
                    {name ? name.charAt(0).toUpperCase() : 'E'}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                      {name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ID: #{id}
                    </Typography>
                  </Box>
                  {country && (
                    <Chip label={country} size="small" variant="outlined" color="primary" />
                  )}
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmailIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {displayEmail}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PhoneIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {mobile || 'N/A'}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>

              <CardActions sx={{ px: 2.5, pb: 2, pt: 1, justifyContent: 'flex-end', gap: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => onEdit(emp)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => onDelete(emp)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>
    );
  }

  // Desktop / Tablet View: Material UI Table
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ border: '1px solid #E2E8F0', borderRadius: 3, overflow: 'hidden' }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="employee table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Country</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((emp) => {
            const { id, name, email, emailId, mobile, country, avatar } = emp;
            const displayEmail = email || emailId || 'N/A';

            return (
              <TableRow
                key={id}
                hover
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  transition: 'background-color 0.2s',
                }}
              >
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                      src={avatar}
                      alt={name}
                      sx={{ width: 38, height: 38, bgcolor: 'primary.main', fontSize: '0.9rem', fontWeight: 600 }}
                    >
                      {name ? name.charAt(0).toUpperCase() : 'E'}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: #{id}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {displayEmail}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {mobile || 'N/A'}
                  </Typography>
                </TableCell>
                <TableCell>
                  {country ? (
                    <Chip
                      label={country}
                      size="small"
                      sx={{ bgcolor: '#F1F5F9', fontWeight: 500, color: '#334155' }}
                    />
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                    <Tooltip title="Edit Employee">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onEdit(emp)}
                        aria-label={`edit employee ${name}`}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Employee">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDelete(emp)}
                        aria-label={`delete employee ${name}`}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
