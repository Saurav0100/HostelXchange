# 🏠 HostelXChange

> A smart hostel and PG discovery platform designed to help students find, compare, and connect with suitable accommodation.

---

## 📌 Overview

**HostelXChange** is a MERN-stack web application designed to simplify the process of finding student accommodation.

Students often have to search through multiple websites, contact different hostel owners, compare prices manually, and depend on incomplete information. HostelXChange aims to bring these activities together in one platform.

The platform allows students to:

- Search for hostels and PGs
- Filter accommodation based on their preferences
- View detailed hostel information
- Compare different hostels
- Check facilities and ratings
- Contact hostel owners
- Send booking/enquiry requests
- Review hostel experiences

Hostel and PG owners can use the platform to list and manage their properties and connect with students.

---

## 🎯 Project Objective

The main objective of HostelXChange is to create a centralized digital platform that makes student accommodation discovery:

- Simple
- Fast
- Transparent
- Convenient
- Student-friendly

---

## 🚀 Planned Features

### 👨‍🎓 Student Features

- User registration and login
- Search hostels by city, location, or college
- Filter hostels by:
  - Price
  - Gender
  - Room type
  - Facilities
- View hostel details
- Compare multiple hostels
- Save preferred hostels
- Send booking/enquiry requests
- View booking status
- Submit ratings and reviews
- Hostel/room transfer and exchange listings

### 🏢 Hostel Owner Features

- Owner registration and login
- Owner dashboard
- Add hostel/PG listings
- Upload property details and images
- Set room types and rent
- Manage hostel facilities
- Edit and delete listings
- View student enquiries
- Accept or reject booking requests

### 🛡️ Admin Features

- Admin dashboard
- Manage users
- Manage hostel listings
- Approve or remove listings
- Manage reviews
- Handle reported content

---

## 🧑‍💻 Technology Stack

### Frontend

- React.js
- React Router
- Axios
- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication & Security

- JWT (JSON Web Token)
- bcrypt.js
- Environment variables

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman
- MongoDB Atlas

---

## 🏗️ Project Architecture

```text
                    HOSTELXCHANGE
                          |
             ┌────────────┴────────────┐
             |                         |
          FRONTEND                  BACKEND
           React                    Node.js
             |                     Express.js
             |                         |
             └──────── REST API ───────┘
                           |
                        MongoDB
