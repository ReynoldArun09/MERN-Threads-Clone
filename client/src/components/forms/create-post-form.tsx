import { useForm } from "react-hook-form";
import { FormField, Form } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { BsFillImageFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserDataType } from "@/services/types";
import { PostSchema, PostSchemaType } from "@/schemas/post-schemas";
import { CreatePostMutation } from "@/services/mutations/post-mutations";
import usePreview from "@/hooks/usePreview";

const maxLength = 400;

interface CreatePostFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreatePostForm({ setOpen }: CreatePostFormProps) {
  const [textLength, setTextLength] = useState(0);
  const form = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      text: "",
      image: "",
    },
  });
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { imageUrl, setImageUrl, handleImageChange } = usePreview();
  const { data: authUser } = useQuery<UserDataType>({
    queryKey: ["verify-user"],
  });

  const { mutate: createPost, isPending } = CreatePostMutation();

  const onSubmit = async (values: PostSchemaType) => {
    if (!authUser) return;
    const data = {
      text: values.text,
      img: imageUrl || "",
      postedById: authUser?.id,
    };

    createPost(data);
    form.reset();
    setImageUrl("");
    setTextLength(0);
    setOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="text"
          render={({ field: { onChange } }) => (
            <>
              <Textarea
                placeholder="what's on your mind?"
                maxLength={maxLength}
                onChange={(e) => {
                  onChange(e);
                  setTextLength(e.target.value.length);
                }}
              />
              <div className="text-right text-gray-600">
                {textLength} / {maxLength}
              </div>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <>
              <Input
                type="file"
                hidden
                accept="image/*"
                ref={fileRef}
                onChange={handleImageChange}
                className="w-full border rounded hidden"
              />
              <div className="pb-6">
                <BsFillImageFill
                  size={25}
                  onClick={() => fileRef.current && fileRef.current.click()}
                />
              </div>
            </>
          )}
        />
        {imageUrl && <img src={imageUrl} />}
        <Button type="submit" className="mt-4" size={"lg"} disabled={isPending}>
          {isPending ? "Submitting.." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
