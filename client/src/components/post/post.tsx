import { PostResponseType } from "@/services/types";

interface PostProps {
  post: PostResponseType;
}

export default function Post({ post }: PostProps) {
  return <div>Post</div>;
}
