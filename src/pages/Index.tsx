
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
import { Users, Calendar, Building2, CreditCard, TrendingUp, Search, Bell, Download, History, Settings, LogOut, Globe, Shield, Menu, X, Home, UserCheck, UserX } from "lucide-react";

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
      case "admin": return "bg-purple-100 text-purple-800 border-purple-200";
      case "bmo": return "bg-blue-100 text-blue-800 border-blue-200";
      case "fmo": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "front-office": return "bg-amber-100 text-amber-800 border-amber-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
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

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, color: "text-blue-600" },
    { id: "checkin", label: "Check In", icon: UserCheck, color: "text-green-600" },
    { id: "checkout", label: "Check Out", icon: UserX, color: "text-orange-600" },
    { id: "rooms", label: "Rooms", icon: Building2, color: "text-purple-600" },
    { id: "live-rooms", label: "Live Grid", icon: Building2, color: "text-teal-600" },
    { id: "room-mgmt", label: "Room Management", icon: Settings, color: "text-indigo-600" },
    { id: "payments", label: "Payments", icon: CreditCard, color: "text-emerald-600" },
    { id: "guests", label: "Guest History", icon: Users, color: "text-rose-600" },
    { id: "reports", label: "Analytics", icon: TrendingUp, color: "text-cyan-600" },
    { id: "search", label: "Advanced Search", icon: Search, color: "text-violet-600" },
    { id: "export", label: "Data Export", icon: Download, color: "text-pink-600" },
    { id: "billing", label: "Smart Billing", icon: CreditCard, color: "text-yellow-600" },
    { id: "audit", label: "Audit Log", icon: Shield, color: "text-red-600" }
  ];

  const visibleNavItems = navigationItems.filter(item => visibleTabs.includes(item.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">HotelOS</h1>
                <p className="text-sm text-gray-500 leading-none">
                  {currentBranch?.name} {!isGSTBranch && "(Non-GST)"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              <Badge className={`${getRoleColor(user.role)} font-medium px-3 py-1`}>
                {user.role.toUpperCase()}
              </Badge>
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300 font-medium px-3 py-1">
                <Globe className="h-3 w-3 mr-2" />
                {user.language === "ta" ? "தமிழ்" : user.language === "hi" ? "हिंदी" : "English"}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-white border-r border-gray-200 shadow-sm h-[calc(100vh-73px)] overflow-y-auto`}>
          <div className="p-4">
            <nav className="space-y-2">
              {visibleNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : item.color} transition-colors`} />
                    {!sidebarCollapsed && (
                      <span className="transition-opacity duration-200">{item.label}</span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Notifications Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <NotificationCenter />
                </div>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Tab Contents */}
                  {activeTab === "dashboard" && (
                    <div className="p-6">
                      <DashboardStats />
                    </div>
                  )}

                  {activeTab === "checkin" && (
                    <div className="p-6 space-y-6">
                      <CheckInForm />
                      <IdProofUpload />
                    </div>
                  )}

                  {activeTab === "checkout" && (
                    <div className="p-6">
                      <CheckOutForm />
                    </div>
                  )}

                  {activeTab === "rooms" && (
                    <div className="p-6">
                      <RoomGrid />
                    </div>
                  )}

                  {activeTab === "live-rooms" && (
                    <div className="p-6">
                      <LiveRoomGrid userRole={user.role} branch={user.branch} />
                    </div>
                  )}

                  {activeTab === "room-mgmt" && (
                    <div className="p-6">
                      <RoomManagement />
                    </div>
                  )}

                  {activeTab === "payments" && (
                    <div className="p-6">
                      <PaymentSystem />
                    </div>
                  )}

                  {activeTab === "guests" && (
                    <div className="p-6">
                      <GuestHistory />
                    </div>
                  )}

                  {activeTab === "reports" && (
                    <div className="p-6">
                      <ReportsAnalytics />
                    </div>
                  )}

                  {activeTab === "search" && (
                    <div className="p-6">
                      <AdvancedSearch />
                    </div>
                  )}

                  {activeTab === "export" && (
                    <div className="p-6">
                      <DataExport />
                    </div>
                  )}

                  {activeTab === "billing" && (
                    <div className="p-6">
                      <SmartBilling 
                        userRole={user.role} 
                        branch={user.branch} 
                        isGSTBranch={isGSTBranch} 
                      />
                    </div>
                  )}

                  {activeTab === "audit" && (
                    <div className="p-6">
                      <AuditLog userRole={user.role} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
