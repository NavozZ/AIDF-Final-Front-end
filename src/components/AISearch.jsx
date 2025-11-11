import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setQuery } from "@/lib/features/searchSlice";
import { DevTool } from "@hookform/devtools";

export default function AISearch() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  // Handle search click or Enter
  function handleSearch() {
    if (value.trim() === "") return; // Optional: prevent empty search
    console.log("Search triggered:", value); // Debug
    dispatch(setQuery(value));
  }

  return (
    <div className="z-10 w-full max-w-lg">
      <div className="relative flex items-center">
        <div className="relative flex-grow">
          <Input
            placeholder="Search for the experience you want"
            name="query"
            value={value}
            className="bg-[#1a1a1a] text-sm sm:text-base text-white placeholder:text-white/70 border-0 rounded-full py-6 pl-4 pr-16 sm:pr-36 w-full transition-all"
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
        </div>

        <Button
          type="button"
          onClick={handleSearch}
          className="absolute right-2 z-10 h-[80%] my-auto bg-black text-white rounded-full px-2 sm:px-4 flex items-center gap-x-2 border-white border-2 hover:bg-black/80 transition-colors"
        >
          <Sparkles className="w-4 h-4 fill-white" />
          <span className="text-sm">AI Search</span>
        </Button>
      </div>
      
    </div>
  );
}
