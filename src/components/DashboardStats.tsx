
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, CreditCard, Calendar, TrendingUp, Clock, MapPin } from "lucide-react";

const DashboardStats = () => {
  const branches = [
    { name: "Anna Salai", rooms: 37, occupied: 15, available: 22, color: "bg-blue-500" },
    { name: "Erode Road", rooms: 37, occupied: 12, available: 25, color: "bg-green-500" },
    { name: "Coimbatore Road", rooms: 37, occupied: 18, available: 19, color: "bg-purple-500" },
    { name: "Bhavani Road", rooms: 36, occupied: 13, available: 23, color: "bg-orange-500" }
  ];

  const totalRooms = branches.reduce((sum, branch) => sum + branch.rooms, 0);
  const totalOccupied = branches.reduce((sum, branch) => sum + branch.occupied, 0);
  const totalAvailable = branches.reduce((sum, branch) => sum + branch.available, 0);

  const stats = [
    {
      title: "Total Rooms",
      value: totalRooms.toString(),
      change: `Available: ${totalAvailable}`,
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Current Guests",
      value: totalOccupied.toString(),
      change: "Check-ins today: 12",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Pending Payments",
      value: "₹45,230",
      change: "3 invoices due",
      icon: CreditCard,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Today's Revenue",
      value: "₹1,23,450",
      change: "+12% vs yesterday",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const recentActivities = [
    { id: 1, action: "Check-in", guest: "Rajesh Kumar", room: "101", branch: "Anna Salai", time: "2 mins ago" },
    { id: 2, action: "Check-out", guest: "Priya Sharma", room: "205", branch: "Erode Road", time: "15 mins ago" },
    { id: 3, action: "Payment", guest: "Milk Mist Company", amount: "₹8,500", branch: "Coimbatore Road", time: "1 hour ago" },
    { id: 4, action: "Room Clean", room: "304", branch: "Bhavani Road", status: "Ready", time: "2 hours ago" }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Branch Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Branch Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {branches.map((branch, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-3 h-3 rounded-full ${branch.color}`}></div>
                  <h3 className="font-semibold text-sm">{branch.name}</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Rooms:</span>
                    <span className="font-medium">{branch.rooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-600">Available:</span>
                    <span className="font-medium text-green-600">{branch.available}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-600">Occupied:</span>
                    <span className="font-medium text-red-600">{branch.occupied}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${(branch.occupied / branch.rooms) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    {Math.round((branch.occupied / branch.rooms) * 100)}% Occupancy
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start h-12 text-left bg-blue-600 hover:bg-blue-700">
              <Users className="mr-3 h-5 w-5" />
              New Guest Check-In
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 text-left">
              <Calendar className="mr-3 h-5 w-5" />
              Process Check-Out
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 text-left">
              <Building2 className="mr-3 h-5 w-5" />
              View Room Status
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 text-left">
              <CreditCard className="mr-3 h-5 w-5" />
              Generate Reports
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Badge 
                        variant={
                          activity.action === 'Check-in' ? 'default' :
                          activity.action === 'Check-out' ? 'secondary' :
                          activity.action === 'Payment' ? 'destructive' : 'outline'
                        }
                        className="text-xs"
                      >
                        {activity.action}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {activity.guest || `Room ${activity.room}`}
                      </p>
                      <p className="text-xs text-gray-600">
                        {activity.branch} • {activity.room && `Room ${activity.room}`}
                        {activity.amount && activity.amount}
                        {activity.status && activity.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Room Status Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Overall Room Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{totalAvailable}</div>
              <div className="text-sm text-green-700 font-medium">Available</div>
              <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mt-2"></div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{totalOccupied}</div>
              <div className="text-sm text-red-700 font-medium">Occupied</div>
              <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mt-2"></div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">0</div>
              <div className="text-sm text-yellow-700 font-medium">Reserved</div>
              <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mt-2"></div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">0</div>
              <div className="text-sm text-orange-700 font-medium">Dirty</div>
              <div className="w-4 h-4 bg-orange-500 rounded-full mx-auto mt-2"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
