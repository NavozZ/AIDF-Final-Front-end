import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormDescription,
  FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { useCreateHotelMutation } from "@/lib/api";
import { ArrowLeft, Save, PlusCircle } from "lucide-react";

const formSchema = z.object({
  name:        z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  image:       z.string().url({ message: "Must be a valid image URL" }),
  location:    z.string().min(1, { message: "Location is required" }),
  price:       z.number().positive({ message: "Price must be greater than 0" }),
});

// Props:
//   initialData  — prefill for edit mode
//   onSubmit     — override submit (edit mode passes updateHotel here)
//   isLoading    — loading state from parent (edit mode)
//   buttonText   — override button label
export default function HotelCreateFrom({
  initialData = null,
  onSubmit: externalSubmit = null,
  isLoading: externalLoading = false,
  buttonText = null,
}) {
  const navigate = useNavigate();
  const isEditMode = !!initialData;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:        initialData?.name        ?? "",
      description: initialData?.description ?? "",
      image:       initialData?.image       ?? "",
      location:    initialData?.location    ?? "",
      price:       initialData?.price       ?? 0,
    },
  });

  // Re-populate when initialData loads (async fetch in edit mode)
  useEffect(() => {
    if (initialData) {
      form.reset({
        name:        initialData.name        ?? "",
        description: initialData.description ?? "",
        image:       initialData.image       ?? "",
        location:    initialData.location    ?? "",
        price:       initialData.price       ?? 0,
      });
    }
  }, [initialData]);

  const [createHotel, { isLoading: isCreating }] = useCreateHotelMutation();
  const isLoading = isEditMode ? externalLoading : isCreating;

  async function onSubmit(values) {
    try {
      if (externalSubmit) {
        // Edit mode — parent handles the mutation and toast
        await externalSubmit(values);
        navigate("/admin/hotels");
      } else {
        // Create mode
        await createHotel(values).unwrap();
        toast.success(`Hotel "${values.name}" created successfully!`);
        navigate("/admin/hotels");
      }
    } catch (error) {
      toast.error(`Failed: ${error?.data?.message || "Server error"}`);
    }
  }

  return (
    <div className="max-w-2xl">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/admin/hotels")}
        className="mb-6 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Hotels
      </Button>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Hotel Name</FormLabel>
              <FormControl><Input placeholder="e.g. The Grand Horizon" {...field} /></FormControl>
              <FormDescription>The public name shown on listings.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the hotel experience..." rows={4} {...field} />
              </FormControl>
              <FormDescription>A compelling description that helps AI search find this hotel.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="image" render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl><Input placeholder="https://..." {...field} /></FormControl>
              <FormDescription>A direct link to the hotel's main photo.</FormDescription>
              {field.value && (
                <img
                  src={field.value}
                  alt="Preview"
                  className="mt-2 h-40 w-full object-cover rounded-lg border border-border"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              )}
              <FormMessage />
            </FormItem>
          )} />

          <div className="grid grid-cols-2 gap-6">
            <FormField control={form.control} name="location" render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl><Input placeholder="City, Country" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="price" render={({ field }) => (
              <FormItem>
                <FormLabel>Price per night (USD)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="150"
                    value={field.value || ""}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      field.onChange(isNaN(val) ? 0 : val);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              "Saving..."
            ) : isEditMode ? (
              <><Save className="w-4 h-4 mr-2" />{buttonText ?? "Save Changes"}</>
            ) : (
              <><PlusCircle className="w-4 h-4 mr-2" />{buttonText ?? "Create Hotel"}</>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
