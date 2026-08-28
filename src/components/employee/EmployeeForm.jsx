import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Autocomplete,
  CircularProgress,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const EmployeeForm = ({
  open,
  onClose,
  onSubmit,
  initialData = null,
  countries = [],
  countryLoading = false,
  isSubmitting = false,
}) => {
  const isEditMode = Boolean(initialData?.id);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      country: '',
      state: '',
      district: '',
    },
  });

  // Pre-populate form when initialData changes
  useEffect(() => {
    if (open) {
      if (initialData) {
        reset({
          name: initialData.name || '',
          email: initialData.email || initialData.emailId || '',
          mobile: initialData.mobile || '',
          country: initialData.country || '',
          state: initialData.state || '',
          district: initialData.district || '',
        });
      } else {
        reset({
          name: '',
          email: '',
          mobile: '',
          country: '',
          state: '',
          district: '',
        });
      }
    }
  }, [open, initialData, reset]);

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Dialog
      open={open}
      onClose={isSubmitting ? undefined : onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {isEditMode ? 'Edit Employee Record' : 'Add New Employee'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {isEditMode ? `Updating ID #${initialData?.id}` : 'Fill in the details to create a new employee.'}
          </Typography>
        </Box>
        <IconButton onClick={onClose} disabled={isSubmitting} aria-label="close dialog">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <DialogContent dividers sx={{ py: 3 }}>
          <Grid container spacing={2}>
            {/* Name Field */}
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: 'Full name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' },
                  maxLength: { value: 50, message: 'Name cannot exceed 50 characters' },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Full Name"
                    placeholder="John Doe"
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                    disabled={isSubmitting}
                    required
                  />
                )}
              />
            </Grid>

            {/* Email Field */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email address is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Please enter a valid email address',
                  },
                  maxLength: { value: 100, message: 'Email cannot exceed 100 characters' },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    disabled={isSubmitting}
                    required
                  />
                )}
              />
            </Grid>

            {/* Mobile Field */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="mobile"
                control={control}
                rules={{
                  required: 'Mobile phone number is required',
                  pattern: {
                    value: /^[0-9+\s-]{10,15}$/,
                    message: 'Enter a valid 10-15 digit mobile number',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Mobile Number"
                    placeholder="9876543210"
                    error={Boolean(errors.mobile)}
                    helperText={errors.mobile?.message}
                    disabled={isSubmitting}
                    required
                  />
                )}
              />
            </Grid>

            {/* Country Field (MUI Autocomplete) */}
            <Grid item xs={12}>
              <Controller
                name="country"
                control={control}
                rules={{ required: 'Country selection is required' }}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={countries.map((c) => (typeof c === 'string' ? c : c.country))}
                    loading={countryLoading}
                    value={value || null}
                    onChange={(_, newValue) => onChange(newValue || '')}
                    disabled={isSubmitting}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Country"
                        placeholder="Select or type country"
                        required
                        error={Boolean(errors.country)}
                        helperText={errors.country?.message}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {countryLoading ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            {/* State Field */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="state"
                control={control}
                rules={{
                  required: 'State is required',
                  minLength: { value: 2, message: 'State must be at least 2 characters' },
                  maxLength: { value: 50, message: 'State cannot exceed 50 characters' },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="State"
                    placeholder="California / Karnataka"
                    error={Boolean(errors.state)}
                    helperText={errors.state?.message}
                    disabled={isSubmitting}
                    required
                  />
                )}
              />
            </Grid>

            {/* District Field */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="district"
                control={control}
                rules={{
                  required: 'District is required',
                  minLength: { value: 2, message: 'District must be at least 2 characters' },
                  maxLength: { value: 50, message: 'District cannot exceed 50 characters' },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="District"
                    placeholder="Los Angeles / Udupi"
                    error={Boolean(errors.district)}
                    helperText={errors.district?.message}
                    disabled={isSubmitting}
                    required
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} disabled={isSubmitting} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : null}
          >
            {isSubmitting ? (isEditMode ? 'Updating...' : 'Saving...') : isEditMode ? 'Update Employee' : 'Create Employee'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default EmployeeForm;
