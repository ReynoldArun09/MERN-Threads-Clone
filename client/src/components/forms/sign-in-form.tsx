import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { SigninSchema, SigninSchemaType } from "@/schemas/auth-schemas";
import { SignInMutation } from "@/services/mutations/auth-mutations";

export default function SignInForm() {
  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(SigninSchema),
    defaultValues: { username: "", password: "" },
  });
  const { mutate: signIn, isPending } = SignInMutation();

  const onSubmit = (values: SigninSchemaType) => {
    signIn(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size={"lg"}
          className="w-full"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}
