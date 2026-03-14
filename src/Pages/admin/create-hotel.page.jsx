import HotelCreateFrom from "@/components/HotelCreateFrom";
import { PlusCircle } from "lucide-react";

function CreateHotelPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <PlusCircle className="w-7 h-7 text-primary" /> Create New Hotel
        </h1>
        <p className="text-muted-foreground mt-1">
          Fill in the details below. A description is important — it powers AI search.
        </p>
      </div>
      <HotelCreateFrom />
    </main>
  );
}

export default CreateHotelPage;
