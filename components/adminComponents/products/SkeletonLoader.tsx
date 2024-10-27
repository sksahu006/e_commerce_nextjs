'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function SkeletonLoader() {
  const skeletonRows = Array.from({ length: 5 }, (_, i) => i); 

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Brand</TableHead>
          <TableHead>Categories</TableHead>
          <TableHead>Base Price</TableHead>
          <TableHead>Discount Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {skeletonRows.map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-5 w-16" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-40" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-20" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-20" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-16" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-24" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
