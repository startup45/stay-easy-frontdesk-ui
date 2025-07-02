
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Building2, Search, Filter, Users, MapPin } from "lucide-react";

const RoomGrid = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterBranch, setFilterBranch] = useState("all");
  const [searchRoom, setSearchRoom] = useState("");

  const branches = [
    { id: "anna-salai", name: "Anna Salai", color: "bg-blue-500" },
    { id: "erode-road", name: "Erode Road", color: "bg-green-500" },
    { id: "coimbatore-road", name: "Coimbatore Road", color: "bg-purple-500" },
    { id: "bhavani-road", name: "Bhavani Road", color: "bg-orange-500" }
  ];

  // Generate rooms for each branch
  const generateRooms = () => {
    const rooms = [];
    const statuses = ["available", "occupied", "reserved", "dirty"];
    const types = ["Standard", "Deluxe", "Suite"];
    
    branches.forEach((branch, branchIndex) => {
      // Generate 36-37 rooms per branch to total 147
      const roomsPerBranch = branchIndex < 3 ? 37 : 36;
      
      for (let room = 1; room <= roomsPerBranch; room++) {
        const roomNum = (branchIndex + 1) * 100 + room;
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        
        rooms.push({
          number: roomNum,
          status,
          type,
          branch: branch.id,
          branchName: branch.name,
          branchColor: branch.color,
          guest: status === "occupied" ? `Guest ${room}` : null,
          checkIn: status === "occupied" ? "2024-07-01" : null,
          rate: type === "Suite" ? 5000 : type === "Deluxe" ? 3000 : 2000
        });
      }
    });
    
    return rooms;
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

  const filteredRooms = rooms.filter(room => {
    const matchesStatus = filterStatus === "all" || room.status === filterStatus;
    const matchesType = filterType === "all" || room.type === filterType;
    const matchesBranch = filterBranch === "all" || room.branch === filterBranch;
    const matchesSearch = searchRoom === "" || room.number.toString().includes(searchRoom);
    
    return matchesStatus && matchesType && matchesBranch && matchesSearch;
  });

  const getStatsByBranch = (branchId) => {
    const branchRooms = rooms.filter(r => r.branch === branchId);
    return {
      total: branchRooms.length,
      available: branchRooms.filter(r => r.status === "available").length,
      occupied: branchRooms.filter(r => r.status === "occupied").length,
      reserved: branchRooms.filter(r => r.status === "reserved").length,
      dirty: branchRooms.filter(r => r.status === "dirty").length
    };
  };

  const statusCounts = {
    available: filteredRooms.filter(r => r.status === "available").length,
    occupied: filteredRooms.filter(r => r.status === "occupied").length,
    reserved: filteredRooms.filter(r => r.status === "reserved").length,
    dirty: filteredRooms.filter(r => r.status === "dirty").length
  };

  return (
    <div className="space-y-6">
      {/* Branch Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {branches.map((branch) => {
          const stats = getStatsByBranch(branch.id);
          return (
            <Card key={branch.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${branch.color}`}></div>
                    <h3 className="font-semibold text-sm">{branch.name}</h3>
                  </div>
                  <MapPin className="h-4 w-4 text-gray-500" />
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-medium">{stats.total}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Available:</span>
                    <span className="font-medium">{stats.available}</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Occupied:</span>
                    <span className="font-medium">{stats.occupied}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
              <label className="text-sm font-medium">Branch</label>
              <Select value={filterBranch} onValueChange={setFilterBranch}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  {branches.map(branch => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  setFilterBranch("all");
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
            {filterBranch !== "all" && (
              <Badge variant="outline" className="ml-2">
                {branches.find(b => b.id === filterBranch)?.name}
              </Badge>
            )}
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
                  border-2 border-transparent hover:border-white
                `}>
                  <div className="text-sm font-bold">{room.number}</div>
                  <div className="text-xs opacity-90">{room.type}</div>
                  <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${room.branchColor}`}></div>
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                  <div className="font-medium">Room {room.number}</div>
                  <div>{room.branchName}</div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Status Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
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
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Branch Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {branches.map(branch => (
                <div key={branch.id} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${branch.color}`}></div>
                  <span className="text-sm">{branch.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoomGrid;
