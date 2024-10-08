import UserHeader from "@/components/user/user-header";
import UserHeaderOptions from "@/components/user/user-header-options";
import UserPosts from "@/components/user/user-posts";
import UserReplies from "@/components/user/user-replies";
import { useState } from "react";

const OptionsValue = {
  threads: "threads",
  replies: "replies",
};

export default function UserPage() {
  const [options, setOptions] = useState(OptionsValue.threads);
  return (
    <>
      <UserHeader />
      <UserHeaderOptions options={options} setOptions={setOptions} />
      {options === OptionsValue.threads && <UserPosts />}
      {options === OptionsValue.replies && <UserReplies />}
    </>
  );
}
