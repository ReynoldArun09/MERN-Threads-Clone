import LoadingSpinner from "../common/loading-spinner";

export default function UserReplies() {
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isLoading) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-lg py-5">No replies found</h1>
      </div>
    );
  }

  return (
    <section>
      <h1>replies</h1>
    </section>
  );
}
