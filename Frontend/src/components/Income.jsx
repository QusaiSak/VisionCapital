"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useFinancialRecords } from "../contexts/financial-record-context";

// Zod Schema for Validation
const formSchema = z.object({
  description: z.string().min(2, { message: "Description must be at least 2 characters." }),
  amount: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Amount must be a positive number.",
  }),
  category: z.string().min(1, { message: "Please select a category." }),
  incomeSource: z.string().min(1, { message: "Please select an income source." }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Please select a valid date." }),
});

// Helper function to format dates
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB");
};

const EditableCard = ({ record, updateRecord, deleteRecord }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(record.description);
  const [amount, setAmount] = useState(record.amount);
  const [category, setCategory] = useState(record.category);
  const [incomeSource, setIncomeSource] = useState(record.incomeSource);
  const [date, setDate] = useState(new Date(record.date).toISOString().split("T")[0]);

  const handleUpdate = () => {
    updateRecord(record._id, {
      ...record,
      description,
      amount: parseFloat(amount),
      category,
      incomeSource,
      date: new Date(date),
    });
    setIsEditing(false);
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        {isEditing ? (
          <>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="mb-2"
            />
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="mb-2"
            />
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
              className="mb-2"
            />
            <Input
              value={incomeSource}
              onChange={(e) => setIncomeSource(e.target.value)}
              placeholder="Income Source"
              className="mb-2"
            />
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mb-2"
            />
            <Button onClick={handleUpdate} className="mr-2">
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)} variant="outline">
              Cancel
            </Button>
          </>
        ) : (
          <>
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Amount:</strong> ₹{amount}</p>
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Income Source:</strong> {incomeSource}</p>
            <p><strong>Date:</strong> {formatDate(date)}</p>
            <Button onClick={() => setIsEditing(true)} className="mr-2 mt-2">
              Edit
            </Button>
            <Button
              onClick={() => deleteRecord(record._id)}
              variant="destructive"
              className="mt-2"
            >
              Delete
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

const FinancialRecordList = () => {
  const { incomeRecords, updateIncomeRecord, deleteIncomeRecord } = useFinancialRecords();

  return (
    <div className="space-y-4 overflow-y-auto max-h-[600px] pr-4">
      {incomeRecords.map((incomeRecord) => (
        <EditableCard
          key={incomeRecord._id}
          record={incomeRecord}
          updateRecord={updateIncomeRecord}
          deleteRecord={deleteIncomeRecord}
        />
      ))}
    </div>
  );
};

export function IncomeForm() {
  const { addIncomeRecord } = useFinancialRecords();
  const { user } = useUser();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: "",
      category: "",
      incomeSource: "",
      date: "",
    },
  });

  async function onSubmit(values) {
    try {
      const newRecord = {
        userId: user?.id ?? "",
        description: values.description,
        amount: parseFloat(values.amount),
        category: values.category,
        incomeSource: values.incomeSource,
        date: new Date(values.date).toISOString(),
      };

      await addIncomeRecord(newRecord);
      form.reset();
    } catch (error) {
      console.error("Error submitting income record:", error);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Add Income Record</CardTitle>
            <CardDescription>Enter the details of your income.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter income description" {...field} />
                      </FormControl>
                      <FormDescription>Briefly describe the income.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter amount" {...field} />
                      </FormControl>
                      <FormDescription>Enter the income amount.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Salary">Salary</SelectItem>
                          <SelectItem value="Freelance">Freelance</SelectItem>
                          <SelectItem value="Investments">Investments</SelectItem>
                          <SelectItem value="Gifts">Gifts</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Select the category of the income.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="incomeSource"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Income Source</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an income source" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Employment">Employment</SelectItem>
                          <SelectItem value="Self-Employment">Self-Employment</SelectItem>
                          <SelectItem value="Investments">Investments</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Select the source of the income.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>Choose the date of the income record.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Add Income</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Your Income Records</CardTitle>
            <CardDescription>View and manage your income records.</CardDescription>
          </CardHeader>
          <CardContent>
            <FinancialRecordList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// PropTypes for EditableCard
EditableCard.propTypes = {
  record: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    category: PropTypes.string.isRequired,
    incomeSource: PropTypes.string.isRequired,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
  }).isRequired,
  updateRecord: PropTypes.func.isRequired,
  deleteRecord: PropTypes.func.isRequired,
};
