"use client";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { LocationData } from "./sea-ports-table/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SeaPortForm } from "./sea-port-form";
import { addSeaPortInfo } from "./sea-ports-table/server-actions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const AddSeaPortDialog = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleCreate = async (data: LocationData) => {
        const result = await addSeaPortInfo(data);
        if (!result.success) {
            toast.error("Addition failed", { description: result.message });
            return;
        }

        setOpen(false);
        router.refresh();
        toast.success("Added successfully");
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline">
                    <Plus /> add sea port
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Create New Sea Port</AlertDialogTitle>
                    <AlertDialogDescription>
                        Enter port details
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <SeaPortForm
                    initialData={{}}
                    onSubmit={handleCreate}
                    showIdInput
                />
            </AlertDialogContent>
        </AlertDialog>
    );
};
