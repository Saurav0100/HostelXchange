# 🏠 HostelXChange

_Have It. Need It. Exchange It._

## 1. About the Project

**HostelXChange** is a hostel-based peer-to-peer marketplace designed for students living in hostels and student accommodations.

The platform allows hostel residents to buy, sell, and rent products from other students within their hostel community. Instead of purchasing new products or searching outside, students can easily find useful second-hand items available within their community.

HostelXChange aims to make student life more affordable, convenient, and sustainable by encouraging the reuse and exchange of products.

## 2. Problem Statement

Students living in hostels often face difficulties when they need everyday products such as books, furniture, electronics, appliances, and other essential items.

Buying new products can be expensive, while unused products often remain unused or get wasted when students leave their hostels.

There is a need for a common platform where hostel residents can connect and exchange products easily and securely.

## 3. Objectives

- To provide a common marketplace for hostel residents.
- To enable students to buy and sell used products.
- To allow students to rent products for temporary use.
- To reduce unnecessary expenses for students.
- To encourage product reuse and reduce waste.
- To build a connected and collaborative hostel community.

## 4. Key Features

- **User Authentication:** Register and log in to the platform.
- **Product Listing:** Users can upload products with images, descriptions, and prices.
- **Buy Products:** Students can browse and purchase products listed by other residents.
- **Sell Products:** Students can list their unused or second-hand products for sale.
- **Rent Products:** Users can list products for rent and find items available for temporary use.
- **Product Categories:** Browse products based on different categories.
- **Search and Filter:** Easily find products using search and filtering options.
- **User Dashboard:** Manage personal listings and account information.
- **Community Marketplace:** Connect buyers and sellers within the hostel community.

## 5. Technology Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Development Tools
- Visual Studio Code
- Git and GitHub
- Postman

## 6. Project Structure

```text
HostelXChange/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
│
└── README.md
```

_Note: The structure may vary depending on the implementation._

## 7. Installation and Setup

Follow these steps to run the project locally.

### Step 1: Clone the Repository

```bash
git clone <repository-url>
```

### Step 2: Navigate to the Project Folder

```bash
cd HostelXChange
```

### Step 3: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 4: Configure Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Add any additional environment variables required by your implementation.

### Step 5: Start the Backend Server

```bash
npm run dev
```

### Step 6: Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### Step 7: Start the Frontend

```bash
npm run dev
```

_The commands above assume the corresponding scripts are configured in the respective `package.json` files._

## 8. Working of the Application

1. Students register or log in to the HostelXChange platform.
2. Users explore products listed by other hostel residents.
3. Students can search and filter products according to their requirements.
4. Interested users can choose to buy or rent available products.
5. Students can also upload their unused products for selling or renting.
6. Users manage their product listings through their dashboard.

## 9. Future Enhancements

- Integrated online payment gateway.
- Real-time chat between buyers and sellers.
- Hostel-based user verification.
- Product reviews and ratings.
- Order and rental management system.
- Wishlist and saved products.
- Notification system.
- Mobile application for Android and iOS.

## 10. Advantages

- Saves money for students.
- Makes buying and selling convenient.
- Provides affordable rental options.
- Promotes reuse of products.
- Reduces unnecessary purchases and waste.
- Builds stronger connections within hostel communities.

## 11. Project Vision

Our vision is to create a connected hostel community where every student can easily find what they need, exchange what they have, and make student life more affordable and sustainable.

**HostelXChange – Have It. Need It. Exchange It.**

---

## 12. License

This project is developed for educational and academic purposes.
