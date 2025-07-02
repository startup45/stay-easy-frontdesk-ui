
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Calendar, Settings, AlertCircle } from "lucide-react";

const RoomManagement = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterFloor, setFilterFloor] = useState("all");

  const rooms = [
    {
      number: "101",
      type: "Deluxe",
      floor: 1,
      status: "Available",
      rate: 2500,
      lastCleaned: "2024-07-02 10:00",
      maintenance: null,
      guest: null
    },
    {
      number: "102",
      type: "Deluxe",
      floor: 1,
      status: "Occupied",
      rate: 2500,
      lastCleaned: "2024-07-01 14:00",
      maintenance: null,
      guest: "Rajesh Kumar"
    },
    {
      number: "201",
      type: "Suite",
      floor: 2,
      status: "Maintenance",
      rate: 4000,
      lastCleaned: "2024-06-30 09:00",
      maintenance: "AC Repair - Due 2024-07-03",
      guest: null
    },
    {
      number: "202",
      type: "Suite",
      floor: 2,
      status: "Dirty",
      rate: 4000,
      lastCleaned: "2024-07-01 16:00",
      maintenance: null,
      guest: null
    }
  ];

  const filteredRooms = rooms.filter(room => {
    const statusMatch = filterStatus === "all" || room.status.toLowerCase() === filterStatus.toLowerCase();
    const floorMatch = filterFloor === "all" || room.floor.toString() === filterFloor;
    return statusMatch && floorMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-800";
      case "Occupied": return "bg-red-100 text-red-800";
      case "Maintenance": return "bg-orange-100 text-orange-800";
      case "Dirty": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Advanced Room Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="dirty">Dirty</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterFloor} onValueChange={setFilterFloor}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by floor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Floors</SelectItem>
                  <SelectItem value="1">Floor 1</SelectItem>
                  <SelectItem value="2">Floor 2</SelectItem>
                  <SelectItem value="3">Floor 3</SelectItem>
                </SelectContent>
              </Select>

              <Button className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Room Settings
              </Button>
            </div>

            {/* Room Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredRooms.map((room) => (
                <Card key={room.number} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">Room {room.number}</h3>
                        <p className="text-sm text-gray-600">{room.type}</p>
                      </div>
                      <Badge className={getStatusColor(room.status)}>
                        {room.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-1">
                      <p><strong>Rate:</strong> ₹{room.rate}/night</p>
                      <p><strong>Floor:</strong> {room.floor}</p>
                      {room.guest && (
                        <p><strong>Guest:</strong> {room.guest}</p>
                      )}
                      <p><strong>Last Cleaned:</strong> {room.lastCleaned}</p>
                      {room.maintenance && (
                        <div className="flex items-start gap-2 text-orange-600">
                          <AlertCircle className="h-4 w-4 mt-0.5" />
                          <p className="text-xs">{room.maintenance}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button size="sm" variant="outline">
                        Update Status
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="h-3 w-3 mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomManagement;
