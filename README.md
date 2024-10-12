#  VisionCapital

This project is a modern web application built with Vite, React, Tailwind CSS, and shadcn. It aims to provide a fast and responsive user experience while leveraging the power of Tailwind's utility-first styling approach and shadcn's components.

Getting Started
To get started with this project, you'll need to have Node.js installed on your machine. You can download it from nodejs.org.

# Landing Page
![image](https://github.com/user-attachments/assets/20707ec1-f0a2-40fb-a58d-6fae3d8a5be5)

# Dashboard
![image](https://github.com/user-attachments/assets/1af9da7d-29e3-4786-a7a7-37ebf2081396)

![image](https://github.com/user-attachments/assets/3ca0f0ac-b1df-4960-9b4b-ccf1bf7d0797)

![image](https://github.com/user-attachments/assets/e59161c8-c0af-4d8c-88d5-2c79c41ea1ec)


# Forms
![image](https://github.com/user-attachments/assets/2273a960-df6f-4f47-84f0-9935049f33b0)

![image](https://github.com/user-attachments/assets/059f1dfe-c88f-4c94-97ec-bfc640369f15)


# 🚛Features

- Use of Clerk for easy authentication 
- Light/dark mode toggle
- Responsive across platforms
- Charts to display the income and expense
- CRUD operations

# ⚙ Installation
Follow these steps to set up VisionCapital locally:

1. Clone the repository:
```bash
  git clone https://github.com/QusaiSak/VisionCapital.git
```
2. Install the required dependencies:
```bash
cd frontend
  npm install
cd backend
  npm install
```
3. Set up the configuration file:
- Create an .env file in the backend folder of the VisionCapital
- Update the necessary environment variables in the .env file, such as database credentials and API keys.
```bash
Frontend .env:
REACT_APP_BASE_URL=[http://localhost:3001/financial-records]

Backend .env: 
PORT=3001
MONGO_URI=<MONGO_URI>
```

4. Start the application:
```bash
For frontend: npm run dev 
For backend: node index.js
```

5. Access VisionCapital in your web browser at http://localhost:5173.

# 🏗 Technologies Used
- Front-end: React,TailwindCss,Shadcn/ui
- Back-end: Node.js, Express.js
- Database: MongoDB
- External: Clerk

# 🛡️ License:

This project is licensed under the MIT License


