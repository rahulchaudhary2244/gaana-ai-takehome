import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";

type Props = {
    children: ReactNode;
    sortKey: string;
};

export const SortedColumn = ({ children, sortKey }: Props) => {
    const searchParams = useSearchParams();
    const updateParam = useUpdateSearchParams();

    const sortKeys = (searchParams.get("_sort") || "")
        .split(",")
        .filter(Boolean);
    const sortOrders = (searchParams.get("_order") || "")
        .split(",")
        .filter(Boolean);

    const index = sortKeys.indexOf(sortKey);
    const isActive = index !== -1;
    const direction = isActive ? sortOrders[index] : null;

    const isDesc = direction === "desc";
    const isAsc = direction === "asc";

    const handleClick = () => {
        const newSortKeys = [...sortKeys];
        const newSortOrders = [...sortOrders];

        if (isAsc) {
            newSortKeys.splice(index, 1);
            newSortOrders.splice(index, 1);
        } else if (isDesc) {
            newSortOrders[index] = "asc";
        } else {
            newSortKeys.push(sortKey);
            newSortOrders.push("desc");
        }

        updateParam({
            _sort: newSortKeys.join(","),
            _order: newSortOrders.join(","),
        });
    };

    return (
        <Button variant="ghost" onClick={handleClick}>
            {children}
            <SortIcon isAsc={isAsc} isDesc={isDesc} />
        </Button>
    );
};

const SortIcon = ({ isAsc, isDesc }: { isAsc: boolean; isDesc: boolean }) => {
    if (isAsc) return <ArrowUp className="h-4 w-4 ml-2" />;
    if (isDesc) return <ArrowDown className="h-4 w-4 ml-2" />;
    return <ArrowUpDown className="h-4 w-4 ml-2" />;
};
