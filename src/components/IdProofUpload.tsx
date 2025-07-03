
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, File, CheckCircle, AlertCircle } from "lucide-react";

const IdProofUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [validationStatus, setValidationStatus] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Basic validation
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        setValidationStatus({
          type: 'error',
          message: 'Please upload only JPG, PNG, or PDF files'
        });
        return;
      }

      if (file.size > maxSize) {
        setValidationStatus({
          type: 'error',
          message: 'File size should be less than 5MB'
        });
        return;
      }

      setUploading(true);
      
      // Simulate upload process
      setTimeout(() => {
        setUploadedFile(file);
        setValidationStatus({
          type: 'success',
          message: 'ID proof uploaded and validated successfully'
        });
        setUploading(false);
      }, 2000);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setValidationStatus(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          ID Proof Upload
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Upload Guest ID Proof</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {!uploadedFile ? (
              <div className="space-y-4">
                <Upload className="h-12 w-12 mx-auto text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    Supported formats: JPG, PNG, PDF (Max 5MB)
                  </p>
                </div>
                <Input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="id-proof-upload"
                />
                <Label htmlFor="id-proof-upload" className="cursor-pointer">
                  <Button type="button" variant="outline" disabled={uploading}>
                    {uploading ? "Uploading..." : "Choose File"}
                  </Button>
                </Label>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <File className="h-8 w-8 text-blue-600" />
                  <div className="text-left">
                    <p className="font-medium text-sm">{uploadedFile.name}</p>
                    <p className="text-xs text-gray-500">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={removeFile}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove File
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Validation Status */}
        {validationStatus && (
          <Alert className={validationStatus.type === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
            {validationStatus.type === 'error' ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            <AlertDescription>
              {validationStatus.message}
            </AlertDescription>
          </Alert>
        )}

        {/* Accepted ID Types */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Accepted ID Types:</Label>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div>• Aadhaar Card</div>
            <div>• Passport</div>
            <div>• Driving License</div>
            <div>• Voter ID</div>
            <div>• PAN Card</div>
            <div>• Corporate ID</div>
          </div>
        </div>

        {/* Validation Requirements */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Validation Requirements:</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Image should be clear and readable</li>
            <li>• All corners of the ID should be visible</li>
            <li>• No blur or glare on the document</li>
            <li>• File format: JPG, PNG, or PDF only</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default IdProofUpload;
