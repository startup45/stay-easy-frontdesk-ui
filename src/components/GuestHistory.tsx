
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, User, Calendar, Star } from "lucide-react";

const GuestHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const guestHistory = [
    {
      id: 1,
      name: "Rajesh Kumar",
      phone: "+91 9876543210",
      email: "rajesh@email.com",
      totalStays: 5,
      lastVisit: "2024-06-15",
      totalSpent: 45000,
      loyaltyPoints: 450,
      preferences: "AC Room, Ground Floor",
      status: "VIP"
    },
    {
      id: 2,
      name: "Priya Sharma",
      phone: "+91 9876543211",
      email: "priya@email.com",
      totalStays: 3,
      lastVisit: "2024-05-20",
      totalSpent: 22500,
      loyaltyPoints: 225,
      preferences: "Non-Smoking, Late Checkout",
      status: "Regular"
    }
  ];

  const filteredGuests = guestHistory.filter(guest =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.phone.includes(searchTerm) ||
    guest.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Guest History & Profiles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search guests by name, phone, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest Details</TableHead>
                  <TableHead>Stay History</TableHead>
                  <TableHead>Loyalty Status</TableHead>
                  <TableHead>Preferences</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGuests.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{guest.name}</p>
                        <p className="text-sm text-gray-600">{guest.phone}</p>
                        <p className="text-sm text-gray-600">{guest.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{guest.totalStays} stays</p>
                        <p className="text-sm text-gray-600">Last: {guest.lastVisit}</p>
                        <p className="text-sm text-gray-600">₹{guest.totalSpent.toLocaleString()}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant={guest.status === 'VIP' ? 'default' : 'secondary'}>
                          {guest.status}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-sm">{guest.loyaltyPoints} pts</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{guest.preferences}</p>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Button size="sm" variant="outline">View Profile</Button>
                        <Button size="sm" variant="outline">Book Room</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestHistory;
