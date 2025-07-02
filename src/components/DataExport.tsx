
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, FileText, Table, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DataExport = () => {
  const { toast } = useToast();
  const [exportType, setExportType] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const availableFields = [
    { id: "guest_name", label: "Guest Name" },
    { id: "room_number", label: "Room Number" },
    { id: "check_in", label: "Check-in Date" },
    { id: "check_out", label: "Check-out Date" },
    { id: "amount", label: "Amount" },
    { id: "payment_mode", label: "Payment Mode" },
    { id: "guest_phone", label: "Guest Phone" },
    { id: "guest_email", label: "Guest Email" }
  ];

  const handleFieldChange = (fieldId: string, checked: boolean) => {
    if (checked) {
      setSelectedFields([...selectedFields, fieldId]);
    } else {
      setSelectedFields(selectedFields.filter(id => id !== fieldId));
    }
  };

  const handleExport = (format: string) => {
    if (!exportType || !dateRange) {
      toast({
        title: "Error",
        description: "Please select export type and date range",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Export Started",
      description: `Generating ${format.toUpperCase()} file for ${exportType} data...`,
    });

    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Completed",
        description: `${format.toUpperCase()} file has been downloaded`,
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Data Export & Backup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Export Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Export Type</Label>
                <Select value={exportType} onValueChange={setExportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guests">Guest Records</SelectItem>
                    <SelectItem value="bookings">Booking History</SelectItem>
                    <SelectItem value="payments">Payment Records</SelectItem>
                    <SelectItem value="rooms">Room Data</SelectItem>
                    <SelectItem value="companies">Company Records</SelectItem>
                    <SelectItem value="all">All Data</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date Range</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Field Selection */}
            <div className="space-y-4">
              <Label>Select Fields to Export</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableFields.map((field) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={field.id}
                      checked={selectedFields.includes(field.id)}
                      onCheckedChange={(checked) => handleFieldChange(field.id, !!checked)}
                    />
                    <Label htmlFor={field.id} className="text-sm">
                      {field.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => handleExport('excel')}
                className="h-16 flex flex-col items-center justify-center space-y-2"
              >
                <Table className="h-6 w-6" />
                <span>Export to Excel</span>
              </Button>

              <Button
                onClick={() => handleExport('pdf')}
                variant="outline"
                className="h-16 flex flex-col items-center justify-center space-y-2"
              >
                <FileText className="h-6 w-6" />
                <span>Export to PDF</span>
              </Button>

              <Button
                onClick={() => handleExport('csv')}
                variant="outline"
                className="h-16 flex flex-col items-center justify-center space-y-2"
              >
                <Download className="h-6 w-6" />
                <span>Export to CSV</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleExport('excel')}
            >
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Today's Report</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleExport('pdf')}
            >
              <FileText className="h-6 w-6" />
              <span className="text-sm">Guest List</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleExport('excel')}
            >
              <Table className="h-6 w-6" />
              <span className="text-sm">Payment Report</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleExport('pdf')}
            >
              <Download className="h-6 w-6" />
              <span className="text-sm">Full Backup</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataExport;
