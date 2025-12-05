# 💰 VisionCapital

A modern, full-stack personal finance management application built with React and Node.js. Track your income, expenses, and visualize your financial health with intuitive charts and dashboards.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.x-61dafb)

## ✨ Features

- **📊 Interactive Dashboard** - Visualize your finances with pie charts, line graphs, and bar charts
- **💸 Expense Tracking** - Log and categorize your expenses with payment method tracking
- **💵 Income Management** - Record income from various sources
- **🔐 Secure Authentication** - User authentication powered by Clerk
- **🌙 Dark/Light Mode** - Toggle between themes for comfortable viewing
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices
- **📈 Financial Insights** - View spending patterns, budget status, and recent transactions

## 🏗️ Architecture

```
VisionCapital/
├── Frontend/                 # React.js client application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ui/          # Reusable UI components (shadcn/ui)
│   │   │   ├── DashBoard.jsx
│   │   │   ├── Expense.jsx
│   │   │   ├── Income.jsx
│   │   │   └── ...
│   │   ├── contexts/        # React Context for state management
│   │   ├── hooks/           # Custom React hooks
│   │   └── lib/             # Utility functions
│   └── ...
│
├── Backend/                  # Node.js API server
│   ├── src/
│   │   ├── routes/          # Express route handlers
│   │   └── schema/          # Mongoose database schemas
│   └── index.js             # Server entry point
│
└── README.md
```

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Vite | Build Tool & Dev Server |
| Tailwind CSS | Styling |
| Radix UI / shadcn/ui | UI Components |
| React Router | Client-side Routing |
| Recharts | Data Visualization |
| React Hook Form + Zod | Form Handling & Validation |
| Clerk | Authentication |
| Axios | HTTP Client |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| CORS | Cross-Origin Requests |
| dotenv | Environment Variables |

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/VisionCapital.git
   cd VisionCapital
   ```

2. **Set up the Backend**
   ```bash
   cd Backend
   npm install
   ```

   Create a `.env` file in the Backend directory:
   ```env
   PORT=3001
   mongoURI=your_mongodb_connection_string
   ```

3. **Set up the Frontend**
   ```bash
   cd ../Frontend
   npm install
   ```

   Create a `.env` file in the Frontend directory:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_API_URL=http://localhost:3001
   ```

### Running the Application

1. **Start the Backend server**
   ```bash
   cd Backend
   npm run dev
   ```
   Server will run on `http://localhost:3001`

2. **Start the Frontend development server**
   ```bash
   cd Frontend
   npm run dev
   ```
   Application will be available at `http://localhost:5173`

## 📡 API Endpoints

### Expense Records
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/financial-records/expense/getAllByUserID/:userId` | Get all expenses for a user |
| POST | `/financial-records/expense/` | Create a new expense |
| PUT | `/financial-records/expense/:id` | Update an expense |
| DELETE | `/financial-records/expense/:id` | Delete an expense |

### Income Records
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/financial-records/income/getAllByUserID/:userId` | Get all income for a user |
| POST | `/financial-records/income/` | Create a new income record |
| PUT | `/financial-records/income/:id` | Update an income record |
| DELETE | `/financial-records/income/:id` | Delete an income record |

## 📊 Data Models

### Expense Record
```javascript
{
  userId: String,
  date: Date,
  description: String,
  amount: Number,
  category: String,      // Food, Transportation, Entertainment, etc.
  paymentMethod: String  // Cash, Credit Card, Debit Card, UPI, etc.
}
```

### Income Record
```javascript
{
  userId: String,
  date: Date,
  description: String,
  amount: Number,
  category: String,      // Salary, Freelance, Investments, etc.
  incomeSource: String
}
```

## 🎨 Screenshots

### Dashboard
- Total Expenses & Income overview
- Remaining budget indicator
- Expense breakdown by category (Pie Chart)
- Income vs Expenses trend (Line Chart)
- Monthly expense visualization (Bar Chart)
- Recent transactions list

### Expense/Income Forms
- Easy-to-use forms with validation
- Category and payment method selection
- Date picker for transaction dates
- Real-time record list with edit/delete options

## 🚢 Deployment

The application is configured for deployment on **Vercel**.

### Backend Deployment
The `Backend/vercel.json` is pre-configured:
```json
{
  "version": 2,
  "builds": [{ "src": "index.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "index.js" }]
}
```

### Frontend Deployment
Simply connect your GitHub repository to Vercel and it will auto-detect the Vite configuration.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Qusai Sak**

- GitHub: [@qusaisak](https://github.com/qusaisak)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Clerk](https://clerk.com/) for authentication
- [Recharts](https://recharts.org/) for data visualization
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

<p align="center">Made with ❤️ for better financial management</p>

