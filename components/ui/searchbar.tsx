'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search, X } from 'lucide-react';

export default function SearchBar() {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const toggleInput = () => {
    setIsInputVisible(!isInputVisible);
  };

  const closeInput = () => {
    setIsInputVisible(false);
    setSearch('');
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
