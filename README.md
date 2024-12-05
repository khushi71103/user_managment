# User Management React App

This project is a React application that integrates with the [Reqres API](https://reqres.in/) to perform user management functions such as authentication, user listing, editing, and deletion. The application is responsive and user-friendly, working seamlessly on both desktop and mobile devices.

## Features

1. **Authentication Screen**
   - Login using credentials provided by the API.
   - Stores the authentication token in local storage.

2. **User List Page**
   - Displays a paginated list of users fetched from the API.
   - Allows searching for users by name or email.
   - Supports editing and deleting user data.

3. **Edit User**
   - Opens a modal with a pre-filled form to edit user details.
   - Updates the user details using the API.

4. **Delete User**
   - Deletes a user from the list using the API.

## Installation

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repository-name.git
   cd your-repository-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

### Login
- Use the following credentials to log in:
  - **Email:** eve.holt@reqres.in
  - **Password:** cityslicka

### User List
- View the list of users.
- Use the search bar to filter users by name or email.
- Use the navigation buttons to move between pages.

### Edit User
- Click the "Edit" button to modify user details.
- Save changes to update the user information.

### Delete User
- Click the "Delete" button to remove a user from the list.

## Assumptions

- The token returned during login does not expire within the session.
- The user data is limited to what is provided by the Reqres API.

## Considerations

- Error handling has been implemented for failed API requests.
- UI responsiveness has been ensured for various screen sizes.
- The project adheres to best practices in React component structure and state management.

## Dependencies

- React
- Axios
- React Router DOM
- CSS (custom styles)



## API Endpoints

1. **Login**
   - POST `/api/login`
   - Body: `{ "email": "eve.holt@reqres.in", "password": "cityslicka" }`

2. **Get Users**
   - GET `/api/users?page=1`

3. **Edit User**
   - PUT `/api/users/{id}`

4. **Delete User**
   - DELETE `/api/users/{id}`

## Contributing

Feel free to open issues or create pull requests if you'd like to contribute to this project.
