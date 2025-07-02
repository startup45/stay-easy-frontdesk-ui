
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Users, CreditCard, Plus, FileText, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CompanyManagement = () => {
  const { toast } = useToast();
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Mock company data
  const companies = [
    {
      id: 1,
      name: "Milk Mist",
      contact: "John Doe",
      email: "billing@milkmist.com",
      phone: "+91 9876543210",
      address: "123 Business Park, Mumbai",
      activeGuests: 3,
      totalStays: 45,
      totalBills: 234500,
      pendingDues: 12300,
      creditLimit: 100000
    },
    {
      id: 2,
      name: "Tech Corp",
      contact: "Sarah Wilson",
      email: "accounts@techcorp.com",
      phone: "+91 9876543211",
      address: "456 Tech Hub, Bangalore",
      activeGuests: 1,
      totalStays: 23,
      totalBills: 156700,
      pendingDues: 0,
      creditLimit: 50000
    },
    {
      id: 3,
      name: "Hospitality Group",
      contact: "Mike Johnson",
      email: "finance@hospgroup.com",
      phone: "+91 9876543212",
      address: "789 Corporate Ave, Delhi",
      activeGuests: 2,
      totalStays: 67,
      totalBills: 445600,
      pendingDues: 25400,
      creditLimit: 200000
    }
  ];

  // Mock guest data for companies
  const companyGuests = {
    1: [
      { name: "Raj Patel", room: "201", checkIn: "2024-07-01", nights: 2 },
      { name: "Priya Singh", room: "305", checkIn: "2024-06-28", nights: 5 },
      { name: "Amit Kumar", room: "102", checkIn: "2024-07-02", nights: 1 }
    ],
    2: [
      { name: "David Lee", room: "404", checkIn: "2024-06-30", nights: 3 }
    ],
    3: [
      { name: "Lisa Brown", room: "203", checkIn: "2024-07-01", nights: 2 },
      { name: "Tom Wilson", room: "301", checkIn: "2024-06-29", nights: 4 }
    ]
  };

  const handleAddCompany = () => {
    toast({
      title: "Company Added",
      description: "New company has been added successfully",
    });
  };

  const handleGenerateReport = (type) => {
    toast({
      title: "Report Generated",
      description: `${type} report has been generated and downloaded`,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Company Overview</TabsTrigger>
          <TabsTrigger value="guests">Active Guests</TabsTrigger>
          <TabsTrigger value="reports">Reports & Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Add New Company */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Company
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input id="companyName" placeholder="Enter company name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person *</Label>
                    <Input id="contactPerson" placeholder="Enter contact person name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="billing@company.com" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" placeholder="+91 9876543210" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="creditLimit">Credit Limit</Label>
                    <Input id="creditLimit" placeholder="₹ 100,000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Company address" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={handleAddCompany} className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Company
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Company List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <Card key={company.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold">{company.name}</CardTitle>
                      <p className="text-sm text-gray-600">{company.contact}</p>
                    </div>
                    <Badge variant={company.pendingDues > 0 ? "destructive" : "default"}>
                      {company.pendingDues > 0 ? "Dues Pending" : "Clear"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Active Guests</p>
                      <p className="font-semibold text-blue-600">{company.activeGuests}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Stays</p>
                      <p className="font-semibold">{company.totalStays}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Bills</p>
                      <p className="font-semibold">₹{company.totalBills.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Pending Dues</p>
                      <p className={`font-semibold ${company.pendingDues > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        ₹{company.pendingDues.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-xs text-gray-600 mb-1">Credit Utilization</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(company.pendingDues / company.creditLimit) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      ₹{company.pendingDues.toLocaleString()} / ₹{company.creditLimit.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Generate Bill
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Users className="h-5 w-5" />
                Active Company Guests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {companies.filter(c => c.activeGuests > 0).map((company) => (
                  <div key={company.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{company.name}</h3>
                      <Badge>{company.activeGuests} active guests</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {companyGuests[company.id]?.map((guest, idx) => (
                        <Card key={idx} className="bg-gray-50">
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">{guest.name}</p>
                                <Badge variant="outline">Room {guest.room}</Badge>
                              </div>
                              <div className="text-sm text-gray-600">
                                <p>Check-in: {guest.checkIn}</p>
                                <p>Nights: {guest.nights}</p>
                              </div>
                              <Button size="sm" variant="outline" className="w-full">
                                View Guest Details
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <hr className="my-4" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Generate Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Generate Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Select Company</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose company" />
                      </SelectTrigger>
                      <SelectContent>
                        {companies.map((company) => (
                          <SelectItem key={company.id} value={company.id.toString()}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Report Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stays">Stay Report</SelectItem>
                        <SelectItem value="bills">Billing Report</SelectItem>
                        <SelectItem value="dues">Outstanding Dues</SelectItem>
                        <SelectItem value="summary">Company Summary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <Button 
                      variant="outline"
                      onClick={() => handleGenerateReport('Stay Report')}
                    >
                      Generate Report
                    </Button>
                    <Button 
                      onClick={() => handleGenerateReport('Consolidated Bill')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Consolidated Bill
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Outstanding Dues Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Outstanding Dues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {companies.filter(c => c.pendingDues > 0).map((company) => (
                    <div key={company.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                      <div>
                        <p className="font-medium text-red-800">{company.name}</p>
                        <p className="text-sm text-red-600">{company.contact}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-600">₹{company.pendingDues.toLocaleString()}</p>
                        <Button size="sm" variant="outline" className="mt-1">
                          Send Reminder
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Outstanding:</span>
                      <span className="text-xl font-bold text-red-600">
                        ₹{companies.reduce((sum, c) => sum + c.pendingDues, 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyManagement;
