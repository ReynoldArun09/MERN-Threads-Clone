import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { UserDataType } from "@/services/types";
import { useQuery } from "@tanstack/react-query";
import {
  ProfileSchemaType,
  UpdateProfileSchema,
} from "@/schemas/update-user-Schemas";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import usePreview from "@/hooks/usePreview";
import { useRef } from "react";
import { UpdateUserPofileMutation } from "@/services/mutations/user-mutations";

export default function UpdateProfileForm() {
  const { data: authUser } = useQuery<UserDataType>({
    queryKey: ["verify-user"],
  });
  const navigate = useNavigate();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { imageUrl, setImageUrl, handleImageChange } = usePreview();
  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      username: authUser?.username,
      name: authUser?.name || "",
      email: authUser?.email,
      bio: authUser?.bio,
      password: "",
      profilePicture: authUser?.profilePicture,
      website: authUser?.website || "",
    },
  });

  const handleEdit = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const { mutate, isPending } = UpdateUserPofileMutation();

  const onSubmit = (values: ProfileSchemaType) => {
    if (!authUser) return;

    const data = {
      username: values.username || authUser.username,
      name: values.name || "",
      email: values.email || authUser.email,
      bio: values.bio || "",
      password: values.password || "",
      profilePicture: imageUrl || "",
      website: values.website || "",
    };
    mutate({ id: authUser.id, values: data });
    setImageUrl("");
    navigate(-1);
  };

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <Avatar className="w-24 h-24">
            <AvatarImage src={imageUrl || ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <FormField
            name="profilePicture"
            render={() => (
              <FormItem>
                <FormControl>
                  <>
                    <Input
                      type="file"
                      onChange={handleImageChange}
                      hidden
                      accept="image/*"
                      className="w-full border rounded hidden"
                      ref={imageRef}
                    />
                    <Button type="button" onClick={handleEdit}>
                      Edit Profile Pic
                    </Button>
                  </>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4">
          <FormField
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-5">
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Bio" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add your website</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your link here" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-5">
          <Button
            type="button"
            size={"lg"}
            variant={"destructive"}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit" size={"lg"} disabled={isPending}>
            {isPending ? "updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
