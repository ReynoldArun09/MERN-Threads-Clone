interface UserHeaderOptionsProps {
  options: string;
  setOptions: React.Dispatch<React.SetStateAction<string>>;
}

const OptionsValue = {
  threads: "threads",
  replies: "replies",
};

export default function UserHeaderOptions({
  options,
  setOptions,
}: UserHeaderOptionsProps) {
  return (
    <section className="flex w-full my-4">
      <div
        className={`${
          options === OptionsValue.threads
            ? "flex flex-1 pb-3 border-b-[1.5px] border-b-solid border-b-white justify-center cursor-pointer"
            : "flex flex-1 pb-3 border-b-[1.5px] border-b-solid justify-center cursor-pointer"
        }`}
        onClick={() => setOptions(OptionsValue.threads)}
      >
        <h1 className="text-bold">Threads</h1>
      </div>
      <div
        className={`${
          options === OptionsValue.replies
            ? "flex flex-1 pb-3 border-b-[1.5px] border-b-solid border-b-white justify-center cursor-pointer"
            : "flex flex-1 pb-3 border-b-[1.5px] border-b-solid justify-center cursor-pointer"
        }`}
        onClick={() => setOptions(OptionsValue.replies)}
      >
        <h1 className="font-bold">Replies</h1>
      </div>
    </section>
  );
}
