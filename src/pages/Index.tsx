
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
import LiveRoomGrid from "@/components/LiveRoomGrid";
import SmartBilling from "@/components/SmartBilling";
import AuditLog from "@/components/AuditLog";
import IdProofUpload from "@/components/IdProofUpload";
import { Users, Calendar, Building2, CreditCard, TrendingUp, Search, Bell, Download, History, Settings, LogOut, Globe, Shield } from "lucide-react";

interface IndexProps {
  user: {
    role: string;
    branch: string;
    language: string;
  };
  onLogout: () => void;
}

const Index = ({ user, onLogout }: IndexProps) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const branches = [
    { id: "anna-salai", name: "Anna Salai", gst: true },
    { id: "erode-road", name: "Erode Road", gst: true },
    { id: "coimbatore-road", name: "Coimbatore Road", gst: true },
    { id: "bhavani-road", name: "Bhavani Road", gst: false }
  ];

  const currentBranch = branches.find(b => b.id === user.branch);
  const isGSTBranch = currentBranch?.gst ?? true;

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-red-100 text-red-800";
      case "bmo": return "bg-blue-100 text-blue-800";
      case "fmo": return "bg-green-100 text-green-800";
      case "front-office": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getVisibleTabs = () => {
    const baseTabs = ["dashboard", "checkin", "checkout", "rooms", "live-rooms"];
    
    switch (user.role) {
      case "admin":
        return [...baseTabs, "room-mgmt", "payments", "guests", "reports", "search", "export", "billing", "audit"];
      case "bmo":
        return [...baseTabs, "room-mgmt", "payments", "guests", "reports", "search", "export", "billing", "audit"];
      case "fmo":
        return [...baseTabs, "room-mgmt", "payments", "guests", "reports", "search", "billing"];
      case "front-office":
        return [...baseTabs, "guests", "search", "billing"];
      default:
        return baseTabs;
    }
  };

  const visibleTabs = getVisibleTabs();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hotel Management System</h1>
              <p className="text-sm text-gray-600">
                {currentBranch?.name} Branch {!isGSTBranch && "(Non-GST)"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={getRoleColor(user.role)}>
                {user.role.toUpperCase()}
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Globe className="h-3 w-3 mr-1" />
                {user.language === "ta" ? "தமிழ்" : user.language === "hi" ? "हिंदी" : "English"}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
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
                  {visibleTabs.includes("dashboard") && (
                    <TabsTrigger value="dashboard" className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Dashboard</span>
                    </TabsTrigger>
                  )}
                  {visibleTabs.includes("checkin") && (
                    <TabsTrigger value="checkin" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="hidden sm:inline">Check-In</span>
                    </TabsTrigger>
                  )}
                  {visibleTabs.includes("checkout") && (
                    <TabsTrigger value="checkout" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="hidden sm:inline">Check-Out</span>
                    </TabsTrigger>
                  )}
                  {visibleTabs.includes("rooms") && (
                    <TabsTrigger value="rooms" className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Rooms</span>
                    </TabsTrigger>
                  )}
                  {visibleTabs.includes("live-rooms") && (
                    <TabsTrigger value="live-rooms" className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Live Grid</span>
                    </TabsTrigger>
                  )}
                  {visibleTabs.includes("room-mgmt") && (
                    <TabsTrigger value="room-mgmt" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span className="hidden sm:inline">Room Mgmt</span>
                    </TabsTrigger>
                  )}
                  {visibleTabs.includes("payments") && (
                    <TabsTrigger value="payments" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      <span className="hidden sm:inline">Payments</span>
                    </TabsTrigger>
                  )}
                  {visibleTabs.includes("guests") && (
                    <TabsTrigger value="guests" className="flex items-center gap-2">
                      <History className="h-4 w-4" />
                      <span className="hidden sm:inline">Guests</span>
                    </TabsTrigger>
                  )}
                  {visibleTabs.includes("reports") && (
                    <TabsTrigger value="reports" className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      <span className="hidden sm:inline">Reports</span>
                    </TabsTrigger>
                  )}
                  {visibleTabs.includes("search") && (
                    <TabsTrigger value="search" className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      <span className="hidden sm:inline">Search</span>
                    </TabsTrigger>
                  )}
                  {visibleTabs.includes("export") && (
                    <TabsTrigger value="export" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Export</span>
                    </TabsTrigger>
                  )}
                  {visibleTabs.includes("billing") && (
                    <TabsTrigger value="billing" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      <span className="hidden sm:inline">Smart Bill</span>
                    </TabsTrigger>
                  )}
                  {visibleTabs.includes("audit") && (
                    <TabsTrigger value="audit" className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span className="hidden sm:inline">Audit</span>
                    </TabsTrigger>
                  )}
                </TabsList>
              </div>

              {/* Tab Contents */}
              <TabsContent value="dashboard" className="space-y-6">
                <DashboardStats />
              </TabsContent>

              <TabsContent value="checkin">
                <div className="space-y-6">
                  <CheckInForm />
                  <IdProofUpload />
                </div>
              </TabsContent>

              <TabsContent value="checkout">
                <CheckOutForm />
              </TabsContent>

              <TabsContent value="rooms">
                <RoomGrid />
              </TabsContent>

              <TabsContent value="live-rooms">
                <LiveRoomGrid userRole={user.role} branch={user.branch} />
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

              <TabsContent value="billing">
                <SmartBilling 
                  userRole={user.role} 
                  branch={user.branch} 
                  isGSTBranch={isGSTBranch} 
                />
              </TabsContent>

              <TabsContent value="audit">
                <AuditLog userRole={user.role} />
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
