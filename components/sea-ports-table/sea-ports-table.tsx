"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { getColumns } from "./columns";
import { LocationData, LocationResponse } from "./types";
import { ColumnVisibilityToggles } from "./column-visibility-toggles";
import { useColumnVisibilityFromSearchParams } from "./use-column-visibility";
import { TableWrapper } from "./table-wrapper";

type Props = {
    data: LocationData[];
    perPageDataCount: number;
} & Pick<LocationResponse, "last" | "prev">;

export const SeaPortsTable = ({
    data,
    last,
    perPageDataCount,
    prev,
}: Props) => {
    const columns = getColumns({ last, perPageDataCount, prev });
    const allColumnIds = columns
        .filter((col) => col?.enableHiding)
        .map((col) => col.id)
        .filter((colId) => typeof colId === "string");

    const [columnVisibility, setColumnVisibility] =
        useColumnVisibilityFromSearchParams(allColumnIds);

    const table = useReactTable({
        data,
        columns,
        getRowId: (row) => row.id,
        getCoreRowModel: getCoreRowModel(),
        state: { columnVisibility },
        onColumnVisibilityChange: setColumnVisibility,
    });

    return (
        <div className="mt-4 space-y-4">
            <ColumnVisibilityToggles table={table} />
            <TableWrapper table={table} columns={columns} />
        </div>
    );
};
