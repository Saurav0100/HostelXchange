const hostels = [
  {
    id: 1,
    name: "Sunrise Boys Hostel",
    location: "Andheri East, Mumbai",
    city: "Mumbai",
    address: "Near Western Express Highway, Andheri East, Mumbai",
    rent: 8000,
    distance: "1.2 km",
    rating: 4.3,
    reviews: 128,
    gender: "Boys",
    roomType: "Double",
    facilities: [
      "Wi-Fi",
      "Food",
      "CCTV",
      "Laundry",
      "Power Backup",
    ],
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80",
    description:
      "Sunrise Boys Hostel offers comfortable accommodation for students with essential facilities, easy transportation and convenient access to nearby colleges and daily-use services.",
    rules: [
      "Valid student ID required",
      "No smoking",
      "No illegal activities",
      "Entry closes at 11:00 PM",
    ],
    roomOptions: [
      {
        type: "Single",
        price: 11000,
      },
      {
        type: "Double",
        price: 8000,
      },
      {
        type: "Triple",
        price: 6500,
      },
    ],
  },

  {
    id: 2,
    name: "Green View PG",
    location: "Kothrud, Pune",
    city: "Pune",
    address: "Paud Road, Kothrud, Pune",
    rent: 7500,
    distance: "0.8 km",
    rating: 4.5,
    reviews: 96,
    gender: "Girls",
    roomType: "Double",
    facilities: [
      "Wi-Fi",
      "AC",
      "Food",
      "CCTV",
      "Laundry",
    ],
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80",
    description:
      "Green View PG provides comfortable rooms and useful facilities for students looking for a convenient stay in Pune.",
    rules: [
      "Student ID required",
      "No smoking",
      "Maintain hostel cleanliness",
      "Visitors allowed during permitted hours",
    ],
    roomOptions: [
      {
        type: "Single",
        price: 10500,
      },
      {
        type: "Double",
        price: 7500,
      },
      {
        type: "Triple",
        price: 6000,
      },
    ],
  },

  {
    id: 3,
    name: "Student Nest",
    location: "Powai, Mumbai",
    city: "Mumbai",
    address: "Near IIT Bombay, Powai, Mumbai",
    rent: 6500,
    distance: "1.5 km",
    rating: 4.2,
    reviews: 84,
    gender: "Boys",
    roomType: "Triple",
    facilities: [
      "Wi-Fi",
      "Laundry",
      "CCTV",
      "Power Backup",
    ],
    image:
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=1000&q=80",
    description:
      "Student Nest is designed for students who want affordable accommodation close to educational institutions and public transport.",
    rules: [
      "Student ID required",
      "No smoking",
      "Keep common areas clean",
      "Follow hostel timings",
    ],
    roomOptions: [
      {
        type: "Single",
        price: 9500,
      },
      {
        type: "Double",
        price: 7500,
      },
      {
        type: "Triple",
        price: 6500,
      },
    ],
  },

  {
    id: 4,
    name: "Urban Stay PG",
    location: "Viman Nagar, Pune",
    city: "Pune",
    address: "Viman Nagar Main Road, Pune",
    rent: 9000,
    distance: "1.0 km",
    rating: 4.4,
    reviews: 112,
    gender: "Co-ed",
    roomType: "Single",
    facilities: [
      "Wi-Fi",
      "AC",
      "Laundry",
      "CCTV",
      "Parking",
    ],
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
    description:
      "Urban Stay PG offers modern accommodation with useful facilities and convenient connectivity for students in Pune.",
    rules: [
      "Valid ID required",
      "No smoking",
      "Follow property guidelines",
      "Maintain cleanliness",
    ],
    roomOptions: [
      {
        type: "Single",
        price: 9000,
      },
      {
        type: "Double",
        price: 7000,
      },
    ],
  },

  {
    id: 5,
    name: "Campus Comfort",
    location: "Thane West, Mumbai",
    city: "Mumbai",
    address: "Near Thane Station, Thane West, Mumbai",
    rent: 5500,
    distance: "2.1 km",
    rating: 4.0,
    reviews: 67,
    gender: "Boys",
    roomType: "Triple",
    facilities: [
      "Wi-Fi",
      "Food",
      "CCTV",
    ],
    image:
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1000&q=80",
    description:
      "Campus Comfort provides budget-friendly accommodation for students who want essential facilities at an affordable price.",
    rules: [
      "Student ID required",
      "No smoking",
      "Follow entry timings",
      "Keep rooms clean",
    ],
    roomOptions: [
      {
        type: "Double",
        price: 6500,
      },
      {
        type: "Triple",
        price: 5500,
      },
    ],
  },

  {
    id: 6,
    name: "Elite Student Living",
    location: "Baner, Pune",
    city: "Pune",
    address: "Baner Road, Pune",
    rent: 12000,
    distance: "1.4 km",
    rating: 4.7,
    reviews: 143,
    gender: "Girls",
    roomType: "Single",
    facilities: [
      "Wi-Fi",
      "AC",
      "Food",
      "Laundry",
      "CCTV",
      "Parking",
    ],
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80",
    description:
      "Elite Student Living provides premium accommodation with modern facilities for students looking for a comfortable living experience.",
    rules: [
      "Valid student ID required",
      "No smoking",
      "No unauthorized guests",
      "Follow property timings",
    ],
    roomOptions: [
      {
        type: "Single",
        price: 12000,
      },
      {
        type: "Double",
        price: 9000,
      },
    ],
  },
];

export default hostels;