import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useFinancialRecords } from "@/contexts/financial-record-context"
import { ArrowDownIcon, ArrowUpIcon, DollarSign } from "lucide-react"
import { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const DashBoard = () => {
  const { expenseRecords, incomeRecords, savingsGoal, getSavingsGoal } = useFinancialRecords();

  useEffect(() => {
    getSavingsGoal();
  }, []);

  const totalExpenses = expenseRecords.reduce((sum, record) => sum + record.amount, 0);
  const totalIncome = incomeRecords.reduce((sum, record) => sum + record.amount, 0);
  const remainingBudget = totalIncome - totalExpenses;

  const [timeframe, setTimeframe] = useState("monthly");

  const categoryData = expenseRecords.reduce((acc, record) => {
    const category = acc.find((cat) => cat.name === record.category);
    if (category) {
      category.value += record.amount;
    } else {
      acc.push({ name: record.category, value: record.amount });
    }
    return acc;
  }, []);

  const largestExpense = categoryData.reduce((max, category) => 
    category.value > max.value ? category : max
  , { name: '', value: 0 });

  // Prepare expense data with all months
  const expenseData = MONTHS.map((month) => {
    const record = expenseRecords.find((record) => new Date(record.date).toLocaleString('default', { month: 'short' }) === month);
    return {
      month,
      amount: record ? record.amount : 0, // default to 0 if no record found
    };
  });

  const recentTransactions = expenseRecords.map((transaction) => ({
    id: transaction.id,
    description: transaction.description,
    date: new Date(transaction.date).toLocaleDateString('en-GB'),
    amount: transaction.amount,
  }));

  // Prepare income vs expenses data with all months
  const incomeVsExpensesData = MONTHS.map((month) => {
    const incomeRecord = incomeRecords.find((record) => new Date(record.date).toLocaleString('default', { month: 'short' }) === month);
    const expenseRecord = expenseRecords.find((record) => new Date(record.date).toLocaleString('default', { month: 'short' }) === month);

    return {
      month,
      income: incomeRecord ? incomeRecord.amount : 0, // default to 0 if no record found
      expenses: expenseRecord ? expenseRecord.amount : 0, // default to 0 if no record found
    };
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Expense Analysis Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalExpenses.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{remainingBudget.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {remainingBudget > 0 ? (
                <span className="text-green-600 flex items-center">
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                  Under budget
                </span>
              ) : (
                <span className="text-red-600 flex items-center">
                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                  Over budget
                </span>
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Largest Expense</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{largestExpense.name}</div>
            <p className="text-xs text-muted-foreground">₹{largestExpense.value.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoryData.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all expenses
            </p>
          </CardContent>
        </Card>
        {savingsGoal && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings Goal</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{savingsGoal.goalName}</div>
              <p className="text-xs text-muted-foreground">
                Target: ₹{savingsGoal.goalAmount.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">
                Monthly savings: ₹{savingsGoal.requiredMonthlySavings.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">
                Additional needed: ₹{savingsGoal.additionalSavingsNeeded.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Expense Trend</CardTitle>
            <CardDescription>Your expenses over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={timeframe} onValueChange={setTimeframe}>
              <TabsList>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
            </Tabs>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expense by Category</CardTitle>
            <CardDescription>Breakdown of your expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Income vs Expenses</CardTitle>
          <CardDescription>Comparison of your income and expenses over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={incomeVsExpensesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>List of your recent transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            {recentTransactions.map((transaction) => (
              <li key={transaction.id} className="flex justify-between py-2 border-b">
                <div>
                  <strong>{transaction.description}</strong>
                  <p className="text-sm text-muted-foreground">{transaction.date}</p>
                </div>
                <span className="font-bold">₹{transaction.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashBoard;
