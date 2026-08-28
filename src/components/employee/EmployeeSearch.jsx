import React, { useState } from 'react';
import { Paper, Box, TextField, Button, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export const EmployeeSearch = ({ onSearch, onClear, isLoading }) => {
  const [searchId, setSearchId] = useState('');
  const [inputError, setInputError] = useState('');

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    const trimmed = searchId.trim();
    if (!trimmed) {
      setInputError('Please enter a valid Employee ID');
      return;
    }
    setInputError('');
    onSearch(trimmed);
  };

  const handleClear = () => {
    setSearchId('');
    setInputError('');
    onClear();
  };

  return (
    <Paper elevation={0} sx={{ p: 2.5, border: '1px solid #E2E8F0', borderRadius: 3, mb: 3 }}>
      <Box
        component="form"
        onSubmit={handleSearchSubmit}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          alignItems: { xs: 'stretch', sm: 'flex-start' },
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search Employee by ID (e.g. 526, 531)"
          value={searchId}
          onChange={(e) => {
            setSearchId(e.target.value);
            if (inputError) setInputError('');
          }}
          error={Boolean(inputError)}
          helperText={inputError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchId ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleClear} aria-label="clear search">
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading || !searchId.trim()}
            startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <SearchIcon />}
            sx={{ px: 3, whiteSpace: 'nowrap' }}
          >
            {isLoading ? 'Searching...' : 'Search ID'}
          </Button>

          {searchId && (
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleClear}
              disabled={isLoading}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Clear
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default EmployeeSearch;
