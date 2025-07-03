
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Receipt, AlertCircle, Calculator, Clock } from "lucide-react";

interface SmartBillingProps {
  userRole: string;
  branch: string;
  isGSTBranch: boolean;
}

const SmartBilling = ({ userRole, branch, isGSTBranch }: SmartBillingProps) => {
  const [extendedStays, setExtendedStays] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Mock extended stay data
  useEffect(() => {
    const mockExtendedStays = [
      {
        id: 1,
        guestName: "Rajesh Kumar",
        room: "101",
        originalCheckOut: "2024-07-03",
        actualCheckOut: "2024-07-05",
        extraNights: 2,
        originalBill: 7500,
        additionalCharges: 5000,
        newTotal: 12500,
        status: "pending"
      },
      {
        id: 2,
        guestName: "Priya Sharma",
        room: "205",
        originalCheckOut: "2024-07-02",
        actualCheckOut: "2024-07-04",
        extraNights: 2,
        originalBill: 6000,
        additionalCharges: 6000,
        newTotal: 12000,
        status: "calculated"
      }
    ];
    setExtendedStays(mockExtendedStays);

    // Create notifications for FO/FMO
    if (userRole === "front-office" || userRole === "fmo") {
      setNotifications([
        "2 guests have extended stays requiring bill recalculation",
        "Auto-billing has been triggered for Room 101",
        "Manual review needed for Room 205 extended stay"
      ]);
    }
  }, [userRole]);

  const handleRecalculateBill = (stayId) => {
    setExtendedStays(stays => 
      stays.map(stay => 
        stay.id === stayId 
          ? { ...stay, status: "recalculated" }
          : stay
      )
    );
  };

  const canPrintBill = isGSTBranch;

  return (
    <div className="space-y-6">
      {/* Smart Billing Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Smart Billing System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">₹1,23,450</div>
              <div className="text-sm text-blue-700">Today's Revenue</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">₹45,230</div>
              <div className="text-sm text-orange-700">Pending Bills</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">2</div>
              <div className="text-sm text-green-700">Auto-Extended Stays</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications for FO/FMO */}
      {(userRole === "front-office" || userRole === "fmo") && notifications.length > 0 && (
        <Alert className="border-blue-200 bg-blue-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              {notifications.map((notification, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  <span className="text-sm">{notification}</span>
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Extended Stays Management */}
      <Card>
        <CardHeader>
          <CardTitle>Extended Stays & Auto-Billing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {extendedStays.map((stay) => (
              <div key={stay.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{stay.guestName} - Room {stay.room}</h3>
                    <p className="text-sm text-gray-600">
                      Extended from {stay.originalCheckOut} to {stay.actualCheckOut}
                    </p>
                  </div>
                  <Badge variant={stay.status === "recalculated" ? "default" : "secondary"}>
                    {stay.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Extra Nights:</span>
                    <div className="font-medium">{stay.extraNights}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Original Bill:</span>
                    <div className="font-medium">₹{stay.originalBill.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Additional:</span>
                    <div className="font-medium text-orange-600">+₹{stay.additionalCharges.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">New Total:</span>
                    <div className="font-bold text-green-600">₹{stay.newTotal.toLocaleString()}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {stay.status === "pending" && (
                    <Button 
                      size="sm" 
                      onClick={() => handleRecalculateBill(stay.id)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Auto-Recalculate
                    </Button>
                  )}
                  
                  {canPrintBill ? (
                    <Button size="sm" variant="outline">
                      <Receipt className="h-3 w-3 mr-1" />
                      Print Bill
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" disabled>
                      <Receipt className="h-3 w-3 mr-1" />
                      Bill Print Disabled (Non-GST)
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing Restrictions Alert */}
      {!canPrintBill && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Non-GST Branch:</strong> Bill printing is disabled for this branch. 
            Only manual receipts are allowed.
          </AlertDescription>
        </Alert>
      )}

      {/* Hidden Company Totals for FO */}
      {userRole !== "front-office" && (
        <Card>
          <CardHeader>
            <CardTitle>Company Billing Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">8</div>
                <div className="text-sm text-purple-700">Company Guests Today</div>
              </div>
              <div className="text-center p-4 bg-indigo-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">₹34,500</div>
                <div className="text-sm text-indigo-700">Company Billing</div>
              </div>
              <div className="text-center p-4 bg-teal-50 rounded-lg">
                <div className="text-2xl font-bold text-teal-600">12</div>
                <div className="text-sm text-teal-700">Corporate Accounts</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartBilling;
