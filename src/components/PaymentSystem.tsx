
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Receipt, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentSystem = () => {
  const { toast } = useToast();
  const [paymentMode, setPaymentMode] = useState("");
  const [amount, setAmount] = useState("");

  const pendingPayments = [
    {
      id: 1,
      guest: "Rajesh Kumar",
      room: "101",
      amount: 4735,
      dueDate: "2024-07-02",
      type: "Room Charges",
      status: "Overdue"
    },
    {
      id: 2,
      guest: "Milk Mist Company",
      room: "205-207",
      amount: 15000,
      dueDate: "2024-07-05",
      type: "Corporate Booking",
      status: "Due Soon"
    }
  ];

  const recentPayments = [
    {
      id: 1,
      guest: "Priya Sharma",
      amount: 2500,
      mode: "UPI",
      time: "2 hours ago",
      receipt: "RCP001"
    },
    {
      id: 2,
      guest: "ABC Corp",
      amount: 8500,
      mode: "Bank Transfer",
      time: "5 hours ago",
      receipt: "RCP002"
    }
  ];

  const handlePayment = () => {
    if (!paymentMode || !amount) {
      toast({
        title: "Error",
        description: "Please select payment mode and enter amount",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Payment Processed",
      description: `₹${amount} received via ${paymentMode}`,
    });
    setAmount("");
    setPaymentMode("");
  };

  return (
    <div className="space-y-6">
      {/* Quick Payment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Quick Payment Processing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Payment Mode</Label>
              <Select value={paymentMode} onValueChange={setPaymentMode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Guest/Company</Label>
              <Input placeholder="Enter name" />
            </div>
            <div className="flex items-end">
              <Button onClick={handlePayment} className="w-full">
                Process Payment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Payments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            Pending Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest/Company</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.guest}</TableCell>
                  <TableCell>{payment.room}</TableCell>
                  <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{payment.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant={payment.status === "Overdue" ? "destructive" : "secondary"}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-x-2">
                      <Button size="sm">Collect</Button>
                      <Button size="sm" variant="outline">Remind</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Recent Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">{payment.guest}</p>
                    <p className="text-sm text-gray-600">{payment.mode} • {payment.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">₹{payment.amount.toLocaleString()}</p>
                  <Button size="sm" variant="outline">
                    <Receipt className="h-3 w-3 mr-1" />
                    Print Receipt
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSystem;
