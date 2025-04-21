import { SeaPortsTable } from "@/components/sea-ports-table/sea-ports-table";
import { getSeaPorts } from "@/components/sea-ports-table/server-actions";
import { TablePagination } from "@/components/sea-ports-table/table-pagination";
import { AddSeaPortDialog } from "@/components/add-sea-port-dialog";
import { If } from "@/components/if";
import { SearchByName } from "@/components/search-by-name";
import { z } from "zod";

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
    _per_page: z.coerce.number().optional().default(10),
    _page: z.coerce.number().optional().default(1),
    name: z.string().optional().default(""),
});

export default async function Page({ searchParams }: Props) {
    const parsed = searchParamsSchema.parse(searchParams);

    const { _page, _per_page, _sort, name, _order } = parsed;

    const { data, first, last, next, prev, items } = await getSeaPorts({
        _page: Number(_page),
        _per_page: Number(_per_page),
        _order,
        _sort,
        name,
    });

    return (
        <div>
            <div className="flex gap-2">
                <SearchByName />
                <AddSeaPortDialog />
            </div>
            <If condition={items < 1}>
                <div className="mt-4">No data found</div>
            </If>
            <If condition={items > 0}>
                <SeaPortsTable
                    data={data}
                    last={last}
                    perPageDataCount={data.length}
                    prev={prev}
                />
                <TablePagination
                    first={first}
                    last={last}
                    prev={prev}
                    next={next}
                />
            </If>
        </div>
    );
}
