
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, User, Calendar, Receipt, Settings } from "lucide-react";

interface AuditLogProps {
  userRole: string;
}

const AuditLog = ({ userRole }: AuditLogProps) => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [filterAction, setFilterAction] = useState("all");
  const [filterUser, setFilterUser] = useState("all");

  // Mock audit data
  useEffect(() => {
    const mockLogs = [
      {
        id: 1,
        timestamp: "2024-07-03 14:30:22",
        user: "john.doe@hotel.com",
        role: "front-office",
        action: "check-in",
        details: "Guest check-in: Rajesh Kumar, Room 101",
        ipAddress: "192.168.1.45",
        branch: "Anna Salai"
      },
      {
        id: 2,
        timestamp: "2024-07-03 14:25:15",
        user: "manager@hotel.com",
        role: "fmo",
        action: "room-status",
        details: "Changed Room 205 status from Dirty to Available",
        ipAddress: "192.168.1.67",
        branch: "Anna Salai"
      },
      {
        id: 3,
        timestamp: "2024-07-03 14:20:08",
        user: "billing@hotel.com",
        role: "bmo",
        action: "invoice",
        details: "Generated invoice INV-2024-001234 for ₹7,500",
        ipAddress: "192.168.1.23",
        branch: "Anna Salai"
      },
      {
        id: 4,
        timestamp: "2024-07-03 14:15:33",
        user: "admin@hotel.com",
        role: "admin",
        action: "user-update",
        details: "Updated user permissions for john.doe@hotel.com",
        ipAddress: "192.168.1.10",
        branch: "All Branches"
      },
      {
        id: 5,
        timestamp: "2024-07-03 14:10:45",
        user: "reception@hotel.com",
        role: "front-office",
        action: "check-out",
        details: "Guest check-out: Priya Sharma, Room 102, Bill: ₹6,000",
        ipAddress: "192.168.1.55",
        branch: "Erode Road"
      }
    ];
    setAuditLogs(mockLogs);
  }, []);

  // Only Admin and BMO can view audit logs
  if (userRole !== "admin" && userRole !== "bmo") {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Access Restricted</h3>
          <p className="text-gray-600">You don't have permission to view audit logs.</p>
        </CardContent>
      </Card>
    );
  }

  const getActionIcon = (action) => {
    switch (action) {
      case "check-in":
      case "check-out":
        return <User className="h-4 w-4" />;
      case "invoice":
        return <Receipt className="h-4 w-4" />;
      case "room-status":
        return <Calendar className="h-4 w-4" />;
      case "user-update":
        return <Settings className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case "check-in": return "bg-green-100 text-green-800";
      case "check-out": return "bg-blue-100 text-blue-800";
      case "invoice": return "bg-purple-100 text-purple-800";
      case "room-status": return "bg-yellow-100 text-yellow-800";
      case "user-update": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const actionMatch = filterAction === "all" || log.action === filterAction;
    const userMatch = filterUser === "all" || log.role === filterUser;
    return actionMatch && userMatch;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Audit Log & Activity Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Select value={filterAction} onValueChange={setFilterAction}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="check-in">Check-ins</SelectItem>
                <SelectItem value="check-out">Check-outs</SelectItem>
                <SelectItem value="invoice">Invoices</SelectItem>
                <SelectItem value="room-status">Room Updates</SelectItem>
                <SelectItem value="user-update">User Changes</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterUser} onValueChange={setFilterUser}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="bmo">BMO</SelectItem>
                <SelectItem value="fmo">FMO</SelectItem>
                <SelectItem value="front-office">Front Office</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                {filteredLogs.length} records
              </Badge>
              <Badge variant="outline" className="text-sm">
                Last 24 hours
              </Badge>
            </div>
          </div>

          {/* Audit Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">
                      {log.timestamp}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-sm">{log.user}</div>
                        <Badge className={`text-xs ${
                          log.role === "admin" ? "bg-red-100 text-red-700" :
                          log.role === "bmo" ? "bg-blue-100 text-blue-700" :
                          log.role === "fmo" ? "bg-green-100 text-green-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {log.role.toUpperCase()}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getActionColor(log.action)} flex items-center gap-1 w-fit`}>
                        {getActionIcon(log.action)}
                        {log.action.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="text-sm truncate" title={log.details}>
                        {log.details}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{log.branch}</TableCell>
                    <TableCell className="font-mono text-xs text-gray-600">
                      {log.ipAddress}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Summary (Last 24 Hours)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-600">12</div>
              <div className="text-sm text-green-700">Check-ins</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-600">8</div>
              <div className="text-sm text-blue-700">Check-outs</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-xl font-bold text-purple-600">15</div>
              <div className="text-sm text-purple-700">Invoices</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-xl font-bold text-yellow-600">23</div>
              <div className="text-sm text-yellow-700">Room Updates</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-xl font-bold text-red-600">3</div>
              <div className="text-sm text-red-700">System Changes</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLog;
