import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Search, User, Receipt, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CheckOutForm = () => {
  const { toast } = useToast();
  const [searchType, setSearchType] = useState("name");
  const [selectedGuest, setSelectedGuest] = useState(null);

  // Mock guest data
  const mockGuest = {
    name: "Rajesh Kumar",
    room: "101",
    checkIn: "2024-07-01",
    nights: 3,
    rate: 2500,
    charges: [
      { description: "Room Charge (3 nights)", amount: 7500 },
      { description: "Service Charge", amount: 750 },
      { description: "GST (18%)", amount: 1485 }
    ],
    total: 9735,
    paid: 5000,
    balance: 4735
  };

  const handleSearch = () => {
    // Mock search - in real app, this would query the database
    setSelectedGuest(mockGuest);
    toast({
      title: "Guest Found",
      description: `Found guest: ${mockGuest.name} in Room ${mockGuest.room}`,
    });
  };

  const handleCheckOut = () => {
    toast({
      title: "Check-Out Completed",
      description: "Guest has been checked out successfully. Invoice generated.",
    });
    setSelectedGuest(null);
  };

  const handlePrintInvoice = () => {
    // Check if branch allows GST billing - this would come from app state/context
    // Simulating dynamic branch selection (in real app, this would come from context/state)
    const branches: ("CHK" | "SOU")[] = ["CHK", "SOU"];
    const branch = branches[0]; // This would come from app state
    
    if (branch === "SOU") {
      toast({
        title: "Invoice Printing Blocked",
        description: "SOU branch does not allow invoice printing (Non-GST branch)",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Invoice Printed",
      description: "Invoice has been sent to printer",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Search Guest */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Search className="h-5 w-5" />
            Find Guest for Check-Out
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Search By</Label>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Guest Name</SelectItem>
                    <SelectItem value="room">Room Number</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  {searchType === "name" ? "Guest Name" : "Room Number"}
                </Label>
                <Input 
                  placeholder={searchType === "name" ? "Enter guest name" : "Enter room number"} 
                  className="h-10"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleSearch} className="h-10 w-full bg-teal-600 hover:bg-teal-700">
                  <Search className="h-4 w-4 mr-2" />
                  Search Guest
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guest Details & Billing */}
      {selectedGuest && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              Guest Check-Out Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Guest Info */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Guest Name</Label>
                <p className="text-lg font-semibold">{selectedGuest.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Room Number</Label>
                <p className="text-lg font-semibold">Room {selectedGuest.room}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Check-In Date</Label>
                <p className="text-lg font-semibold">{selectedGuest.checkIn}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Nights Stayed</Label>
                <p className="text-lg font-semibold">{selectedGuest.nights} nights</p>
              </div>
            </div>

            <Separator />

            {/* Billing Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Billing Summary
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                {selectedGuest.charges.map((charge, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{charge.description}</span>
                    <span className="font-medium">₹{charge.amount.toLocaleString()}</span>
                  </div>
                ))}
                
                <Separator />
                
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total Amount</span>
                  <span>₹{selectedGuest.total.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-green-600">Amount Paid</span>
                  <span className="text-green-600 font-medium">₹{selectedGuest.paid.toLocaleString()}</span>
                </div>
                
                {selectedGuest.balance > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-red-600 font-medium">Balance Due</span>
                    <span className="text-red-600 font-semibold">₹{selectedGuest.balance.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Outstanding Payment */}
            {selectedGuest.balance > 0 && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div className="space-y-3 flex-1">
                      <div>
                        <p className="font-medium text-red-800">Outstanding Payment Required</p>
                        <p className="text-sm text-red-700">Balance due: ₹{selectedGuest.balance.toLocaleString()}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Select>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="card">Card</SelectItem>
                            <SelectItem value="upi">UPI</SelectItem>
                            <SelectItem value="bank">Bank Transfer</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button className="bg-green-600 hover:bg-green-700">
                          Collect Payment
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Room Status */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Set Room Status After Check-Out</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-12 border-green-200 hover:bg-green-50">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  Mark as Vacant
                </Button>
                <Button variant="outline" className="h-12 border-orange-200 hover:bg-orange-50">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                  Mark as Dirty
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                onClick={handlePrintInvoice}
                variant="outline" 
                className="flex-1 h-12"
              >
                <Receipt className="h-4 w-4 mr-2" />
                Print Invoice
              </Button>
              <Button 
                onClick={handleCheckOut}
                className="flex-1 h-12 bg-teal-600 hover:bg-teal-700"
                disabled={selectedGuest.balance > 0}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Complete Check-Out
              </Button>
            </div>
            
            {selectedGuest.balance > 0 && (
              <p className="text-sm text-red-600 text-center">
                Please clear outstanding balance before completing check-out
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CheckOutForm;
