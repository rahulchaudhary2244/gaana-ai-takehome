"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useUpdateSearchParams() {
    const router = useRouter();
    const searchParams = useSearchParams();

    return (updates: Record<string, string | number | undefined>) => {
        const params = new URLSearchParams(searchParams.toString());

        for (const [key, value] of Object.entries(updates)) {
            if (value === undefined || value === "") {
                params.delete(key);
            } else {
                params.set(key, String(value));
            }
        }

        router.push(`?${params.toString()}`, { scroll: false });
    };
}
