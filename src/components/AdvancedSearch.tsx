
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Calendar, User, Building2 } from "lucide-react";

const AdvancedSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const mockResults = [
    {
      id: 1,
      type: "guest",
      name: "Rajesh Kumar",
      room: "101",
      checkIn: "2024-07-01",
      checkOut: "2024-07-04",
      status: "Checked In",
      amount: 7500
    },
    {
      id: 2,
      type: "booking",
      name: "Priya Sharma",
      room: "205",
      checkIn: "2024-07-05",
      checkOut: "2024-07-07",
      status: "Confirmed",
      amount: 5000
    }
  ];

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Advanced Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Search Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Search Type</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Records</SelectItem>
                    <SelectItem value="guests">Guests</SelectItem>
                    <SelectItem value="bookings">Bookings</SelectItem>
                    <SelectItem value="payments">Payments</SelectItem>
                    <SelectItem value="rooms">Rooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date Range</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status Filter</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search Input */}
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, room number, phone, email..."
                  className="w-full"
                />
              </div>
              <Button onClick={handleSearch} disabled={isSearching}>
                <Search className="h-4 w-4 mr-2" />
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <User className="h-3 w-3 mr-1" />
                VIP Guests
              </Button>
              <Button variant="outline" size="sm">
                <Building2 className="h-3 w-3 mr-1" />
                Available Rooms
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-3 w-3 mr-1" />
                Today's Checkouts
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-3 w-3 mr-1" />
                Overdue Payments
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results ({searchResults.length} found)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchResults.map((result: any) => (
                  <TableRow key={result.id}>
                    <TableCell>
                      <Badge variant="outline">{result.type}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{result.name}</TableCell>
                    <TableCell>Room {result.room}</TableCell>
                    <TableCell>{result.checkIn}</TableCell>
                    <TableCell>{result.checkOut}</TableCell>
                    <TableCell>
                      <Badge variant={result.status === "Checked In" ? "default" : "secondary"}>
                        {result.status}
                      </Badge>
                    </TableCell>
                    <TableCell>₹{result.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdvancedSearch;
