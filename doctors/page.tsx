"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Search, Star, Phone, Calendar, Clock } from "lucide-react"
import Link from "next/link"

// Mock data for doctors
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Dermatologist",
    rating: 4.9,
    reviews: 124,
    distance: "1.2 miles",
    address: "123 Medical Center Dr, Suite 101",
    availability: "Today",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    rating: 4.7,
    reviews: 98,
    distance: "2.5 miles",
    address: "456 Health Parkway, Building B",
    availability: "Tomorrow",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatologist",
    rating: 4.8,
    reviews: 156,
    distance: "3.1 miles",
    address: "789 Wellness Blvd, Suite 205",
    availability: "May 12",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Dermatologist",
    rating: 4.6,
    reviews: 87,
    distance: "3.8 miles",
    address: "321 Care Street, Medical Plaza",
    availability: "May 13",
    image: "/placeholder.svg?height=80&width=80",
  },
]

// Mock data for hospitals
const mockHospitals = [
  {
    id: 1,
    name: "City General Hospital",
    specialties: ["Dermatology", "Cardiology", "Orthopedics"],
    rating: 4.5,
    reviews: 312,
    distance: "2.3 miles",
    address: "1000 Hospital Way",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "University Medical Center",
    specialties: ["Dermatology", "Neurology", "Oncology"],
    rating: 4.8,
    reviews: 425,
    distance: "4.1 miles",
    address: "2500 Academic Boulevard",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function Doctors() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("Dermatologist")
  const [zipCode, setZipCode] = useState("")
  const [activeTab, setActiveTab] = useState("doctors")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would trigger an API call with the search parameters
    console.log("Searching for:", { searchQuery, selectedSpecialty, zipCode })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Find Medical Help</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search for Healthcare Providers</CardTitle>
          <CardDescription>Find doctors, specialists, and hospitals based on your health needs</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="specialty">Specialty</Label>
                <select
                  id="specialty"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                >
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Orthopedist">Orthopedist</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Pediatrician">Pediatrician</option>
                  <option value="General Practitioner">General Practitioner</option>
                </select>
              </div>

              <div>
                <Label htmlFor="location">ZIP Code</Label>
                <div className="flex mt-1">
                  <div className="relative flex-grow">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      placeholder="Enter ZIP code"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="search">Search</Label>
                <div className="flex mt-1">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search by name or keyword"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button type="submit" className="ml-2 bg-teal-600 hover:bg-teal-700">
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "doctors" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-600 hover:text-teal-600"
          }`}
          onClick={() => setActiveTab("doctors")}
        >
          Doctors
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "hospitals" ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-600 hover:text-teal-600"
          }`}
          onClick={() => setActiveTab("hospitals")}
        >
          Hospitals
        </button>
      </div>

      {activeTab === "doctors" ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Recommended Dermatologists Near You</h2>

          {mockDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-grow space-y-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <h3 className="text-lg font-semibold">{doctor.name}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{doctor.distance}</span>
                      </div>
                    </div>
                    <p className="text-teal-600">{doctor.specialty}</p>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{doctor.rating}</span>
                      </div>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{doctor.reviews} reviews</span>
                    </div>
                    <p className="text-sm text-gray-600">{doctor.address}</p>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Next available: {doctor.availability}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:justify-center">
                    <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
                      <Link href={`tel:+1234567890`}>
                        <Phone className="h-4 w-4" />
                        <span>Call</span>
                      </Link>
                    </Button>
                    <Button asChild className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2">
                      <Link href={`/appointments/book?doctor=${doctor.id}`}>
                        <Calendar className="h-4 w-4" />
                        <span>Book</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Hospitals with Dermatology Departments</h2>

          {mockHospitals.map((hospital) => (
            <Card key={hospital.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={hospital.image || "/placeholder.svg"}
                      alt={hospital.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-grow space-y-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <h3 className="text-lg font-semibold">{hospital.name}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{hospital.distance}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {hospital.specialties.map((specialty, index) => (
                        <span key={index} className="bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{hospital.rating}</span>
                      </div>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{hospital.reviews} reviews</span>
                    </div>
                    <p className="text-sm text-gray-600">{hospital.address}</p>
                  </div>
                  <div className="flex flex-col gap-2 md:justify-center">
                    <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
                      <Link href={`tel:+1234567890`}>
                        <Phone className="h-4 w-4" />
                        <span>Call</span>
                      </Link>
                    </Button>
                    <Button asChild className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2">
                      <Link href={`/hospitals/${hospital.id}`}>
                        <Calendar className="h-4 w-4" />
                        <span>View Details</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
