"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteTool } from "../actions/too-action";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function DeleteToolButton({ id, toolName }: { id: string; toolName: string }) {
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await deleteTool(id);
                setOpen(false);
            } catch (error) {
                console.error(error);
            }
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete <span className="font-bold text-foreground">"{toolName}"</span>. 
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={(e) => {
                            e.preventDefault(); // Prevent modal from closing immediately
                            handleDelete();
                        }}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        disabled={isPending}
                    >
                        {isPending ? "Deleting..." : "Delete Tool"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}