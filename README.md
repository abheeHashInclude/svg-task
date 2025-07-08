# SVG Test App

## Setup Instructions

1. Install dependencies:
   npm install
2. Start the development server:
   npm start
3. Open http://localhost:3000 in your browser.

## Features
- Role-based authentication (Super Admin, Admin, User)
- Sidebar shows only permitted pages
- User Management (Super Admin only): add, edit, set permissions
- Comments table on each page, with add/edit/delete based on permissions
- Add button on all pages (disabled if no permission)
- Snackbar notifications for errors and permission issues

## Dummy Users

- Super Admin
  - Email: superadmin@example.com
  - Password: user@123
  - Role: superadmin (all permissions, can access User Management)

- Marketing Admin
  - Email: marketing@example.com
  - Password: user@123
  - Role: admin (marketing/media/products pages)

- Sales Admin
  - Email: sales@example.com
  - Password: user@123
  - Role: admin (sales/clients/orders pages)

- Support User
  - Email: support@example.com
  - Password: user@123
  - Role: user (customer support page)

- Basic User
  - Email: user1@example.com
  - Password: user@123
  - Role: user (products list, dashboard)

Note: Only Super Admin can access User Management and all features. All other users have limited permissions.
