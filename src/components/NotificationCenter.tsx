
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertCircle, CheckCircle, Clock, X } from "lucide-react";

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "checkin",
      title: "New Check-in",
      message: "Rajesh Kumar checked into Room 101",
      time: "2 minutes ago",
      read: false,
      priority: "normal"
    },
    {
      id: 2,
      type: "payment",
      title: "Payment Overdue",
      message: "₹4,735 payment overdue for Room 205",
      time: "15 minutes ago",
      read: false,
      priority: "high"
    },
    {
      id: 3,
      type: "maintenance",
      title: "Maintenance Alert",
      message: "AC repair completed in Room 301",
      time: "1 hour ago",
      read: true,
      priority: "normal"
    },
    {
      id: 4,
      type: "checkout",
      title: "Checkout Reminder",
      message: "3 rooms scheduled for checkout today",
      time: "2 hours ago",
      read: false,
      priority: "normal"
    }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "checkin":
      case "checkout":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "payment":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case "maintenance":
        return <Clock className="h-5 w-5 text-orange-600" />;
      default:
        return <Bell className="h-5 w-5 text-blue-600" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button variant="outline" size="sm">
            Mark All Read
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-colors ${
                notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  {getIcon(notification.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{notification.title}</h4>
                      {notification.priority === "high" && (
                        <Badge variant="destructive" className="text-xs">
                          High Priority
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {notification.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!notification.read && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark Read
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => dismissNotification(notification.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
