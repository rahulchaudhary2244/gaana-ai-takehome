"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Table } from "@tanstack/react-table";

type Props<T> = {
    table: Table<T>;
};

export const ColumnVisibilityToggles = <T,>({ table }: Props<T>) => {
    return (
        <div className="flex flex-wrap gap-4">
            {table
                .getAllColumns()
                .filter((col) => col.columnDef.enableHiding)
                .map((column) => (
                    <label
                        key={column.id}
                        className="flex items-center gap-2 text-sm"
                    >
                        <Checkbox
                            checked={column.getIsVisible()}
                            onCheckedChange={() => column.toggleVisibility()}
                        />
                        {column.columnDef.header as string}
                    </label>
                ))}
        </div>
    );
};
