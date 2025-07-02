
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CheckInForm from "@/components/CheckInForm";
import CheckOutForm from "@/components/CheckOutForm";
import RoomGrid from "@/components/RoomGrid";
import CompanyManagement from "@/components/CompanyManagement";
import DashboardStats from "@/components/DashboardStats";
import { Users, Calendar, Building2, CreditCard } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hotel Front Office</h1>
              <p className="text-sm text-gray-600">Management System</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Online
              </Badge>
              <div className="text-right">
                <p className="font-medium text-gray-900">Front Desk</p>
                <p className="text-sm text-gray-600">CHK Branch</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="checkin" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Check-In</span>
            </TabsTrigger>
            <TabsTrigger value="checkout" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Check-Out</span>
            </TabsTrigger>
            <TabsTrigger value="rooms" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Rooms</span>
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Companies</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="dashboard" className="space-y-6">
            <DashboardStats />
          </TabsContent>

          <TabsContent value="checkin">
            <CheckInForm />
          </TabsContent>

          <TabsContent value="checkout">
            <CheckOutForm />
          </TabsContent>

          <TabsContent value="rooms">
            <RoomGrid />
          </TabsContent>

          <TabsContent value="companies">
            <CompanyManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
