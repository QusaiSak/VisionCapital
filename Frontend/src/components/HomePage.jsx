import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, DollarSign, PieChart, Smartphone, TrendingUp } from "lucide-react"
import { Link } from "react-router-dom";
import LogInOut from "./LogInOut";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
      </header>
      <main>
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4">Take Control of Your Finances</h2>
            <p className="text-xl text-muted-foreground mb-8">
              ExpenseTracker helps you manage your money effortlessly, so you can focus on what matters most.
            </p>
            <Button size="lg" asChild>
              <Link to="/">
                Get Started <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Why Choose ExpenseTracker?</h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <DollarSign className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Easy Expense Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Quickly log your expenses and categorize them for better understanding of your spending habits.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <PieChart className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Insightful Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Visualize your spending patterns with intuitive charts and graphs to make informed financial decisions.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <TrendingUp className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Budget Planning</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Set budget goals and track your progress to stay on top of your financial targets.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Smartphone className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Mobile Friendly</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Access your expense data on-the-go with our responsive design that works on any device.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Take Control of Your Finances?</h3>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who have already improved their financial health with ExpenseTracker.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">Start Your Free Trial</Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ExpenseTracker. All rights reserved.
        </div>
      </footer>
    </div>
  )
}