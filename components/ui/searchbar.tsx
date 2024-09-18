"use client";
import { useState } from 'react';
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Input 
      type="search" 
      placeholder="Search..." 
      className="w-64" 
      value={search}
      onChange={handleSearch}
    />
  );
}