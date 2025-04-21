"use client";

import { useEffect, useState, useRef } from "react";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const SearchByName = () => {
    const updateParam = useUpdateSearchParams();
    const [name, setName] = useState("");
    const [focused, setFocused] = useState(false);

    const debouncedName = useDebounce(name, 500);
    const prevName = useRef("");

    useEffect(() => {
        const resetPage = prevName.current !== debouncedName;
        updateParam({
            name: debouncedName,
            ...(resetPage ? { _page: 1 } : {}),
        });
        prevName.current = debouncedName;
    }, [debouncedName, updateParam]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const clearSearch = () => {
        setName("");
    };

    return (
        <div
            className={cn(
                "flex items-center border rounded-md px-2 py-1 h-9 transition-colors w-full",
                focused ? "border-black ring-1 ring-black" : "border-gray-300"
            )}
        >
            <Search className="w-4 h-4 text-gray-500 mr-1" />
            <input
                className="flex-1 outline-none bg-transparent text-sm placeholder:text-gray-400"
                value={name}
                onChange={handleChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search by name"
            />
            {name && (
                <Button
                    type="button"
                    onClick={clearSearch}
                    variant="ghost"
                    size="icon"
                    className="ml-1 h-5 w-5 p-0 text-gray-500 hover:text-black"
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
};
