
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Wrench, AlertCircle, Clock } from "lucide-react";

interface LiveRoomGridProps {
  userRole: string;
  branch: string;
}

const LiveRoomGrid = ({ userRole, branch }: LiveRoomGridProps) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [maintenanceNote, setMaintenanceNote] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const branches = [
    { id: "anna-salai", name: "Anna Salai", color: "bg-blue-500" },
    { id: "erode-road", name: "Erode Road", color: "bg-green-500" },
    { id: "coimbatore-road", name: "Coimbatore Road", color: "bg-purple-500" },
    { id: "bhavani-road", name: "Bhavani Road", color: "bg-orange-500" }
  ];

  // Generate rooms for each branch
  const generateRooms = () => {
    const rooms = [];
    const statuses = ["available", "occupied", "reserved", "dirty", "maintenance"];
    const types = ["Standard", "Deluxe", "Suite"];
    
    branches.forEach((branch, branchIndex) => {
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
          rate: type === "Suite" ? 5000 : type === "Deluxe" ? 3000 : 2000,
          maintenanceNote: status === "maintenance" ? "AC repair required" : "",
          lastUpdated: new Date()
        });
      }
    });
    
    return rooms;
  };

  // Initialize rooms
  useEffect(() => {
    setRooms(generateRooms());
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Simulate random status changes
      setRooms(prevRooms => {
        const updatedRooms = [...prevRooms];
        const randomIndex = Math.floor(Math.random() * updatedRooms.length);
        const statuses = ["available", "occupied", "reserved", "dirty"];
        updatedRooms[randomIndex] = {
          ...updatedRooms[randomIndex],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          lastUpdated: new Date()
        };
        return updatedRooms;
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "available": return "bg-green-500";
      case "occupied": return "bg-red-500";
      case "reserved": return "bg-yellow-500";
      case "dirty": return "bg-orange-500";
      case "maintenance": return "bg-gray-500";
      default: return "bg-gray-400";
    }
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setNewStatus(room.status);
    setMaintenanceNote(room.maintenanceNote || "");
    setIsDialogOpen(true);
  };

  const handleStatusChange = () => {
    if (selectedRoom && newStatus) {
      setRooms(rooms.map(room => 
        room.number === selectedRoom.number 
          ? { 
              ...room, 
              status: newStatus,
              maintenanceNote: newStatus === "maintenance" ? maintenanceNote : "",
              lastUpdated: new Date()
            }
          : room
      ));
      setIsDialogOpen(false);
      setSelectedRoom(null);
      setMaintenanceNote("");
    }
  };

  const filteredRooms = rooms.filter(room => 
    branch === "all" || room.branch === branch
  );

  const statusCounts = {
    available: filteredRooms.filter(r => r.status === "available").length,
    occupied: filteredRooms.filter(r => r.status === "occupied").length,
    reserved: filteredRooms.filter(r => r.status === "reserved").length,
    dirty: filteredRooms.filter(r => r.status === "dirty").length,
    maintenance: filteredRooms.filter(r => r.status === "maintenance").length,
    blocked: 0 // Can be implemented later
  };

  const guestsStaying = filteredRooms.filter(r => r.status === "occupied").length;
  const pendingBills = 12; // Mock data
  const companyGuests = userRole === "front-office" ? "Hidden" : "8"; // Hide from FO

  return (
    <div className="space-y-6">
      {/* Live Status Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Live Room Status</h2>
              <p className="text-blue-100">
                Last updated: {lastUpdate.toLocaleTimeString()}
                <Clock className="inline h-4 w-4 ml-2" />
              </p>
            </div>
            <Badge variant="outline" className="bg-white text-blue-600 border-white">
              147 Total Rooms
            </Badge>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-7 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{statusCounts.available}</div>
              <div className="text-sm">Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{statusCounts.occupied}</div>
              <div className="text-sm">Occupied</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{statusCounts.dirty}</div>
              <div className="text-sm">Dirty</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{statusCounts.reserved}</div>
              <div className="text-sm">Reserved</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{statusCounts.maintenance}</div>
              <div className="text-sm">Maintenance</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{guestsStaying}</div>
              <div className="text-sm">Guests Staying</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{companyGuests}</div>
              <div className="text-sm">Company Guests</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Room Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Room Grid - {filteredRooms.length} rooms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15 gap-2">
            {filteredRooms.map((room) => (
              <Dialog key={room.number} open={isDialogOpen && selectedRoom?.number === room.number} onOpenChange={(open) => {
                if (!open) {
                  setIsDialogOpen(false);
                  setSelectedRoom(null);
                }
              }}>
                <DialogTrigger asChild>
                  <div
                    className="relative group cursor-pointer transition-all hover:scale-105"
                    onClick={() => handleRoomClick(room)}
                  >
                    <div className={`
                      w-full aspect-square rounded-lg p-2 text-white text-center flex flex-col justify-center
                      ${getStatusColor(room.status)} shadow-sm hover:shadow-md transition-shadow
                      border-2 border-transparent hover:border-white
                      ${room.status === "maintenance" ? "opacity-75" : ""}
                    `}>
                      <div className="text-sm font-bold">{room.number}</div>
                      <div className="text-xs opacity-90">{room.type}</div>
                      {room.status === "maintenance" && (
                        <Wrench className="h-3 w-3 mx-auto mt-1" />
                      )}
                      {room.guest && (
                        <div className="absolute -top-1 -right-1">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Update Room {selectedRoom?.number}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        Branch: {selectedRoom?.branchName} | Type: {selectedRoom?.type}
                      </p>
                      <p className="text-sm text-gray-600">
                        Current Status: <span className="font-medium capitalize">{selectedRoom?.status}</span>
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Select New Status:</Label>
                      <RadioGroup value={newStatus} onValueChange={setNewStatus}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="available" id="available" />
                          <Label htmlFor="available" className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded"></div>
                            Available
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="occupied" id="occupied" />
                          <Label htmlFor="occupied" className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded"></div>
                            Occupied
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="reserved" id="reserved" />
                          <Label htmlFor="reserved" className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                            Reserved
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="dirty" id="dirty" />
                          <Label htmlFor="dirty" className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-orange-500 rounded"></div>
                            Dirty
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="maintenance" id="maintenance" />
                          <Label htmlFor="maintenance" className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-gray-500 rounded"></div>
                            Under Maintenance
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {newStatus === "maintenance" && (
                      <div className="space-y-2">
                        <Label>Maintenance Notes</Label>
                        <Textarea
                          placeholder="Enter maintenance details..."
                          value={maintenanceNote}
                          onChange={(e) => setMaintenanceNote(e.target.value)}
                          rows={3}
                        />
                      </div>
                    )}
                    
                    <div className="flex gap-2 pt-4">
                      <Button 
                        onClick={handleStatusChange}
                        disabled={!newStatus || (newStatus === selectedRoom?.status && newStatus !== "maintenance")}
                        className="flex-1"
                      >
                        Update Status
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsDialogOpen(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts Section */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <AlertCircle className="h-5 w-5" />
            Alerts & Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 border border-red-200 rounded bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-800">3 overdue checkouts - Rooms 102, 205, 308</span>
            </div>
            <div className="flex items-center gap-3 p-2 border border-yellow-200 rounded bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm text-yellow-800">₹45,230 pending payments from 5 guests</span>
            </div>
            <div className="flex items-center gap-3 p-2 border border-orange-200 rounded bg-orange-50">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <span className="text-sm text-orange-800">{statusCounts.dirty} rooms need cleaning</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveRoomGrid;
