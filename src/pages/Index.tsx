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
import AdvancedSearch from "@/components/AdvancedSearch";
import DataExport from "@/components/DataExport";
import LiveRoomGrid from "@/components/LiveRoomGrid";
import SmartBilling from "@/components/SmartBilling";
import AuditLog from "@/components/AuditLog";
import IdProofUpload from "@/components/IdProofUpload";
import GuestList from "@/components/GuestList";
import EnhancedCheckOutForm from "@/components/EnhancedCheckOutForm";
import CompanyBilling from "@/components/CompanyBilling";
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
        return [...baseTabs, "guest-list", "room-mgmt", "payments", "guests", "reports", "search", "export", "billing", "company-billing", "audit"];
      case "bmo":
        return [...baseTabs, "guest-list", "room-mgmt", "payments", "guests", "reports", "search", "export", "billing", "company-billing"];
      case "fmo":
        return [...baseTabs, "guest-list", "room-mgmt", "payments", "guests", "reports", "search", "billing"];
      case "front-office":
        return [...baseTabs, "guest-list", "guests", "search"];
      default:
        return baseTabs;
    }
  };

  const visibleTabs = getVisibleTabs();

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, color: "text-blue-600" },
    { id: "checkin", label: "Check In", icon: UserCheck, color: "text-green-600" },
    { id: "checkout", label: "Check Out", icon: UserX, color: "text-orange-600" },
    { id: "guest-list", label: "Guest List", icon: Users, color: "text-purple-600" },
    { id: "rooms", label: "Rooms", icon: Building2, color: "text-purple-600" },
    { id: "live-rooms", label: "Live Grid", icon: Building2, color: "text-teal-600" },
    { id: "room-mgmt", label: "Room Management", icon: Settings, color: "text-indigo-600" },
    { id: "payments", label: "Payments", icon: CreditCard, color: "text-emerald-600" },
    { id: "guests", label: "Guest History", icon: Users, color: "text-rose-600" },
    { id: "reports", label: "Analytics", icon: TrendingUp, color: "text-cyan-600" },
    { id: "search", label: "Advanced Search", icon: Search, color: "text-violet-600" },
    { id: "export", label: "Data Export", icon: Download, color: "text-pink-600" },
    { id: "billing", label: "Smart Billing", icon: CreditCard, color: "text-yellow-600" },
    { id: "company-billing", label: "Company Bills", icon: Building2, color: "text-blue-600" },
    { id: "audit", label: "Audit Log", icon: Shield, color: "text-red-600" }
  ];

  const visibleNavItems = navigationItems.filter(item => visibleTabs.includes(item.id));

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="lg:hidden fo-button"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="fo-text-xl text-foreground">HotelOS</h1>
                <p className="fo-text-base text-muted-foreground">
                  {currentBranch?.name} {!isGSTBranch && "(Non-GST)"}
                </p>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            {visibleNavItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`fo-nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden xl:inline">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              <Badge className={`${getRoleColor(user.role)} fo-text-base font-semibold px-4 py-2`}>
                {user.role.toUpperCase()}
              </Badge>
              <Badge variant="outline" className="bg-accent text-accent-foreground border-border fo-text-base font-medium px-4 py-2">
                <Globe className="h-4 w-4 mr-2" />
                {user.language === "ta" ? "தமிழ்" : user.language === "hi" ? "हिंदी" : "English"}
              </Badge>
            </div>
            <Button
              variant="ghost"
              onClick={onLogout}
              className="fo-button-outline text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline fo-text-base">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className={`${sidebarCollapsed ? 'w-20' : 'w-80'} transition-all duration-300 bg-card border-r border-border shadow-lg h-[calc(100vh-81px)] overflow-y-auto lg:hidden animate-slide-in`}>
          <div className="p-6">
            <nav className="space-y-3">
              {visibleNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full fo-nav-item justify-start ${isActive ? 'active' : ''}`}
                  >
                    <Icon className="h-6 w-6 flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="transition-opacity duration-200 fo-text-lg">{item.label}</span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-accent/30">
          <div className="p-8">
            <div className="fo-card overflow-hidden animate-fade-in">
              <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6">
                <div className="flex items-center gap-3">
                  {(() => {
                    const currentItem = visibleNavItems.find(item => item.id === activeTab);
                    const Icon = currentItem?.icon || Home;
                    return (
                      <>
                        <Icon className="h-7 w-7" />
                        <h2 className="fo-text-xl font-semibold">{currentItem?.label || 'Dashboard'}</h2>
                      </>
                    );
                  })()}
                </div>
              </div>

              <div className="bg-card">
                {activeTab === "dashboard" && (
                  <div className="p-8">
                    <DashboardStats />
                  </div>
                )}

                {activeTab === "checkin" && (
                  <div className="p-8 space-y-8">
                    <div className="grid gap-8 lg:grid-cols-1">
                      <CheckInForm />
                      <IdProofUpload />
                    </div>
                  </div>
                )}

                {activeTab === "checkout" && (
                  <div className="p-8">
                    <EnhancedCheckOutForm 
                      userRole={user.role} 
                      branch={user.branch} 
                      isGSTBranch={isGSTBranch} 
                    />
                  </div>
                )}

                {activeTab === "guest-list" && (
                  <div className="p-8">
                    <GuestList userRole={user.role} />
                  </div>
                )}

                {activeTab === "rooms" && (
                  <div className="p-8">
                    <RoomGrid />
                  </div>
                )}

                {activeTab === "live-rooms" && (
                  <div className="p-8">
                    <LiveRoomGrid userRole={user.role} branch={user.branch} />
                  </div>
                )}

                {activeTab === "room-mgmt" && (
                  <div className="p-8">
                    <RoomManagement />
                  </div>
                )}

                {activeTab === "payments" && (
                  <div className="p-8">
                    <PaymentSystem />
                  </div>
                )}

                {activeTab === "guests" && (
                  <div className="p-8">
                    <GuestHistory />
                  </div>
                )}

                {activeTab === "reports" && (
                  <div className="p-8">
                    <ReportsAnalytics />
                  </div>
                )}

                {activeTab === "search" && (
                  <div className="p-8">
                    <AdvancedSearch />
                  </div>
                )}

                {activeTab === "export" && (
                  <div className="p-8">
                    <DataExport />
                  </div>
                )}

                {activeTab === "billing" && (
                  <div className="p-8">
                    <SmartBilling 
                      userRole={user.role} 
                      branch={user.branch} 
                      isGSTBranch={isGSTBranch} 
                    />
                  </div>
                )}

                {activeTab === "company-billing" && (user.role === "admin" || user.role === "bmo") && (
                  <div className="p-8">
                    <CompanyBilling 
                      userRole={user.role} 
                      isGSTBranch={isGSTBranch} 
                    />
                  </div>
                )}

                {activeTab === "audit" && (
                  <div className="p-8">
                    <AuditLog userRole={user.role} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
