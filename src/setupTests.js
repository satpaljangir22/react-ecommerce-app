// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login";
import ChangePassword from "./components/ChangePassword";
import ForgotPassword from "./components/ForgotPassword";
import OrderSuccess from "./components/OrderSuccess";

// Login Component Tests
test("renders Login component", () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByText(/Change Password/i)).toBeInTheDocument();
  expect(screen.getByText(/Forgot Password/i)).toBeInTheDocument();
});

test("handles form submission in Login component", () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: "password" },
  });
  fireEvent.click(screen.getByText(/Next/i));

  // Add assertions for form submission logic
});

// ChangePassword Component Tests
test("renders ChangePassword component", () => {
  render(
    <Router>
      <ChangePassword />
    </Router>
  );

  expect(screen.getByText(/Change Password/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Current Password/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Confirm New Password/i)).toBeInTheDocument();
});

test("handles form submission in ChangePassword component", () => {
  render(
    <Router>
      <ChangePassword />
    </Router>
  );

  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Current Password/i), {
    target: { value: "currentpassword" },
  });
  fireEvent.change(screen.getByLabelText(/New Password/i), {
    target: { value: "newpassword" },
  });
  fireEvent.change(screen.getByLabelText(/Confirm New Password/i), {
    target: { value: "newpassword" },
  });
  fireEvent.click(screen.getByText(/Change Password/i));

  // Add assertions for form submission logic
});

// ForgotPassword Component Tests
test("renders ForgotPassword component", () => {
  render(
    <Router>
      <ForgotPassword />
    </Router>
  );

  expect(screen.getByText(/Forgot Password/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByText(/Send Reset Email/i)).toBeInTheDocument();
});

test("handles form submission in ForgotPassword component", () => {
  render(
    <Router>
      <ForgotPassword />
    </Router>
  );

  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.click(screen.getByText(/Send Reset Email/i));

  // Add assertions for form submission logic
});

// OrderSuccess Component Tests
test("renders OrderSuccess component", () => {
  const state = {
    cart: [
      {
        name: "Product 1",
        description: "Description 1",
        price: 10,
        image: "image1.jpg",
      },
      {
        name: "Product 2",
        description: "Description 2",
        price: 20,
        image: "image2.jpg",
      },
    ],
    orderNumber: "ORD123456",
    userId: "user123",
  };

  render(
    <Router>
      <OrderSuccess location={{ state }} />
    </Router>
  );

  expect(screen.getByText(/Order Success/i)).toBeInTheDocument();
  expect(
    screen.getByText(/Your order has been placed successfully!/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/Order Number: ORD123456/i)).toBeInTheDocument();
  expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Product 2/i)).toBeInTheDocument();
  expect(screen.getByText(/Continue Shopping/i)).toBeInTheDocument();
});
