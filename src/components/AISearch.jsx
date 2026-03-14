import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setQuery, resetQuery } from "@/lib/features/searchSlice";

export default function AISearch() {
  const dispatch = useDispatch();
  const activeQuery = useSelector((state) => state.search.query);
  const [value, setValue] = useState("");

  function handleSearch() {
    if (value.trim() === "") return;
    dispatch(setQuery(value));
  }

  function handleClear() {
    setValue("");
    dispatch(resetQuery());
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
              if (e.key === "Escape") handleClear();
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

      {/* Clear button — only visible when a search is active */}
      {activeQuery && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-white/70 text-sm">
            Results for: <span className="text-white font-medium">"{activeQuery}"</span>
          </span>
          <Button
            type="button"
            onClick={handleClear}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10 rounded-full flex items-center gap-1 px-3 h-7"
          >
            <X className="w-3 h-3" />
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}
