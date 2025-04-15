"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, Camera, CheckCircle2, AlertCircle, MapPin, Clock, ExternalLink } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

export default function Prescriptions() {
  const [activeTab, setActiveTab] = useState("upload")
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [zipCode, setZipCode] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file)

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewUrl(null)
    }
  }

  const handleUpload = () => {
    if (!selectedFile) return

    setIsUploading(true)

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      setIsAnalyzing(true)

      // Simulate AI analysis
      setTimeout(() => {
        setIsAnalyzing(false)
        setAnalysisComplete(true)
      }, 3000)
    }, 2000)
  }

  const resetUpload = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setIsUploading(false)
    setIsAnalyzing(false)
    setAnalysisComplete(false)
  }

  // Mock data for pharmacies
  const mockPharmacies = [
    {
      id: 1,
      name: "HealthPlus Pharmacy",
      distance: "0.8 miles",
      address: "123 Main St",
      hours: "Open until 9 PM",
      hasAllMeds: true,
    },
    {
      id: 2,
      name: "MediCare Pharmacy",
      distance: "1.2 miles",
      address: "456 Oak Ave",
      hours: "Open until 10 PM",
      hasAllMeds: true,
    },
    {
      id: 3,
      name: "Community Drugs",
      distance: "1.5 miles",
      address: "789 Pine Blvd",
      hours: "Open until 8 PM",
      hasAllMeds: false,
      missingMeds: ["Fluticasone Propionate"],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Prescription Analysis</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Analyze Your Prescription</CardTitle>
              <CardDescription>
                Upload a prescription to analyze and find nearby pharmacies with available medications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="upload" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Upload Prescription</span>
                  </TabsTrigger>
                  <TabsTrigger value="camera" className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    <span>Take Photo</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upload">
                  {!selectedFile ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Upload className="h-6 w-6 text-gray-500" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Upload Prescription</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Supported formats: JPG, PNG, PDF (Digital or scanned prescriptions)
                      </p>
                      <div className="flex justify-center">
                        <Label htmlFor="prescription-upload" className="cursor-pointer">
                          <div className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md inline-flex items-center gap-2">
                            <Upload className="h-4 w-4" />
                            <span>Select File</span>
                          </div>
                          <Input
                            id="prescription-upload"
                            type="file"
                            accept="image/*,.pdf"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </Label>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">{selectedFile.name}</h3>
                          <Button variant="ghost" size="sm" onClick={resetUpload}>
                            Remove
                          </Button>
                        </div>
                        {previewUrl && selectedFile.type.startsWith("image/") && (
                          <div className="flex justify-center mb-4">
                            <img
                              src={previewUrl || "/placeholder.svg"}
                              alt="Prescription Preview"
                              className="max-h-64 rounded-md"
                            />
                          </div>
                        )}

                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="zip-code">Your ZIP Code (for pharmacy search)</Label>
                            <Input
                              id="zip-code"
                              placeholder="Enter ZIP code"
                              value={zipCode}
                              onChange={(e) => setZipCode(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleUpload}
                        disabled={isUploading || isAnalyzing}
                        className="w-full bg-teal-600 hover:bg-teal-700"
                      >
                        {isUploading ? "Uploading..." : isAnalyzing ? "Analyzing..." : "Upload & Analyze"}
                      </Button>

                      {isAnalyzing && (
                        <Alert className="bg-yellow-50 border-yellow-200">
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                          <AlertTitle>Processing</AlertTitle>
                          <AlertDescription>
                            Our AI is analyzing your prescription. This may take a few moments...
                          </AlertDescription>
                        </Alert>
                      )}

                      {analysisComplete && (
                        <Alert className="bg-green-50 border-green-200">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <AlertTitle>Analysis Complete</AlertTitle>
                          <AlertDescription>
                            Your prescription has been analyzed. View the results and nearby pharmacies.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="camera">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Camera className="h-6 w-6 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Take a Photo</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Use your camera to take a clear photo of your prescription
                    </p>
                    <Button className="bg-teal-600 hover:bg-teal-700">Open Camera</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Prescription Details</CardTitle>
              <CardDescription>
                {analysisComplete ? "Your prescription analysis is complete" : "Upload a prescription to see details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!analysisComplete ? (
                <div className="text-center py-8">
                  <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-400 mb-2">No Analysis Yet</h3>
                  <p className="text-sm text-gray-500">
                    Upload your prescription to receive AI-powered analysis and find nearby pharmacies.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <h3 className="font-medium text-green-800">Analysis Complete</h3>
                    </div>
                    <p className="text-sm text-gray-700">
                      Our AI has analyzed your prescription and identified the medications.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Prescribed Medications</h3>

                    <div className="space-y-3">
                      <div className="border rounded-lg p-3">
                        <h4 className="font-medium">Fluticasone Propionate</h4>
                        <p className="text-sm text-gray-600">50 mcg/spray nasal spray</p>
                        <div className="text-xs text-gray-500 mt-1">1 spray in each nostril daily</div>
                      </div>

                      <div className="border rounded-lg p-3">
                        <h4 className="font-medium">Cetirizine</h4>
                        <p className="text-sm text-gray-600">10 mg tablets</p>
                        <div className="text-xs text-gray-500 mt-1">1 tablet daily</div>
                      </div>

                      <div className="border rounded-lg p-3">
                        <h4 className="font-medium">Hydrocortisone Cream</h4>
                        <p className="text-sm text-gray-600">1% topical cream</p>
                        <div className="text-xs text-gray-500 mt-1">Apply to affected areas twice daily</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Nearby Pharmacies</h3>

                    <div className="space-y-3">
                      {mockPharmacies.map((pharmacy) => (
                        <div
                          key={pharmacy.id}
                          className={`border rounded-lg p-3 ${pharmacy.hasAllMeds ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}`}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{pharmacy.name}</h4>
                            <div className="flex items-center text-xs">
                              <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                              <span className="text-gray-600">{pharmacy.distance}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{pharmacy.address}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{pharmacy.hours}</span>
                          </div>

                          <div className="mt-2 flex items-center">
                            {pharmacy.hasAllMeds ? (
                              <div className="text-xs text-green-600 flex items-center">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                <span>All medications available</span>
                              </div>
                            ) : (
                              <div className="text-xs text-yellow-600 flex items-center">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                <span>Missing: {pharmacy.missingMeds?.join(", ")}</span>
                              </div>
                            )}
                          </div>

                          <div className="mt-2 flex gap-2">
                            <Button asChild variant="outline" size="sm" className="text-xs h-7">
                              <Link href={`tel:+1234567890`}>Call</Link>
                            </Button>
                            <Button asChild size="sm" className="text-xs h-7 bg-teal-600 hover:bg-teal-700">
                              <Link href={`https://maps.google.com`} target="_blank">
                                Directions
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
