
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, Download, Calendar, DollarSign, Users, Building2 } from "lucide-react";

const ReportsAnalytics = () => {
  // Revenue data for last 7 days
  const revenueData = [
    { day: 'Mon', revenue: 45000, occupancy: 85 },
    { day: 'Tue', revenue: 52000, occupancy: 92 },
    { day: 'Wed', revenue: 38000, occupancy: 78 },
    { day: 'Thu', revenue: 61000, occupancy: 95 },
    { day: 'Fri', revenue: 58000, occupancy: 88 },
    { day: 'Sat', revenue: 72000, occupancy: 98 },
    { day: 'Sun', revenue: 55000, occupancy: 82 }
  ];

  // Room type distribution
  const roomTypeData = [
    { name: 'Deluxe', value: 45, color: '#8884d8' },
    { name: 'Suite', value: 25, color: '#82ca9d' },
    { name: 'Standard', value: 30, color: '#ffc658' }
  ];

  // Payment method distribution
  const paymentData = [
    { name: 'Cash', value: 35, color: '#ff7c7c' },
    { name: 'Card', value: 40, color: '#8884d8' },
    { name: 'UPI', value: 20, color: '#82ca9d' },
    { name: 'Bank Transfer', value: 5, color: '#ffc658' }
  ];

  // Monthly occupancy trend
  const occupancyTrend = [
    { month: 'Jan', occupancy: 75 },
    { month: 'Feb', occupancy: 82 },
    { month: 'Mar', occupancy: 78 },
    { month: 'Apr', occupancy: 85 },
    { month: 'May', occupancy: 88 },
    { month: 'Jun', occupancy: 92 },
    { month: 'Jul', occupancy: 89 }
  ];

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "#8884d8",
    },
    occupancy: {
      label: "Occupancy",
      color: "#82ca9d",
    },
  };

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Reports & Analytics Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select defaultValue="daily">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily Report</SelectItem>
                <SelectItem value="weekly">Weekly Report</SelectItem>
                <SelectItem value="monthly">Monthly Report</SelectItem>
                <SelectItem value="yearly">Yearly Report</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="front-desk">Front Desk</SelectItem>
                <SelectItem value="housekeeping">Housekeeping</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date Range
            </Button>

            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">₹3,81,000</p>
                <p className="text-xs text-green-600">+12% from last week</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Occupancy</p>
                <p className="text-2xl font-bold">88%</p>
                <p className="text-xs text-blue-600">+5% from last week</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Guests</p>
                <p className="text-2xl font-bold">234</p>
                <p className="text-xs text-purple-600">+18 new this week</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rate</p>
                <p className="text-2xl font-bold">₹2,850</p>
                <p className="text-xs text-orange-600">+8% from last week</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Revenue & Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="#8884d8" name="Revenue (₹)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Room Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Room Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <PieChart>
                <Pie
                  data={roomTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {roomTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <PieChart>
                <Pie
                  data={paymentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {paymentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Occupancy Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Occupancy Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={occupancyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="occupancy" 
                  stroke="#82ca9d" 
                  strokeWidth={3}
                  name="Occupancy (%)"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Outstanding Dues Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Outstanding Dues Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <h3 className="text-lg font-semibold text-red-700">Overdue</h3>
              <p className="text-2xl font-bold text-red-600">₹45,230</p>
              <p className="text-sm text-red-600">5 invoices</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-700">Due This Week</h3>
              <p className="text-2xl font-bold text-yellow-600">₹1,23,500</p>
              <p className="text-sm text-yellow-600">12 invoices</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-700">Paid This Week</h3>
              <p className="text-2xl font-bold text-green-600">₹2,45,800</p>
              <p className="text-sm text-green-600">28 payments</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsAnalytics;
