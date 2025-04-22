import { AddSeaPortDialog } from "./add-sea-port-dialog";
import { If } from "./if";
import { SeaPortsTable } from "./sea-ports-table/sea-ports-table";
import { getSeaPorts } from "./sea-ports-table/server-actions";
import { TablePagination } from "./sea-ports-table/table-pagination";
import { SearchByName } from "./search-by-name";

type Props = {
    name: string;
    _page: number;
    _sort: string;
    _order: string;
    _per_page: number;
};

export const HomePage = async ({
    _page,
    _order,
    _per_page,
    _sort,
    name,
}: Props) => {
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
};
