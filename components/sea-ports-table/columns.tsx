import { ColumnDef } from "@tanstack/react-table";
import { LocationData, LocationResponse } from "./types";
import { DeleteRowDialog } from "../delete-row-dialog";
import { EditRowDialog } from "../edit-row-dialog";
import { SortedColumn } from "./sorted-column";

export const getColumns = ({
    last,
    perPageDataCount,
    prev,
}: { perPageDataCount: number } & Pick<LocationResponse, "last" | "prev">) => {
    const columns: ColumnDef<LocationData>[] = [
        {
            id: "id",
            accessorKey: "id",
            header: () => <SortedColumn sortKey="id">ID</SortedColumn>,
        },
        {
            id: "name",
            accessorKey: "name",
            header: () => <SortedColumn sortKey="name">Name</SortedColumn>,
        },
        {
            id: "country",
            accessorKey: "country",
            header: () => (
                <SortedColumn sortKey="country">Country</SortedColumn>
            ),
        },
        { id: "city", accessorKey: "city", header: "City", enableHiding: true },
        {
            id: "province",
            accessorKey: "province",
            header: "Province",
            enableHiding: true,
        },
        {
            id: "timezone",
            accessorKey: "timezone",
            header: "Timezone",
            enableHiding: true,
        },
        {
            id: "code",
            accessorKey: "code",
            header: "Code",
            enableHiding: true,
        },
        {
            id: "coordinates",
            accessorKey: "coordinates",
            header: "Coordinates",
            enableHiding: true,
            cell: ({ row }) => {
                const coords = row.original.coordinates;
                return coords ? `${coords[1]}, ${coords[0]}` : "-";
            },
        },
        {
            id: "alias",
            accessorKey: "alias",
            header: "Alias",
            enableHiding: true,
            cell: ({ row }) => row.original.alias?.join(", ") || "-",
        },
        {
            id: "regions",
            accessorKey: "regions",
            header: "Regions",
            enableHiding: true,
            cell: ({ row }) => row.original.regions?.join(", ") || "-",
        },
        {
            id: "unlocs",
            accessorKey: "unlocs",
            header: "Unlocs",
            enableHiding: true,
            cell: ({ row }) => row.original.unlocs?.join(", ") || "-",
        },
        {
            id: "edit",
            header: "Edit",
            cell: ({ row }) => <EditRowDialog data={row.original} />,
        },
        {
            id: "delete",
            header: "Delete",
            cell: ({ row }) => (
                <DeleteRowDialog
                    id={row.original.id}
                    last={last}
                    perPageDataCount={perPageDataCount}
                    prev={prev}
                />
            ),
        },
    ];
    return columns;
};
