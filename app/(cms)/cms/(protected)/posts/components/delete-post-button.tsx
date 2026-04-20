"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deletePost } from "../actions/post-action";
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

export function DeletePostButton({ id, postTitle }: { id: string; postTitle: string }) {
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await deletePost(id);
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
                        This will permanently delete <span className="font-bold text-foreground">&ldquo;{postTitle}&rdquo;</span>.
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