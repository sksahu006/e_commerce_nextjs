"use client"

import { useState, useEffect } from "react"
import { Bell, CreditCard, LogOut, Package, Settings, User } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UserProfile() {
  const [isAddressesOpen, setIsAddressesOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex min-h-screen bg-background mt-24">
      {/* Sidebar */}
      <div className="w-1/4 border-r p-6 flex flex-col items-center">
        <Image
          src="/ph1.jpg"
          alt="User Avatar"
          width={150}
          height={150}
          className="rounded-full mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">John Doe</h1>
        <p className="text-muted-foreground mb-4">
          {currentTime.toLocaleTimeString()}
        </p>
        <Button variant="outline" className="w-full mb-2">
          <User className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
        <Button variant="destructive" className="w-full">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Tabs defaultValue="orders" className="w-full">
          <TabsList>
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="settings">Account Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <h2 className="text-xl font-semibold mb-4">Order History</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((order) => (
                <Card key={order}>
                  <CardHeader>
                    <CardTitle>Order #{order}</CardTitle>
                    <CardDescription>Placed on April {order}, 2023</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <Image src="/placeholder.svg" alt="Product" width={50} height={50} className="rounded" />
                      <div>
                        <p className="font-medium">Product Name</p>
                        <p className="text-sm text-muted-foreground">Status: Delivered</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="wishlist">
            <h2 className="text-xl font-semibold mb-4">Wishlist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <Card key={item}>
                  <CardContent className="p-4">
                    <Image src="/placeholder.svg" alt="Product" width={200} height={200} className="rounded mb-2" />
                    <h3 className="font-semibold">Product Name</h3>
                    <p className="text-muted-foreground">$99.99</p>
                    <Button className="w-full mt-2">Add to Cart</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="addresses">
            <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
            <Collapsible open={isAddressesOpen} onOpenChange={setIsAddressesOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="mb-4">
                  {isAddressesOpen ? "Hide Addresses" : "Show Addresses"}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-4">
                  {[1, 2].map((address) => (
                    <Card key={address}>
                      <CardContent className="p-4">
                        <p className="font-medium">Address {address}</p>
                        <p className="text-sm text-muted-foreground">123 Main St, Apt {address}, City, State 12345</p>
                        <div className="flex space-x-2 mt-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Delete</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
            <Button className="mt-4">Add New Address</Button>
          </TabsContent>
          <TabsContent value="settings">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button>Update Password</Button>
                  </form>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>You have 2 saved payment methods.</p>
                  <Button className="mt-2">Manage Payment Methods</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <input type="checkbox" className="form-checkbox" />
                      <span>Email notifications</span>
                    </Label>
                    <Label className="flex items-center space-x-2">
                      <input type="checkbox" className="form-checkbox" />
                      <span>SMS notifications</span>
                    </Label>
                    <Label className="flex items-center space-x-2">
                      <input type="checkbox" className="form-checkbox" />
                      <span>Push notifications</span>
                    </Label>
                  </div>
                  <Button className="mt-4">Update Preferences</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}