"use client";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LocationData, LocationResponse } from "./sea-ports-table/types";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteSeaPortInfo } from "./sea-ports-table/server-actions";
import { useUpdateSearchParams } from "@/hooks/use-update-search-params";
import { Trash2 } from "lucide-react";
import { SpinnerOverlay } from "./spinner-overlay";

type Props = { perPageDataCount: number } & Pick<LocationData, "id"> &
    Pick<LocationResponse, "last" | "prev">;

export const DeleteRowDialog = ({
    id,
    last,
    perPageDataCount,
    prev,
}: Props) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const updateParam = useUpdateSearchParams();
    const currentPage = Number(searchParams.get("_page") || "1");

    const handleDelete = async () => {
        setLoading(true);
        setOpen(false);
        const result = await deleteSeaPortInfo({ id });

        if (!result.success) {
            setLoading(false);
            toast.error("delete failed");
            return;
        }

        if (currentPage === last && perPageDataCount === 1 && prev) {
            updateParam({ _page: prev });
        }
        setLoading(false);
        toast.success("Deleted successfully");
    };

    const closeDialog = () => {
        setOpen(false);
    };

    return (
        <>
            <SpinnerOverlay visible={loading} />
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">
                        <Trash2 />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Sea Port</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure to delete the info ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex gap-4 items-center justify-end">
                        <Button onClick={handleDelete} variant="outline">
                            Yes
                        </Button>
                        <Button onClick={closeDialog}>No</Button>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
