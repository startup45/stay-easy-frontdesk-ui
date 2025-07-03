
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Building2, User, Lock, Globe } from "lucide-react";

interface LoginScreenProps {
  onLogin: (role: string, branch: string, language: string) => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [branch, setBranch] = useState("");
  const [language, setLanguage] = useState("en");

  const roles = [
    { value: "admin", label: "Admin", description: "Full system access", color: "bg-red-100 text-red-800" },
    { value: "bmo", label: "BMO", description: "Branch Manager", color: "bg-blue-100 text-blue-800" },
    { value: "fmo", label: "FMO", description: "Floor Manager", color: "bg-green-100 text-green-800" },
    { value: "front-office", label: "Front Office", description: "Guest Services", color: "bg-yellow-100 text-yellow-800" }
  ];

  const branches = [
    { value: "anna-salai", label: "Anna Salai", gst: true },
    { value: "erode-road", label: "Erode Road", gst: true },
    { value: "coimbatore-road", label: "Coimbatore Road", gst: true },
    { value: "bhavani-road", label: "Bhavani Road (Non-GST)", gst: false }
  ];

  const languages = [
    { value: "en", label: "English" },
    { value: "ta", label: "தமிழ்" },
    { value: "hi", label: "हिंदी" }
  ];

  const handleLogin = () => {
    if (username && password && role && branch) {
      onLogin(role, branch, language);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Hotel Management System</CardTitle>
          <p className="text-gray-600">Please login to continue</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    <div className="flex items-center gap-2">
                      <Badge className={r.color}>{r.label}</Badge>
                      <span className="text-sm text-gray-600">{r.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Branch</Label>
            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger>
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((b) => (
                  <SelectItem key={b.value} value={b.value}>
                    <div className="flex items-center gap-2">
                      <span>{b.label}</span>
                      {!b.gst && <Badge variant="outline" className="text-xs">Non-GST</Badge>}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      {lang.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!username || !password || !role || !branch}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;
