
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Search, User, Receipt, AlertCircle, Plus, Minus, CreditCard, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EnhancedCheckOutFormProps {
  userRole: string;
  branch: string;
  isGSTBranch: boolean;
}

const EnhancedCheckOutForm = ({ userRole, branch, isGSTBranch }: EnhancedCheckOutFormProps) => {
  const { toast } = useToast();
  const [searchType, setSearchType] = useState("name");
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [extraNights, setExtraNights] = useState(0);
  const [manualCharges, setManualCharges] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [newChargeDescription, setNewChargeDescription] = useState("");
  const [newChargeAmount, setNewChargeAmount] = useState("");

  // Mock guest data
  const mockGuest = {
    name: "Rajesh Kumar",
    room: "101",
    checkIn: "2024-07-01",
    originalNights: 3,
    rate: 2500,
    baseCharges: [
      { description: "Room Charge (3 nights)", amount: 7500 },
      { description: "Service Charge", amount: 750 }
    ],
    paid: 5000
  };

  const calculateTotal = () => {
    if (!selectedGuest) return { subtotal: 0, gst: 0, total: 0, balance: 0 };
    
    let subtotal = selectedGuest.baseCharges.reduce((sum, charge) => sum + charge.amount, 0);
    
    // Add extra nights
    subtotal += extraNights * selectedGuest.rate;
    
    // Add manual charges
    subtotal += manualCharges.reduce((sum, charge) => sum + charge.amount, 0);
    
    // Calculate GST (18% if GST branch)
    const gst = isGSTBranch ? Math.round(subtotal * 0.18) : 0;
    const total = subtotal + gst;
    const balance = total - selectedGuest.paid;
    
    return { subtotal, gst, total, balance };
  };

  const handleSearch = () => {
    setSelectedGuest(mockGuest);
    toast({
      title: "Guest Found",
      description: `Found guest: ${mockGuest.name} in Room ${mockGuest.room}`,
    });
  };

  const addManualCharge = () => {
    if (!newChargeDescription || !newChargeAmount) {
      toast({
        title: "Error",
        description: "Please enter both description and amount",
        variant: "destructive"
      });
      return;
    }
    
    const newCharge = {
      id: Date.now(),
      description: newChargeDescription,
      amount: parseFloat(newChargeAmount)
    };
    
    setManualCharges([...manualCharges, newCharge]);
    setNewChargeDescription("");
    setNewChargeAmount("");
    
    toast({
      title: "Charge Added",
      description: `Added ${newChargeDescription}: ₹${newChargeAmount}`,
    });
  };

  const removeManualCharge = (chargeId: number) => {
    setManualCharges(manualCharges.filter(charge => charge.id !== chargeId));
  };

  const handlePrintBill = () => {
    if (!isGSTBranch && branch === "bhavani-road") {
      toast({
        title: "Print Restricted",
        description: "This branch does not allow GST invoice printing",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Bill Printed",
      description: "Invoice has been sent to printer",
    });
  };

  const handleCheckOut = () => {
    const { balance } = calculateTotal();
    
    if (balance > 0 && !paymentMethod) {
      toast({
        title: "Payment Required",
        description: "Please select payment method for outstanding balance",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Check-Out Completed",
      description: "Guest has been checked out successfully",
    });
    setSelectedGuest(null);
    setExtraNights(0);
    setManualCharges([]);
    setPaymentMethod("");
  };

  const billing = calculateTotal();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Search Guest */}
      <Card className="fo-card">
        <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-xl">
          <CardTitle className="text-xl font-semibold flex items-center gap-3">
            <Search className="h-6 w-6" />
            Enhanced Guest Check-Out
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={searchType} onValueChange={setSearchType}>
              <SelectTrigger className="fo-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Guest Name</SelectItem>
                <SelectItem value="room">Room Number</SelectItem>
              </SelectContent>
            </Select>
            <div className="md:col-span-2">
              <Input 
                placeholder={searchType === "name" ? "Enter guest name" : "Enter room number"} 
                className="fo-input"
              />
            </div>
            <Button onClick={handleSearch} className="fo-button">
              <Search className="h-5 w-5 mr-2" />
              Search Guest
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Guest Details & Enhanced Billing */}
      {selectedGuest && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Guest Info & Extra Charges */}
          <div className="space-y-6">
            <Card className="fo-card">
              <CardHeader>
                <CardTitle className="fo-text-xl flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Guest Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="fo-text-base font-medium text-muted-foreground">Guest Name</Label>
                    <p className="fo-text-lg font-semibold">{selectedGuest.name}</p>
                  </div>
                  <div>
                    <Label className="fo-text-base font-medium text-muted-foreground">Room Number</Label>
                    <p className="fo-text-lg font-semibold">Room {selectedGuest.room}</p>
                  </div>
                  <div>
                    <Label className="fo-text-base font-medium text-muted-foreground">Check-In Date</Label>
                    <p className="fo-text-lg font-semibold">{selectedGuest.checkIn}</p>
                  </div>
                  <div>
                    <Label className="fo-text-base font-medium text-muted-foreground">Original Stay</Label>
                    <p className="fo-text-lg font-semibold">{selectedGuest.originalNights} nights</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Extra Nights */}
            <Card className="fo-card">
              <CardHeader>
                <CardTitle className="fo-text-xl flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Extra Nights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExtraNights(Math.max(0, extraNights - 1))}
                    disabled={extraNights === 0}
                    className="fo-button-outline"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="text-center">
                    <p className="fo-text-lg font-semibold">{extraNights}</p>
                    <p className="fo-text-base text-muted-foreground">extra nights</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExtraNights(extraNights + 1)}
                    className="fo-button-outline"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <div className="ml-4">
                    <p className="fo-text-base text-muted-foreground">Rate: ₹{selectedGuest.rate}/night</p>
                    <p className="fo-text-lg font-semibold">Total: ₹{(extraNights * selectedGuest.rate).toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Manual Charges */}
            <Card className="fo-card">
              <CardHeader>
                <CardTitle className="fo-text-xl flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Additional Charges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Charge description"
                    value={newChargeDescription}
                    onChange={(e) => setNewChargeDescription(e.target.value)}
                    className="fo-input"
                  />
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={newChargeAmount}
                      onChange={(e) => setNewChargeAmount(e.target.value)}
                      className="fo-input"
                    />
                    <Button onClick={addManualCharge} className="fo-button">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {manualCharges.length > 0 && (
                  <div className="space-y-2">
                    {manualCharges.map((charge) => (
                      <div key={charge.id} className="flex justify-between items-center p-3 bg-accent rounded-lg">
                        <span className="fo-text-base">{charge.description}</span>
                        <div className="flex items-center gap-2">
                          <span className="fo-text-base font-medium">₹{charge.amount.toLocaleString()}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeManualCharge(charge.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Billing & Payment */}
          <div className="space-y-6">
            <Card className="fo-card">
              <CardHeader>
                <CardTitle className="fo-text-xl flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Billing Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-accent/50 rounded-lg p-4 space-y-3">
                  {selectedGuest.baseCharges.map((charge, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="fo-text-base">{charge.description}</span>
                      <span className="fo-text-base font-medium">₹{charge.amount.toLocaleString()}</span>
                    </div>
                  ))}
                  
                  {extraNights > 0 && (
                    <div className="flex justify-between">
                      <span className="fo-text-base">Extra Nights ({extraNights})</span>
                      <span className="fo-text-base font-medium">₹{(extraNights * selectedGuest.rate).toLocaleString()}</span>
                    </div>
                  )}
                  
                  {manualCharges.map((charge) => (
                    <div key={charge.id} className="flex justify-between">
                      <span className="fo-text-base">{charge.description}</span>
                      <span className="fo-text-base font-medium">₹{charge.amount.toLocaleString()}</span>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="flex justify-between fo-text-lg">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{billing.subtotal.toLocaleString()}</span>
                  </div>
                  
                  {isGSTBranch && (
                    <div className="flex justify-between fo-text-base">
                      <span>GST (18%)</span>
                      <span className="font-medium">₹{billing.gst.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between fo-text-xl">
                    <span className="font-semibold">Total Amount</span>
                    <span className="font-bold">₹{billing.total.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between fo-text-lg text-green-600">
                    <span>Amount Paid</span>
                    <span className="font-semibold">₹{selectedGuest.paid.toLocaleString()}</span>
                  </div>
                  
                  {billing.balance > 0 && (
                    <div className="flex justify-between fo-text-lg text-red-600">
                      <span className="font-semibold">Balance Due</span>
                      <span className="font-bold">₹{billing.balance.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            {billing.balance > 0 && (
              <Card className="fo-card border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="fo-text-xl flex items-center gap-2 text-orange-800">
                    <AlertCircle className="h-5 w-5" />
                    Payment Required
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="fo-text-base font-medium">Payment Method</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger className="fo-input">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="company">Company Account</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-3">
                    <Button className="fo-button flex-1">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Collect Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handlePrintBill}
                variant="outline" 
                className="fo-button-outline flex-1"
              >
                <Printer className="h-5 w-5 mr-2" />
                Print Bill
              </Button>
              <Button 
                onClick={handleCheckOut}
                className="fo-button flex-1"
                disabled={billing.balance > 0 && !paymentMethod}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Complete Check-Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedCheckOutForm;
