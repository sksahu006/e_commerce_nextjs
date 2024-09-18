
"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';

export default function Cart() {
  return (
    <Button variant="ghost" size="icon">
      <ShoppingCart className="h-5 w-5" />
    </Button>
  );
}