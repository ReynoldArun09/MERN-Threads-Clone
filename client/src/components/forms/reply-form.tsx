import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { ReplyToPostMutation } from "@/services/mutations/post-mutations";
import { ReplySchema, ReplySchemaType } from "@/schemas/reply-schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface ReplyFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postId: string;
}

export default function ReplyForm({ setOpen, postId }: ReplyFormProps) {
  const form = useForm<ReplySchemaType>({
    resolver: zodResolver(ReplySchema),
    defaultValues: {
      text: "",
    },
  });
  const { mutate: reply, isPending } = ReplyToPostMutation(postId);

  const onSubmit = (values: ReplySchemaType) => {
    reply(values?.text);
  };

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormControl>
              <Input {...field} placeholder="Write a reply" />
            </FormControl>
          )}
        />
        <Button
          type="submit"
          onClick={() => setOpen(false)}
          disabled={isPending}
        >
          Reply
        </Button>
      </form>
    </Form>
  );
}
