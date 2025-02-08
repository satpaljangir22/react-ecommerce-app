# E-Commerce React App

This project is an E-Commerce application built with React. It includes features such as user registration, login, password management, and order processing.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

## Details of Design

The application is designed with a focus on user experience and ease of use. It includes the following main components:

- **Login**: Allows users to log in with their email and password. If the credentials are correct, an OTP is sent to the user's email for verification.
- **Change Password**: Allows users to change their password by providing their current password and a new password.
- **Forgot Password**: Allows users to reset their password by providing their email. A new random password is sent to the user's email.
- **Order Success**: Displays the order details and a success message after an order is placed.

## Architecture Microservices

The application follows a microservices architecture with the following services:

- **User Service**: Manages user registration, login, and password management.
- **Order Service**: Manages order creation and retrieval.
- **Email Service**: Handles sending emails for OTP and password reset.

Each service is implemented as a separate module and communicates with the others through REST APIs.

## Database Scripts

The application uses MongoDB as the database. Below are the scripts to create the necessary collections and indexes:

```javascript
// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  otp: String,
  otpExpires: Date,
});

// Order Schema
const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      name: String,
      description: String,
      price: Number,
      image: String,
    },
  ],
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now },
});
```
