"use client";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LocationData } from "./sea-ports-table/types";
import { ReactNode, useState } from "react";
import { updateSeaPortInfo } from "./sea-ports-table/server-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SeaPortForm } from "./sea-port-form";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
    data: LocationData;
};

export const EditRowDialog = ({ data }: Props) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleUpdate = async (updated: LocationData) => {
        const result = await updateSeaPortInfo(updated);
        if (!result.success) {
            toast.error("Update failed");
            return;
        }
        setOpen(false);
        router.refresh();
        toast.success("Updated successfully");
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline">
                    <Pencil />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit Sea Port</AlertDialogTitle>
                    <AlertDialogDescription>
                        Update the port data
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <SeaPortForm initialData={data} onSubmit={handleUpdate} />
            </AlertDialogContent>
        </AlertDialog>
    );
};
