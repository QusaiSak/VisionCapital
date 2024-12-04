import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "./components/theme-provider";
import { ExpenseForm } from "./components/Expense";
import { IncomeForm } from "./components/Income";
import LandingPage from "./components/HomePage";
import { useUser } from "@clerk/clerk-react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import { SavingGoal } from "./components/SavingGoal";

function App() {
  const { isSignedIn } = useUser(); 

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Navbar />
      {isSignedIn ? (
        <Routes>
          <Route path="/" element={<DashBoard/>} />
          <Route path="/expense" element={<ExpenseForm/>} />
          <Route path="/income" element={<IncomeForm/>} />
          <Route path="/saving-goal" element={<SavingGoal />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      ) : (
        <LandingPage />
      )}
    </ThemeProvider>
  );
}

export default App;
