"use client";

import { useState, useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ColorTableItem, SizeTableItem } from "@/lib/types/schemaTypes";
import { colorSchema, sizeSchema } from "@/lib/types/validationTypes";
import { createSize, updateSize } from "@/app/actions/adminActions/size";
import { createColor, updateColor } from "@/app/actions/adminActions/color";
import { Plus } from "lucide-react";

// Separate interfaces for size and color forms
interface SizeFormData extends FieldValues {
  name: string;
  id?: string;
}

interface ColorFormData extends FieldValues {
  name: string;
  hexCode: string;
  id?: string;
}

type AddEditDialogProps = {
  type: "size" | "color";
  item?: SizeTableItem | ColorTableItem;
  onClose?: () => void;
  defaultOpen?: boolean;
};

export default function AddEditDialog({
  type,
  item,
  onClose,
  defaultOpen = false,
}: AddEditDialogProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  // Type guard to check if item is a ColorTableItem
  const isColorItem = (item: any): item is ColorTableItem => {
    return "hexCode" in item;
  };

  // Use separate form instances based on type
  const colorForm = useForm<ColorFormData>({
    resolver: zodResolver(colorSchema),
    defaultValues:
      type === "color" && item && isColorItem(item)
        ? { name: item.name, hexCode: item.hexCode }
        : { name: "", hexCode: "#000000" },
  });

  const sizeForm = useForm<SizeFormData>({
    resolver: zodResolver(sizeSchema),
    defaultValues:
      type === "size" && item && !isColorItem(item)
        ? { name: item.name }
        : { name: "" },
  });

  // Use the appropriate form based on type
  const form = type === "color" ? colorForm : sizeForm;

  const mutation = useMutation({
    mutationFn: async (data: ColorFormData | SizeFormData) => {
      if (type === "size") {
        return item
          ? updateSize(item.id, data as SizeTableItem)
          : createSize(data as SizeTableItem);
      } else {
        return item
          ? updateColor(item.id, data as ColorTableItem)
          : createColor(data as ColorTableItem);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [type === "size" ? "sizes" : "colors"],
      });
      setIsOpen(false);
      if (onClose) onClose();
      form.reset();
    },
  });

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
    form.reset();
  };

  const onSubmit = async (data: ColorFormData | SizeFormData) => {
    await mutation.mutateAsync(data);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) handleClose();
      }}
    >
      {!item && (
        <DialogTrigger asChild>
          <Button onClick={() => setIsOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add {type}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {item ? "Edit" : "Add"} {type}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                {...form.register("name")}
              />
            </div>
            {type === "color" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hexCode" className="text-right">
                  Hex Code
                </Label>
                <Input
                  id="hexCode"
                  type="color"
                  className="col-span-3 h-10"
                  {...colorForm.register("hexCode")}
                />
              </div>
            )}
          </div>
          {form.formState.errors.name?.message && (
            <p className="text-red-500">
              {form.formState.errors.name.message as string}
            </p>
          )}
          {type === "color" && colorForm.formState.errors.hexCode?.message && (
            <p className="text-red-500">
              {colorForm.formState.errors.hexCode.message as string}
            </p>
          )}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
