import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prisma } from "@/lib/prisma";
import SizeTable from "@/components/adminComponents/size&color/SizeTable";
import ColorTable from "@/components/adminComponents/size&color/ColorTable";

export default async function SizeColorManagement() {
  const sizes = await prisma.size.findMany({ take: 10 });
  const colors = await prisma.color.findMany({ take: 10 });

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="sizes">
        <TabsList>
          <TabsTrigger value="sizes">Sizes</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
        </TabsList>
        <TabsContent value="sizes">
          <Suspense fallback={<div>Loading sizes...</div>}>
            <SizeTable initialSizes={sizes} />
          </Suspense>
        </TabsContent>
        <TabsContent value="colors">
          <Suspense fallback={<div>Loading colors...</div>}>
            <ColorTable initialColors={colors} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}