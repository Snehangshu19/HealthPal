"use client"

import Link from "next/link"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, ImageIcon, FileText, Activity, AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Diagnostics() {
  const [activeTab, setActiveTab] = useState("images")
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Health Diagnostics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upload Health Data</CardTitle>
              <CardDescription>Upload medical images, reports, or input your symptoms for AI analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="images" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="images" className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    <span>Medical Images</span>
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Health Reports</span>
                  </TabsTrigger>
                  <TabsTrigger value="vitals" className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    <span>Vital Signs</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="images">
                  {!selectedFile ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Upload className="h-6 w-6 text-gray-500" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Upload Medical Images</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Supported formats: JPG, PNG, DICOM (X-rays, CT scans, MRIs, skin conditions)
                      </p>
                      <div className="flex justify-center">
                        <Label htmlFor="image-upload" className="cursor-pointer">
                          <div className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md inline-flex items-center gap-2">
                            <Upload className="h-4 w-4" />
                            <span>Select Image</span>
                          </div>
                          <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
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
                        {previewUrl && (
                          <div className="flex justify-center mb-4">
                            <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="max-h-64 rounded-md" />
                          </div>
                        )}
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="image-category">Image Category</Label>
                            <select
                              id="image-category"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                            >
                              <option value="">Select category</option>
                              <option value="skin">Skin Condition</option>
                              <option value="xray">X-Ray</option>
                              <option value="ct">CT Scan</option>
                              <option value="mri">MRI</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div>
                            <Label htmlFor="additional-notes">Additional Notes (optional)</Label>
                            <Textarea
                              id="additional-notes"
                              placeholder="Add any relevant information about the image..."
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
                            Our AI is analyzing your medical image. This may take a few moments...
                          </AlertDescription>
                        </Alert>
                      )}

                      {analysisComplete && (
                        <Alert className="bg-green-50 border-green-200">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <AlertTitle>Analysis Complete</AlertTitle>
                          <AlertDescription>
                            Your image has been analyzed. View the results in the panel on the right.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="reports">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <FileText className="h-6 w-6 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Upload Health Reports</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Supported formats: PDF, DOC, JPG (Lab reports, EHRs, medical records)
                    </p>
                    <div className="flex justify-center">
                      <Label htmlFor="report-upload" className="cursor-pointer">
                        <div className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md inline-flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          <span>Select Report</span>
                        </div>
                        <Input
                          id="report-upload"
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          className="hidden"
                        />
                      </Label>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="vitals">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="blood-pressure">Blood Pressure (mmHg)</Label>
                        <div className="flex gap-2 mt-1">
                          <Input id="systolic" placeholder="Systolic" />
                          <span className="flex items-center">/</span>
                          <Input id="diastolic" placeholder="Diastolic" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="heart-rate">Heart Rate (bpm)</Label>
                        <Input id="heart-rate" type="number" placeholder="e.g., 72" className="mt-1" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="temperature">Body Temperature (°F)</Label>
                        <Input id="temperature" type="number" step="0.1" placeholder="e.g., 98.6" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="blood-glucose">Blood Glucose (mg/dL)</Label>
                        <Input id="blood-glucose" type="number" placeholder="e.g., 95" className="mt-1" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="oxygen">Oxygen Saturation (%)</Label>
                        <Input id="oxygen" type="number" placeholder="e.g., 98" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="respiratory-rate">Respiratory Rate (breaths/min)</Label>
                        <Input id="respiratory-rate" type="number" placeholder="e.g., 16" className="mt-1" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="symptoms">Current Symptoms (if any)</Label>
                      <Textarea
                        id="symptoms"
                        placeholder="Describe any symptoms you're experiencing..."
                        className="mt-1"
                      />
                    </div>

                    <Button className="w-full bg-teal-600 hover:bg-teal-700">Analyze Vital Signs</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>AI Analysis Results</CardTitle>
              <CardDescription>
                {analysisComplete ? "Your health data analysis is complete" : "Upload health data to see AI analysis"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!analysisComplete ? (
                <div className="text-center py-8">
                  <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Activity className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-400 mb-2">No Analysis Yet</h3>
                  <p className="text-sm text-gray-500">
                    Upload your health data to receive AI-powered analysis and recommendations.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <h3 className="font-medium text-green-800">Analysis Complete</h3>
                    </div>
                    <p className="text-sm text-gray-700">Our AI has analyzed your uploaded skin image.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Preliminary Assessment</h3>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <p className="text-sm">
                        The image shows characteristics consistent with{" "}
                        <span className="font-medium">Atopic Dermatitis (Eczema)</span>, a common inflammatory skin
                        condition.
                      </p>
                    </div>

                    <h4 className="font-medium text-sm mb-2">Key Observations:</h4>
                    <ul className="text-sm space-y-2 mb-4">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-gray-600 text-xs">•</span>
                        </div>
                        <span>Reddened, inflamed skin patches</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-gray-600 text-xs">•</span>
                        </div>
                        <span>Dry, scaly texture</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-gray-600 text-xs">•</span>
                        </div>
                        <span>Pattern consistent with mild to moderate eczema</span>
                      </li>
                    </ul>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                        <h3 className="font-medium text-yellow-800">Important Note</h3>
                      </div>
                      <p className="text-sm text-gray-700">
                        This is an AI-generated assessment and not a medical diagnosis. Please consult with a
                        dermatologist for proper evaluation and treatment.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Recommended Next Steps</h3>
                    <ul className="text-sm space-y-3">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-teal-600 text-xs">1</span>
                        </div>
                        <span>Consult with a dermatologist for proper diagnosis and treatment plan</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-teal-600 text-xs">2</span>
                        </div>
                        <span>Keep the affected area moisturized with fragrance-free lotion</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-teal-600 text-xs">3</span>
                        </div>
                        <span>Avoid scratching and irritants that may worsen the condition</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                      <Link href="/doctors">Find Dermatologists Near You</Link>
                    </Button>
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
