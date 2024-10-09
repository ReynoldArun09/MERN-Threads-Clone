const CommentSVG = ({
  open,
  setOpen,
  repliesCount,
}: {
  open: boolean;
  repliesCount: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <section className="flex gap-2 items-center">
      <svg
        aria-label="Comment"
        height="20"
        role="img"
        viewBox="0 0 24 24"
        width="20"
        onClick={() => setOpen(!open)}
      >
        <title>Comment</title>
        <path
          d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
      </svg>
      <p>{repliesCount}</p>
    </section>
  );
};

export default CommentSVG;
