import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useList } from "@/context/ListContext";
import { Box } from "lucide-react";

type Props = {};

type ListItem = {
  name: string;
  quantity: number;
  icon: JSX.Element;
};

const ManualInput = (props: Props) => {
  const { list, setList } = useList();
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    name: z.string().min(3),
    quantity: z.string().refine((val) => parseInt(val) > 0, {
      message: "Must be greater than 0",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      quantity: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const item: ListItem = {
      name: values.name,
      quantity: parseInt(values.quantity),
      icon: <Box className="size-8" />,
    };
    // If the item name already exists, increment the quantity
    const existingItem = list.find((item) => item.name === values.name);
    if (existingItem) {
      existingItem.quantity += item.quantity;
      setList([...list]);
    } else {
      setList([...list, item]);
    }
    form.reset();

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={buttonVariants({
          variant: "link",
          className: "text-xl",
        })}
      >
        Input Manually
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Manual Input</DialogTitle>
          <DialogDescription className="text-sm">
            Enter your donation items manually.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Add</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ManualInput;
