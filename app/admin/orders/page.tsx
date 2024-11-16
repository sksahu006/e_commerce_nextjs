'use client'

import { useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

// Define a type for order data
interface Order {
  id: string
  customerName: string
  date: string
  status: 'Pending' | 'Shipped' | 'Completed' | 'Canceled'
  total: number
}

// Mock data for demonstration
const mockOrders: Order[] = [
  { id: '1001', customerName: 'John Doe', date: '2023-05-15', status: 'Pending', total: 150.00 },
  { id: '1002', customerName: 'Jane Smith', date: '2023-05-14', status: 'Shipped', total: 89.99 },
  { id: '1003', customerName: 'Bob Johnson', date: '2023-05-13', status: 'Completed', total: 249.50 },
  { id: '1004', customerName: 'Alice Brown', date: '2023-05-12', status: 'Canceled', total: 75.25 },
  // Add more mock orders as needed
]

const statusColors: { [key in Order['status']]: string } = {
  Pending: 'bg-yellow-200 text-yellow-800',
  Shipped: 'bg-blue-200 text-blue-800',
  Completed: 'bg-green-200 text-green-800',
  Canceled: 'bg-red-200 text-red-800',
}

export default function OrderDashboard() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders)
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const ordersPerPage = 10

  const filterOrders = (status: string, term: string) => {
    let result = orders
    if (status !== 'All') {
      result = result.filter(order => order.status === status)
    }
    if (term) {
      result = result.filter(order => 
        order.id.toLowerCase().includes(term.toLowerCase()) ||
        order.customerName.toLowerCase().includes(term.toLowerCase())
      )
    }
    setFilteredOrders(result)
    setCurrentPage(1)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    filterOrders(status, searchTerm)
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterOrders(statusFilter, term)
  }

  const handleStatusUpdate = (orderId: string, newStatus: Order['status']) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    )
    setOrders(updatedOrders)
    setFilteredOrders(updatedOrders)
    setSelectedOrder(null)
    // Here you would typically make an API call to update the order status
  }

  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Order Management Dashboard</h1>
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="w-full sm:w-auto">
          <Input
            type="text"
            placeholder="Search by Order ID or Customer Name"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={statusFilter} onValueChange={handleStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Shipped">Shipped</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Canceled">Canceled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.map((order) => (
              <TableRow key={order.id} onClick={() => setSelectedOrder(order)} className="cursor-pointer hover:bg-gray-100">
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div>
          Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastOrder >= filteredOrders.length}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Sheet open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Order Details</SheetTitle>
            <SheetDescription>
              View and update order information
            </SheetDescription>
          </SheetHeader>
          {selectedOrder && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Order ID: {selectedOrder.id}</h3>
              <p>Customer: {selectedOrder.customerName}</p>
              <p>Date: {selectedOrder.date}</p>
              <p>Total: ${selectedOrder.total.toFixed(2)}</p>
              <div className="mt-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <Select
                  value={selectedOrder.status}
                  onValueChange={(value) => handleStatusUpdate(selectedOrder.id, value as Order['status'])}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
