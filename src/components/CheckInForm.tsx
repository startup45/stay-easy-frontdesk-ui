
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Upload, User, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const CheckInForm = () => {
  const { toast } = useToast();
  const [arrivalDate, setArrivalDate] = useState<Date>(new Date());
  const [guestTypes, setGuestTypes] = useState({
    walkIn: false,
    passportHolder: false,
    creditCustomer: false,
    companyGuest: false
  });

  const availableRooms = [101, 102, 103, 201, 202, 203, 301, 302, 303];
  const companies = ["Walk-in", "Milk Mist", "Tech Corp", "Hospitality Group", "Travel Associates"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Guest Check-In Successful",
      description: "Guest has been checked in successfully. Room key ready.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-t-lg">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <User className="h-5 w-5" />
            Guest Check-In Form
          </CardTitle>
        </CardHeader>
      </Card>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Guest Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary">
              Step 1: Guest Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="guestName" className="text-sm font-medium">Guest Name *</Label>
              <Input id="guestName" placeholder="Enter guest full name" className="h-10" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number *</Label>
              <Input 
                id="phoneNumber" 
                placeholder="+91 9876543210" 
                className="h-10" 
                type="tel"
                pattern="[+][0-9]{2}[0-9]{10}"
                required 
              />
            </div>
          </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address" className="text-sm font-medium">Address *</Label>
              <Textarea id="address" placeholder="Enter complete address" className="min-h-20" required />
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Room & Arrival Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary">
              Step 2: Room & Arrival Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Date of Arrival</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-10 justify-start text-left font-normal",
                      !arrivalDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {arrivalDate ? format(arrivalDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={arrivalDate}
                    onSelect={setArrivalDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="numberOfGuests" className="text-sm font-medium">Number of Guests</Label>
              <Select>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select guests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4 Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="roomNumber" className="text-sm font-medium">Room Number</Label>
              <Select>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Auto-select room" />
                </SelectTrigger>
                <SelectContent>
                  {availableRooms.map((room) => (
                    <SelectItem key={room} value={room.toString()}>
                      Room {room}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: ID Proof Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary">
              Step 3: ID Proof Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="idProofType" className="text-sm font-medium">ID Proof Type *</Label>
              <Select>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="aadhar">Aadhar Card</SelectItem>
                  <SelectItem value="driving">Driving License</SelectItem>
                  <SelectItem value="voter">Voter ID</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="idProofNumber" className="text-sm font-medium">ID Proof Number *</Label>
              <Input id="idProofNumber" placeholder="Enter ID number" className="h-10" required />
            </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 4: Guest Type & Company */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary">
              Step 4: Guest Type & Company Assignment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
            <Label className="text-sm font-medium">Guest Type *</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="walkIn"
                  checked={guestTypes.walkIn}
                  onCheckedChange={(checked) => setGuestTypes(prev => ({...prev, walkIn: checked as boolean}))}
                />
                <Label htmlFor="walkIn" className="text-sm">Walk-in</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="passportHolder"
                  checked={guestTypes.passportHolder}
                  onCheckedChange={(checked) => setGuestTypes(prev => ({...prev, passportHolder: checked as boolean}))}
                />
                <Label htmlFor="passportHolder" className="text-sm">Passport Holder</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="creditCustomer"
                  checked={guestTypes.creditCustomer}
                  onCheckedChange={(checked) => setGuestTypes(prev => ({...prev, creditCustomer: checked as boolean}))}
                />
                <Label htmlFor="creditCustomer" className="text-sm">Credit Customer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="companyGuest"
                  checked={guestTypes.companyGuest}
                  onCheckedChange={(checked) => setGuestTypes(prev => ({...prev, companyGuest: checked as boolean}))}
                />
                <Label htmlFor="companyGuest" className="text-sm">Company Guest</Label>
              </div>
            </div>
          </div>

            {/* Company Assignment */}
            {guestTypes.companyGuest && (
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium">Assign to Company</Label>
                <Select>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company} value={company.toLowerCase()}>
                        {company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Step 5: Payment Details */}
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Step 5: Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium">Amount</Label>
                <Input id="amount" placeholder="₹ 0.00" className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentMode" className="text-sm font-medium">Payment Mode</Label>
                <Select>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentStatus" className="text-sm font-medium">Status</Label>
                <Select>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="company">Company Billing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Actions */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" className="px-8 h-12 text-base">
                Cancel
              </Button>
              <Button type="submit" className="px-8 h-12 text-base bg-green-600 hover:bg-green-700">
                ✓ Complete Check-In
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default CheckInForm;
