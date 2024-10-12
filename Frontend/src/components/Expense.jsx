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
import PropTypes from 'prop-types';
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useFinancialRecords } from "../contexts/financial-record-context";

// Define the schema for form validation
const formSchema = z.object({
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  amount: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Amount must be a positive number.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  paymentMethod: z.string().min(1, {
    message: "Please select a payment method.",
  }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please select a valid date.",
  }),
});
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-GB');
};
// EditableCard component for displaying and editing expense records
const EditableCard = ({ record, updateRecord, deleteRecord }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(record.description);
  const [amount, setAmount] = useState(record.amount);
  const [category, setCategory] = useState(record.category);
  const [paymentMethod, setPaymentMethod] = useState(record.paymentMethod);
  const [date, setDate] = useState(new Date(record.date).toISOString().split('T')[0])

  const handleUpdate = () => {
    updateRecord(record._id, {
      ...record,
      description,
      amount: parseFloat(amount),
      category,
      paymentMethod,
      date: new Date(date), // Include date in the update
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
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              placeholder="Payment Method"
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
            <p><strong>Payment Method:</strong> {paymentMethod}</p>
            <p><strong>Date:</strong> {formatDate(date)}</p> {/* Display date */}
            <Button onClick={() => setIsEditing(true)} className="mr-2 mt-2">
              Edit
            </Button>
            <Button onClick={() => {
              const recordId = record._id ?? "";
              console.log("Deleting record with id:", recordId);
              deleteRecord(recordId);
            }} variant="destructive" className="mt-2">
              Delete
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

// FinancialRecordList component for displaying a list of expense records
const FinancialRecordList = () => {
  const { expenseRecords, updateExpenseRecord, deleteExpenseRecord } = useFinancialRecords();

  return (
    <div className="space-y-4 overflow-y-auto max-h-[600px] pr-4">
      {expenseRecords.map((expenseRecord) => (
        <EditableCard
          key={expenseRecord._id}
          record={expenseRecord}
          updateRecord={updateExpenseRecord}
          deleteRecord={deleteExpenseRecord}
        />
      ))}
    </div>
  );
};

// ExpenseForm component for adding new expense records
export function ExpenseForm() {
  const { addExpenseRecord } = useFinancialRecords();
  const { user } = useUser();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: "",
      category: "",
      paymentMethod: "",
      date: "", // Add date to default values
    },
  });

  function onSubmit(values) {
    const newRecord = {
      userId: user?.id ?? "",
      date: values.date, // Set date to the selected date
      description: values.description,
      amount: parseFloat(values.amount),
      category: values.category,
      paymentMethod: values.paymentMethod,
    };

    addExpenseRecord(newRecord);
    form.reset({
      description: "",
      amount: "",
      category: "",
      paymentMethod: "",
      date: "", // Reset date field
    });
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Add Expense Record</CardTitle>
            <CardDescription>Enter the details of your expense.</CardDescription>
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
                        <Input placeholder="Enter expense description" {...field} />
                      </FormControl>
                      <FormDescription>
                        Briefly describe the expense.
                      </FormDescription>
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
                      <FormDescription>
                        Enter the expense amount.
                      </FormDescription>
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
                          <SelectItem value="Food">Food</SelectItem>
                          <SelectItem value="Rent">Rent</SelectItem>
                          <SelectItem value="Utilities">Utilities</SelectItem>
                          <SelectItem value="Entertainment">Entertainment</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the category of the expense.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a payment method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Credit Card">Credit Card</SelectItem>
                          <SelectItem value="Cash">Cash</SelectItem>
                          <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the payment method used.
                      </FormDescription>
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
                      <FormDescription>
                        Select the date of the expense.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Add Expense</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Your Expense Records</CardTitle>
            <CardDescription>View and manage your expense records.</CardDescription>
          </CardHeader>
          <CardContent>
            <FinancialRecordList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Prop Types for EditableCard
EditableCard.propTypes = {
  record: PropTypes.object.isRequired,
  updateRecord: PropTypes.func.isRequired,
  deleteRecord: PropTypes.func.isRequired,
};
