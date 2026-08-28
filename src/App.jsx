import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import store from './store/store';
import theme from './theme';
import EmployeeManagementPage from './pages/EmployeeManagementPage';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <EmployeeManagementPage />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
