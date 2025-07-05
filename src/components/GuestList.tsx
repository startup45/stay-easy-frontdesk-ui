
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, User, Calendar, CreditCard, Clock, DollarSign, Receipt, Eye, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GuestListProps {
  userRole: string;
}

const GuestList = ({ userRole }: GuestListProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRoom, setFilterRoom] = useState("");
  const [filterCompany, setFilterCompany] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const guestData = [
    {
      id: 1,
      name: "Rajesh Kumar",
      room: "101",
      company: "Walk-in",
      checkInDate: "2024-07-01",
      duration: "3 nights",
      status: "Checked In",
      paymentDue: 4735,
      totalBill: 9735,
      phone: "+91 9876543210"
    },
    {
      id: 2,
      name: "Priya Sharma",
      room: "205",
      company: "Milk Mist Company",
      checkInDate: "2024-07-02",
      duration: "2 nights",
      status: "Checked In",
      paymentDue: 0,
      totalBill: 15000,
      phone: "+91 9876543211"
    },
    {
      id: 3,
      name: "Arun Patel",
      room: "103",
      company: "Walk-in",
      checkInDate: "2024-06-30",
      duration: "4 nights",
      status: "Overstay",
      paymentDue: 2500,
      totalBill: 12000,
      phone: "+91 9876543212"
    }
  ];

  const filteredGuests = guestData.filter(guest => {
    return (
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.phone.includes(searchTerm) ||
      guest.room.includes(searchTerm)
    ) &&
    (filterRoom === "" || guest.room.includes(filterRoom)) &&
    (filterCompany === "" || guest.company === filterCompany) &&
    (filterStatus === "" || guest.status === filterStatus);
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Checked In": return "bg-green-100 text-green-800";
      case "Overstay": return "bg-red-100 text-red-800";
      case "Checked Out": return "bg-gray-100 text-gray-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const handleCheckout = (guestId: number, guestName: string) => {
    toast({
      title: "Checkout Initiated",
      description: `Preparing checkout for ${guestName}`,
    });
  };

  const handleExtendStay = (guestId: number, guestName: string) => {
    toast({
      title: "Extend Stay",
      description: `Processing stay extension for ${guestName}`,
    });
  };

  const handleViewBill = (guestId: number, guestName: string) => {
    toast({
      title: "View Bill",
      description: `Loading bill details for ${guestName}`,
    });
  };

  return (
    <Card className="fo-card">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-t-xl">
        <CardTitle className="text-xl font-semibold flex items-center gap-3">
          <User className="h-6 w-6" />
          Guest Management
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Filters Section */}
        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search by name, phone, or room..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="fo-input pl-10"
                />
              </div>
            </div>
            <Select value={filterRoom} onValueChange={setFilterRoom}>
              <SelectTrigger className="fo-input">
                <SelectValue placeholder="Filter by Room" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Rooms</SelectItem>
                <SelectItem value="101">Room 101</SelectItem>
                <SelectItem value="102">Room 102</SelectItem>
                <SelectItem value="103">Room 103</SelectItem>
                <SelectItem value="205">Room 205</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCompany} onValueChange={setFilterCompany}>
              <SelectTrigger className="fo-input">
                <SelectValue placeholder="Filter by Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Companies</SelectItem>
                <SelectItem value="Walk-in">Walk-in</SelectItem>
                <SelectItem value="Milk Mist Company">Milk Mist Company</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="fo-input">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="Checked In">Checked In</SelectItem>
                <SelectItem value="Overstay">Overstay</SelectItem>
                <SelectItem value="Checked Out">Checked Out</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Guest Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2">
                <TableHead className="fo-text-base font-semibold">Guest Details</TableHead>
                <TableHead className="fo-text-base font-semibold">Room & Company</TableHead>
                <TableHead className="fo-text-base font-semibold">Stay Info</TableHead>
                <TableHead className="fo-text-base font-semibold">Status</TableHead>
                <TableHead className="fo-text-base font-semibold">Billing</TableHead>
                <TableHead className="fo-text-base font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGuests.map((guest) => (
                <TableRow key={guest.id} className="hover:bg-accent/50 transition-colors">
                  <TableCell className="py-4">
                    <div>
                      <p className="fo-text-lg font-semibold text-foreground">{guest.name}</p>
                      <p className="fo-text-base text-muted-foreground">{guest.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div>
                      <p className="fo-text-lg font-medium">Room {guest.room}</p>
                      <p className="fo-text-base text-muted-foreground">{guest.company}</p>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="fo-text-base">{guest.checkInDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span className="fo-text-base">{guest.duration}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge className={`${getStatusColor(guest.status)} fo-text-base px-3 py-1`}>
                      {guest.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Receipt className="h-4 w-4 text-blue-600" />
                        <span className="fo-text-base font-medium">₹{guest.totalBill.toLocaleString()}</span>
                      </div>
                      {guest.paymentDue > 0 && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-red-600" />
                          <span className="fo-text-base text-red-600 font-medium">₹{guest.paymentDue.toLocaleString()} due</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-col gap-2">
                      {userRole !== "front-office" && (
                        <Button
                          size="sm"
                          onClick={() => handleCheckout(guest.id, guest.name)}
                          className="fo-button text-sm h-8"
                        >
                          Checkout
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleExtendStay(guest.id, guest.name)}
                        className="fo-button-outline text-sm h-8"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Extend
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewBill(guest.id, guest.name)}
                        className="fo-button-outline text-sm h-8"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Bill
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredGuests.length === 0 && (
          <div className="text-center py-12">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="fo-text-lg text-muted-foreground">No guests found matching your filters</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GuestList;
