"use client";
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex items-center justify-center">
      <Search className="mr-2" />
      <Input
        type="search"
        placeholder="eg:-tshirt"
        className="w-64"
        value={search}
        onChange={handleSearch}
      />
    </div>


  );
}