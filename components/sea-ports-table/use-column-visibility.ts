import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";
import { VisibilityState } from "@tanstack/react-table";

export function useColumnVisibilityFromSearchParams(
    allColumnIds: string[]
): [
    VisibilityState,
    (
        updater: VisibilityState | ((prev: VisibilityState) => VisibilityState)
    ) => void
] {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const columnVisibility: VisibilityState = useMemo(() => {
        const state: VisibilityState = {};
        allColumnIds.forEach((id) => {
            const value = searchParams.get(`col-${id}`);
            if (value === "0") state[id] = false;
            else state[id] = true;
        });
        return state;
    }, [searchParams, allColumnIds]);

    const setColumnVisibility = useCallback(
        (
            updater:
                | VisibilityState
                | ((prev: VisibilityState) => VisibilityState)
        ) => {
            const current = columnVisibility;
            const next =
                typeof updater === "function" ? updater(current) : updater;

            const newParams = new URLSearchParams(searchParams.toString());
            for (const key of allColumnIds) {
                const isVisible = next[key];
                newParams.set(`col-${key}`, isVisible ? "1" : "0");
            }

            router.replace(`${pathname}?${newParams.toString()}`);
        },
        [columnVisibility, allColumnIds, searchParams, pathname, router]
    );

    return [columnVisibility, setColumnVisibility];
}
