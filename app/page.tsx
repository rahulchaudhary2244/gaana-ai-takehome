import { z } from "zod";
import { HomePage } from "@/components/home-page";
import { Suspense } from "react";
import { HomePageSkeleton } from "@/components/skeletons/home-page-skeleton";

const PER_PAGE = 10;

type SearchParams = {
    _page: string;
    _per_page: string;
    _sort: string;
    _order: string;
    name: string;
};

type Props = {
    searchParams: SearchParams;
};

const searchParamsSchema = z.object({
    _sort: z.string().optional().default(""),
    _order: z.string().optional().default(""),
    _per_page: z.coerce.number().optional().default(PER_PAGE),
    _page: z.coerce.number().optional().default(1),
    name: z.string().optional().default(""),
});

export default async function Page({ searchParams }: Props) {
    const parsed = searchParamsSchema.parse(searchParams);

    const { _page, _per_page, _sort, name, _order } = parsed;

    return (
        <Suspense fallback={<HomePageSkeleton rows={PER_PAGE} />}>
            <HomePage
                _page={_page}
                _per_page={_per_page}
                _sort={_sort}
                name={name}
                _order={_order}
            />
        </Suspense>
    );
}
