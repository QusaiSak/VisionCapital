import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useFinancialRecords } from "@/contexts/financial-record-context";
import { useUser } from "@clerk/clerk-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  goalName: z.string().min(2, {
    message: "Goal name must be at least 2 characters.",
  }),
  goalAmount: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Goal amount must be a positive number.",
  }),
  targetDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please select a valid target date.",
  }),
});

export function SavingGoal() {
  const { incomeRecords, expenseRecords, addSavingsGoal, getSavingsGoal } = useFinancialRecords();
  const { user } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    getSavingsGoal();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goalName: "",
      goalAmount: "",
      targetDate: "",
    },
  });

  function onSubmit(values) {
    const goalAmount = parseFloat(values.goalAmount);
    const targetDate = new Date(values.targetDate);
    const today = new Date();
    const monthsUntilTarget = (targetDate.getFullYear() - today.getFullYear()) * 12 + (targetDate.getMonth() - today.getMonth());

    const totalIncome = incomeRecords.reduce((sum, record) => sum + record.amount, 0);
    const totalExpenses = expenseRecords.reduce((sum, record) => sum + record.amount, 0);
    const averageMonthlySavings = (totalIncome - totalExpenses) / incomeRecords.length;

    const requiredMonthlySavings = goalAmount / monthsUntilTarget;
    const additionalSavingsNeeded = Math.max(0, requiredMonthlySavings - averageMonthlySavings);

    const newSavingsGoal = {
      userId: user?.id ?? "",
      goalName: values.goalName,
      goalAmount: goalAmount,
      targetDate: targetDate,
      requiredMonthlySavings: requiredMonthlySavings,
      additionalSavingsNeeded: additionalSavingsNeeded,
    };

    addSavingsGoal(newSavingsGoal);

    toast({
      title: "Savings Goal Calculated",
      description: `To reach your goal of ₹${goalAmount} for ${values.goalName}, you need to save ₹${requiredMonthlySavings.toFixed(2)} monthly. Additional savings needed: ₹${additionalSavingsNeeded.toFixed(2)} per month.`,
    });

    form.reset();
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Set Your Saving Goal</CardTitle>
          <CardDescription>Enter the details of your savings goal.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="goalName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your goal name" {...field} />
                    </FormControl>
                    <FormDescription>What are you saving for?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="goalAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter goal amount" {...field} />
                    </FormControl>
                    <FormDescription>How much do you need to save?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>When do you want to achieve this goal?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Calculate Savings</Button>
            </form>
          </Form>

          {savingsRequired && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Savings Required:</h3>
              <p>Monthly savings needed: ₹{savingsRequired.monthly}</p>
              <p>Additional monthly savings: ₹{savingsRequired.additional}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
