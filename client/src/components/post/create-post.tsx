import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { IoAdd } from "react-icons/io5";
import CreatePostForm from "../forms/create-post-form";

export default function CreatePost() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        className="fixed bottom-14 right-20"
        onClick={() => setOpen(!open)}
      >
        <IoAdd size={20} />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Write a Post</DialogTitle>
            <DialogDescription className="text-gray-400">
              Create a post by entering your message. You can optionally upload
              a picture.
            </DialogDescription>
          </DialogHeader>
          <CreatePostForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
}
