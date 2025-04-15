import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, Stethoscope, MapPin, Upload, PlusCircle, Calendar } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="font-medium">Upload Health Data</h3>
            <p className="text-sm text-gray-500 mb-4">Images, reports, vitals</p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/diagnostics">Upload</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
              <Stethoscope className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="font-medium">Find Doctors</h3>
            <p className="text-sm text-gray-500 mb-4">Specialists near you</p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/doctors">Search</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="font-medium">Analyze Prescription</h3>
            <p className="text-sm text-gray-500 mb-4">Scan and understand</p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/prescriptions">Analyze</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="font-medium">Find Medicines</h3>
            <p className="text-sm text-gray-500 mb-4">Nearby pharmacies</p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/medicines">Find</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Health Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Health Summary</CardTitle>
            <CardDescription>Your recent health metrics and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Blood Pressure</div>
                  <div className="text-2xl font-semibold">120/80</div>
                  <div className="text-xs text-green-600">Normal</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Heart Rate</div>
                  <div className="text-2xl font-semibold">72 bpm</div>
                  <div className="text-xs text-green-600">Normal</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Blood Glucose</div>
                  <div className="text-2xl font-semibold">95 mg/dL</div>
                  <div className="text-xs text-green-600">Normal</div>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="font-medium mb-2">AI Health Insights</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-sm">Your vital signs are within normal ranges.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-yellow-600 text-xs">!</span>
                    </div>
                    <span className="text-sm">Consider increasing your daily water intake to improve hydration.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-sm">Your sleep pattern has been consistent over the past week.</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming</CardTitle>
            <CardDescription>Your scheduled appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-teal-500 pl-4 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Tomorrow, 10:00 AM</span>
                </div>
                <h4 className="font-medium">Dr. Sarah Johnson</h4>
                <p className="text-sm text-gray-600">Annual checkup</p>
              </div>

              <div className="border-l-4 border-gray-300 pl-4 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">May 15, 2:30 PM</span>
                </div>
                <h4 className="font-medium">Dr. Michael Chen</h4>
                <p className="text-sm text-gray-600">Dermatology consultation</p>
              </div>

              <Button asChild variant="outline" size="sm" className="w-full mt-4">
                <Link href="/appointments">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Schedule Appointment
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent health activities and analyses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="h-10 w-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h4 className="font-medium">Blood Test Results Analyzed</h4>
                <p className="text-sm text-gray-600 mb-2">AI analysis detected normal ranges for all markers.</p>
                <div className="text-xs text-gray-500">Yesterday, 2:45 PM</div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="h-10 w-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Stethoscope className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h4 className="font-medium">Doctor Appointment Completed</h4>
                <p className="text-sm text-gray-600 mb-2">Checkup with Dr. Williams - General Practitioner</p>
                <div className="text-xs text-gray-500">April 10, 11:30 AM</div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="h-10 w-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Upload className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h4 className="font-medium">Skin Condition Image Analyzed</h4>
                <p className="text-sm text-gray-600 mb-2">
                  AI suggests mild eczema. Recommended to consult a dermatologist.
                </p>
                <div className="text-xs text-gray-500">April 8, 9:15 AM</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
