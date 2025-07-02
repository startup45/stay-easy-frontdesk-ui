
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
import GuestHistory from "@/components/GuestHistory";
import RoomManagement from "@/components/RoomManagement";
import PaymentSystem from "@/components/PaymentSystem";
import ReportsAnalytics from "@/components/ReportsAnalytics";
import NotificationCenter from "@/components/NotificationCenter";
import AdvancedSearch from "@/components/AdvancedSearch";
import DataExport from "@/components/DataExport";
import { Users, Calendar, Building2, CreditCard, TrendingUp, Search, Bell, Download, History, Settings } from "lucide-react";

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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Notifications Sidebar */}
          <div className="lg:col-span-1">
            <NotificationCenter />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              {/* Navigation Tabs */}
              <div className="overflow-x-auto">
                <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 bg-white shadow-sm">
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
                  <TabsTrigger value="room-mgmt" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">Room Mgmt</span>
                  </TabsTrigger>
                  <TabsTrigger value="payments" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span className="hidden sm:inline">Payments</span>
                  </TabsTrigger>
                  <TabsTrigger value="guests" className="flex items-center gap-2">
                    <History className="h-4 w-4" />
                    <span className="hidden sm:inline">Guests</span>
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <span className="hidden sm:inline">Reports</span>
                  </TabsTrigger>
                  <TabsTrigger value="search" className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    <span className="hidden sm:inline">Search</span>
                  </TabsTrigger>
                  <TabsTrigger value="export" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Export</span>
                  </TabsTrigger>
                </TabsList>
              </div>

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

              <TabsContent value="room-mgmt">
                <RoomManagement />
              </TabsContent>

              <TabsContent value="payments">
                <PaymentSystem />
              </TabsContent>

              <TabsContent value="guests">
                <GuestHistory />
              </TabsContent>

              <TabsContent value="reports">
                <ReportsAnalytics />
              </TabsContent>

              <TabsContent value="search">
                <AdvancedSearch />
              </TabsContent>

              <TabsContent value="export">
                <DataExport />
              </TabsContent>

              <TabsContent value="companies">
                <CompanyManagement />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
