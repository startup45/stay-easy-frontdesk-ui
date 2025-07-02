
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Building2, Search, Filter, Users } from "lucide-react";

const RoomGrid = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [searchRoom, setSearchRoom] = useState("");

  // Generate 147 rooms with mock data
  const generateRooms = () => {
    const rooms = [];
    const statuses = ["available", "occupied", "reserved", "dirty"];
    const types = ["Standard", "Deluxe", "Suite"];
    
    for (let floor = 1; floor <= 3; floor++) {
      for (let room = 1; room <= 49; room++) {
        if (rooms.length >= 147) break;
        
        const roomNum = floor * 100 + room;
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        
        rooms.push({
          number: roomNum,
          status,
          type,
          guest: status === "occupied" ? `Guest ${room}` : null,
          checkIn: status === "occupied" ? "2024-07-01" : null,
          rate: type === "Suite" ? 5000 : type === "Deluxe" ? 3000 : 2000
        });
      }
    }
    return rooms.slice(0, 147);
  };

  const [rooms] = useState(generateRooms());

  const getStatusColor = (status) => {
    switch (status) {
      case "available": return "bg-green-500";
      case "occupied": return "bg-red-500";
      case "reserved": return "bg-yellow-500";
      case "dirty": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      available: "bg-green-100 text-green-800 border-green-200",
      occupied: "bg-red-100 text-red-800 border-red-200",
      reserved: "bg-yellow-100 text-yellow-800 border-yellow-200",
      dirty: "bg-orange-100 text-orange-800 border-orange-200"
    };
    
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const filteredRooms = rooms.filter(room => {
    const matchesStatus = filterStatus === "all" || room.status === filterStatus;
    const matchesType = filterType === "all" || room.type === filterType;
    const matchesSearch = searchRoom === "" || room.number.toString().includes(searchRoom);
    
    return matchesStatus && matchesType && matchesSearch;
  });

  const statusCounts = {
    available: rooms.filter(r => r.status === "available").length,
    occupied: rooms.filter(r => r.status === "occupied").length,
    reserved: rooms.filter(r => r.status === "reserved").length,
    dirty: rooms.filter(r => r.status === "dirty").length
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{statusCounts.available}</div>
            <div className="text-sm text-green-700 font-medium">Available</div>
            <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mt-2"></div>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{statusCounts.occupied}</div>
            <div className="text-sm text-red-700 font-medium">Occupied</div>
            <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mt-2"></div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.reserved}</div>
            <div className="text-sm text-yellow-700 font-medium">Reserved</div>
            <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mt-2"></div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{statusCounts.dirty}</div>
            <div className="text-sm text-orange-700 font-medium">Dirty</div>
            <div className="w-4 h-4 bg-orange-500 rounded-full mx-auto mt-2"></div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Room Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Room</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Room number..."
                  value={searchRoom}
                  onChange={(e) => setSearchRoom(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="dirty">Dirty</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Room Type</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Deluxe">Deluxe</SelectItem>
                  <SelectItem value="Suite">Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setFilterStatus("all");
                  setFilterType("all");
                  setSearchRoom("");
                }}
                className="w-full"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Room Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Room Status Grid ({filteredRooms.length} rooms)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3">
            {filteredRooms.map((room) => (
              <div
                key={room.number}
                className="relative group cursor-pointer transition-all hover:scale-105"
              >
                <div className={`
                  w-full aspect-square rounded-lg p-2 text-white text-center flex flex-col justify-center
                  ${getStatusColor(room.status)} shadow-sm hover:shadow-md transition-shadow
                `}>
                  <div className="text-sm font-bold">{room.number}</div>
                  <div className="text-xs opacity-90">{room.type}</div>
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                  <div className="font-medium">Room {room.number}</div>
                  <div>{room.type} - {room.status}</div>
                  {room.guest && <div>Guest: {room.guest}</div>}
                  {room.checkIn && <div>Check-in: {room.checkIn}</div>}
                  <div>Rate: ₹{room.rate}/night</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Status Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm">Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-sm">Reserved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-sm">Dirty</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomGrid;
