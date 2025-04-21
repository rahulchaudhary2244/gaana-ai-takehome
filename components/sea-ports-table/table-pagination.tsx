"use client";

import { Button } from "@/components/ui/button";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";
import { useSearchParams } from "next/navigation";
import { LocationResponse } from "./types";
import {
    ChevronFirst,
    ChevronLast,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

type Props = Pick<LocationResponse, "first" | "last" | "next" | "prev">;

export const TablePagination = ({ first, last, next, prev }: Props) => {
    const searchParams = useSearchParams();
    const updateParam = useUpdateSearchParams();

    const currentPage = Number(searchParams.get("_page") || first);

    const handlePrevious = () => {
        if (prev) updateParam({ _page: prev });
    };

    const handleNext = () => {
        if (next) updateParam({ _page: next });
    };

    const handleFirst = () => {
        updateParam({ _page: first });
    };

    const handleLast = () => {
        updateParam({ _page: last });
    };

    return (
        <div className="flex gap-2 flex-wrap mt-4">
            <Button
                variant="outline"
                onClick={handleFirst}
                disabled={currentPage <= first}
            >
                <ChevronFirst /> First
            </Button>
            <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentPage <= first}
            >
                <ChevronLeft /> Previous
            </Button>
            <Button
                variant="outline"
                onClick={handleNext}
                disabled={currentPage >= last}
            >
                Next <ChevronRight />
            </Button>
            <Button
                variant="outline"
                onClick={handleLast}
                disabled={currentPage >= last}
            >
                Last <ChevronLast />
            </Button>
        </div>
    );
};
