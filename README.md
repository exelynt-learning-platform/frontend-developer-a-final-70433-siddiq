# Employee Management Application

A production-quality, fully responsive Employee Management Web Application built with **React**, **Redux Toolkit**, **Material UI (MUI v5)**, **React Hook Form**, **Axios**, and **Vitest**.

---

## Features

- **Employee Directory**: Responsive table view for desktop and card layout for mobile devices displaying Employee Name, Email, Mobile, Country, State, and District.
- **Search Employee by ID**: Real-time ID search connecting to backend API with clear "Employee not found." feedback on invalid or non-existent IDs.
- **Add Employee**: Modal form with validation for creating new employee records with instant Redux state update.
- **Edit Employee**: Pre-populated form loading existing employee details for seamless updates.
- **Delete Employee with Confirmation**: Modal confirmation dialog ("Are you sure you want to delete this employee?") before executing deletion via API.
- **Country API Integration**: Dedicated Country slice loading dynamic country list for form dropdowns.
- **State Management**: Redux Toolkit slices (`employeeSlice` and `countrySlice`) managing async thunks, loading states, error states, and local CRUD state updates.
- **Form Validation**: React Hook Form with field length rules, email format regex, phone number length checks, and inline validation messages.
- **Feedback & Notifications**: Loading skeletons, spinners, retry banners, and auto-dismissing success/error toast snackbars.
- **Unit Testing**: Vitest and React Testing Library suite covering components, Redux state reducers, thunk actions, form validations, search flows, and API services.

---

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`), React-Redux (`react-redux`)
- **UI Library**: Material UI (`@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`)
- **Form Handling**: React Hook Form (`react-hook-form`)
- **HTTP Client**: Axios (`axios`)
- **Testing**: Vitest, React Testing Library (`@testing-library/react`), `@testing-library/user-event`, jsdom

---

## API Endpoints

The application integrates with the following endpoints:

| Feature | Method | Endpoint |
|---|---|---|
| Fetch Countries | `GET` | `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country` |
| Get All Employees | `GET` | `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee` |
| Get Employee by ID | `GET` | `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/:id` |
| Create Employee | `POST` | `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee` |
| Update Employee | `PUT` | `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/:id` |
| Delete Employee | `DELETE` | `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/:id` |

---

## Project Structure

```
d:/assessment_new/
├── index.html
├── package.json
├── README.md
├── vite.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── theme.js
    ├── test/
    │   └── setup.js
    ├── services/
    │   ├── apiClient.js
    │   ├── countryService.js
    │   ├── employeeService.js
    │   └── __tests__/
    │       ├── countryService.test.js
    │       └── employeeService.test.js
    ├── store/
    │   ├── store.js
    │   ├── countrySlice.js
    │   ├── employeeSlice.js
    │   └── __tests__/
    │       ├── countrySlice.test.js
    │       └── employeeSlice.test.js
    ├── components/
    │   ├── common/
    │   │   ├── Header.jsx
    │   │   ├── LoadingState.jsx
    │   │   ├── ErrorState.jsx
    │   │   └── EmptyState.jsx
    │   └── employee/
    │       ├── EmployeeTable.jsx
    │       ├── EmployeeForm.jsx
    │       ├── EmployeeSearch.jsx
    │       ├── EmployeeSearchResult.jsx
    │       ├── DeleteConfirmationDialog.jsx
    │       └── __tests__/
    │           ├── EmployeeTable.test.jsx
    │           ├── EmployeeForm.test.jsx
    │           ├── EmployeeSearch.test.jsx
    │           ├── EmployeeSearchResult.test.jsx
    │           └── DeleteConfirmationDialog.test.jsx
    └── pages/
        └── EmployeeManagementPage.jsx
```

---

## Installation

Install project dependencies:

```bash
npm install
```

---

## Development

Start the Vite development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Testing

Run unit tests with Vitest:

```bash
npm test
```

To run tests in watch mode:

```bash
npm run test:watch
```

---

## Build

Build production bundle:

```bash
npm run build
```

---

## Architecture Overview

### Smart & Dumb Component Architecture
- **Smart Container (`EmployeeManagementPage.jsx`)**: Manages Redux state selectors, dispatches thunk actions (`fetchEmployees`, `createEmployee`, `updateEmployee`, `deleteEmployee`, `fetchEmployeeById`, `fetchCountries`), and passes state & handlers to dumb components.
- **Dumb Components**: Presentation-only components (`EmployeeTable`, `EmployeeForm`, `EmployeeSearch`, `EmployeeSearchResult`, `DeleteConfirmationDialog`, `Header`, `LoadingState`, `ErrorState`, `EmptyState`) focusing purely on UI, user interactions, and prop callbacks.

### API Service Layer
- Centralized Axios instance (`apiClient.js`) handles timeout, headers, and error standardization.
- Services (`employeeService.js`, `countryService.js`) encapsulate HTTP operations, separating API endpoints from React components and Redux slices.

### Redux State Management
- `employeeSlice`: Handles employee list (`employees`), ID search (`searchResult`, `searchStatus`, `searchError`), selected record for editing (`selectedEmployee`), loading flags, and error states. Optimistically updates local state upon successful CRUD operations.
- `countrySlice`: Manages country array fetched from API for country selection controls.

### Form Validation
- Uses `react-hook-form` to manage form state and validation rules:
  - **Name**: Required, 2-50 characters.
  - **Email**: Required, valid email pattern, max 100 characters.
  - **Mobile**: Required, 10-15 digits.
  - **Country**: Required, selectable via MUI Autocomplete.
  - **State & District**: Required, 2-50 characters.
