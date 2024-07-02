# Diagnostic Center Website

## Overview
This is a web application for a diagnostic center where patients can book available medical tests. Users can register, log in, and make payments for their desired tests. The application includes user and admin dashboards, each with specific functionalities.

## About
This diagnostic center website allows patients to easily book medical tests online. The key features include:

- **User Authentication**: Users can register and log in using their email and password through Firebase authentication.
- **Test Booking**: Patients can browse and book various medical tests. After selecting the tests, they can make payments online.
- **User Dashboard**: Each user has access to a personal dashboard where they can view their booked tests and their statuses.
- **Admin Dashboard**: Admins have a special dashboard where they can manage the website's banner, update discounts, and send test reports to users.
- **Secure Payments**: Integrated payment gateway ensures secure transactions for booking tests.
- **Test Report Management**: Admins can upload and send test reports directly to the users through the platform.

## Features
- **User Registration & Login**:
  - New users can register using their email and password.
  - Users can log in with their registered credentials.
- **Booking & Payment**:
  - Users can browse available medical tests.
  - Secure payment integration for booking tests.
  - Post-payment, reservations are added to the user's account.
- **Dashboard**:
  - **User Dashboard**: View booked tests and their statuses.
  - **Admin Dashboard**: Manage website banner, update discounts, and send test reports.
- **Admin Capabilities**:
  - Only admins can change the banner of the website to show discounts.
  - Admins can send test reports directly to users through the platform.

## Technologies Used
- React
- Firebase Authentication
- Firebase Firestore
- Payment Gateway (Specify the one you used, e.g., Stripe, PayPal)
- React Router

## How to Run
To run this project locally, follow these steps:
1. Clone the repository.
   ```bash
   git clone https://github.com/2244jhalak/diagnostic-center-website.git
