
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Calendar, Filter, Download, Eye, CreditCard } from "lucide-react";

interface CompanyBillingProps {
  userRole: string;
  isGSTBranch: boolean;
}

const CompanyBilling = ({ userRole, isGSTBranch }: CompanyBillingProps) => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const companyBills = [
    {
      id: 1,
      company: "Milk Mist Company",
      billNumber: "INV-2024-001",
      dateRange: "July 1-5, 2024",
      rooms: "205, 206, 207",
      nights: 15,
      amount: 45000,
      gstAmount: isGSTBranch ? 8100 : 0,
      totalAmount: isGSTBranch ? 53100 : 45000,
      status: "Paid",
      paymentDate: "2024-07-06"
    },
    {
      id: 2,
      company: "Tech Solutions Pvt Ltd",
      billNumber: "INV-2024-002",
      dateRange: "July 3-7, 2024",
      rooms: "101, 102",
      nights: 8,
      amount: 24000,
      gstAmount: isGSTBranch ? 4320 : 0,
      totalAmount: isGSTBranch ? 28320 : 24000,
      status: "Pending",
      dueDate: "2024-07-15"
    },
    {
      id: 3,
      company: "Global Exports Inc",
      billNumber: "INV-2024-003",
      dateRange: "June 28 - July 2, 2024",
      rooms: "301, 302, 303",
      nights: 12,
      amount: 36000,
      gstAmount: isGSTBranch ? 6480 : 0,
      totalAmount: isGSTBranch ? 42480 : 36000,
      status: "Overdue",
      dueDate: "2024-07-05"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBills = companyBills.filter(bill => {
    return (
      (selectedCompany === "" || bill.company === selectedCompany) &&
      (filterStatus === "" || bill.status === filterStatus)
    );
  });

  const totalPending = filteredBills
    .filter(bill => bill.status !== "Paid")
    .reduce((sum, bill) => sum + bill.totalAmount, 0);

  const totalPaid = filteredBills
    .filter(bill => bill.status === "Paid")
    .reduce((sum, bill) => sum + bill.totalAmount, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="fo-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="fo-text-base text-muted-foreground">Total Paid</p>
                <p className="fo-text-xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="fo-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="fo-text-base text-muted-foreground">Total Pending</p>
                <p className="fo-text-xl font-bold text-red-600">₹{totalPending.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="fo-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="fo-text-base text-muted-foreground">Total Bills</p>
                <p className="fo-text-xl font-bold">₹{(totalPaid + totalPending).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="fo-card">
        <CardHeader>
          <CardTitle className="fo-text-xl flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Company Billing Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className="fo-input">
                <SelectValue placeholder="Select Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Companies</SelectItem>
                <SelectItem value="Milk Mist Company">Milk Mist Company</SelectItem>
                <SelectItem value="Tech Solutions Pvt Ltd">Tech Solutions Pvt Ltd</SelectItem>
                <SelectItem value="Global Exports Inc">Global Exports Inc</SelectItem>
              </SelectContent>
            </Select>
            
            <div>
              <Label className="fo-text-base">From Date</Label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="fo-input"
              />
            </div>
            
            <div>
              <Label className="fo-text-base">To Date</Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="fo-input"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="fo-input">
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="fo-button">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Company Bills Table */}
      <Card className="fo-card">
        <CardHeader>
          <CardTitle className="fo-text-xl flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Company Bills & Dues
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b-2">
                  <TableHead className="fo-text-base font-semibold">Company & Bill #</TableHead>
                  <TableHead className="fo-text-base font-semibold">Period & Rooms</TableHead>
                  <TableHead className="fo-text-base font-semibold">Billing Details</TableHead>
                  <TableHead className="fo-text-base font-semibold">Status</TableHead>
                  <TableHead className="fo-text-base font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBills.map((bill) => (
                  <TableRow key={bill.id} className="hover:bg-accent/50 transition-colors">
                    <TableCell className="py-4">
                      <div>
                        <p className="fo-text-lg font-semibold">{bill.company}</p>
                        <p className="fo-text-base text-muted-foreground">{bill.billNumber}</p>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div>
                        <p className="fo-text-base font-medium">{bill.dateRange}</p>
                        <p className="fo-text-base text-muted-foreground">Rooms: {bill.rooms}</p>
                        <p className="fo-text-base text-muted-foreground">{bill.nights} nights</p>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        <p className="fo-text-base">Base: ₹{bill.amount.toLocaleString()}</p>
                        {isGSTBranch && bill.gstAmount > 0 && (
                          <p className="fo-text-base text-muted-foreground">GST: ₹{bill.gstAmount.toLocaleString()}</p>
                        )}
                        <p className="fo-text-lg font-semibold">Total: ₹{bill.totalAmount.toLocaleString()}</p>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="space-y-2">
                        <Badge className={`${getStatusColor(bill.status)} fo-text-base px-3 py-1`}>
                          {bill.status}
                        </Badge>
                        {bill.status === "Paid" ? (
                          <p className="fo-text-base text-green-600">Paid: {bill.paymentDate}</p>
                        ) : (
                          <p className="fo-text-base text-red-600">Due: {bill.dueDate}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline" className="fo-button-outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View Bill
                        </Button>
                        <Button size="sm" variant="outline" className="fo-button-outline">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyBilling;
