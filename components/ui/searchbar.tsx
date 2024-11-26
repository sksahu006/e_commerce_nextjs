'use client';

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation'; // For updating the URL
import { Search, X } from 'lucide-react';

export default function SearchBar() {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const router = useRouter();

 
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); 

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (debouncedSearch) {
      params.set("search", debouncedSearch); 
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`); 
  }, [debouncedSearch, router]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const toggleInput = () => {
    setIsInputVisible(!isInputVisible);
  };

  const closeInput = () => {
    setSearch("");
    const params = new URLSearchParams(window.location.search);
    params.delete("search");
    router.push(`?${params.toString()}`); 
  };

  return (
    <div className="flex items-center space-x-2">
      {!isInputVisible && (
        <Search
          className="h-5 w-5 cursor-pointer"
          onClick={toggleInput}
        />
      )}

      <div
        className={`flex items-center space-x-2 transition-all duration-300 ease-in-out ${
          isInputVisible ? 'w-[280px]' : 'w-0 overflow-hidden'
        }`}
      >
        {isInputVisible && (
          <>
            <Input
              type="search"
              placeholder="Search for products"
              className="w-full"
              value={search}
              onChange={handleSearch}
              autoFocus
            />
            <X
              className="h-5 w-5 cursor-pointer text-gray-500"
              onClick={closeInput}
            />
          </>
        )}
      </div>
    </div>
  );
}
