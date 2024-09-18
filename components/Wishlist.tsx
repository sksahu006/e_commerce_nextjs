"use client";
import { Button } from "@/components/ui/button";
import { Heart } from 'lucide-react';

export default function Wishlist() {
  return (
    <Button variant="ghost" size="icon">
      <Heart className="h-5 w-5" />
    </Button>
  );
}