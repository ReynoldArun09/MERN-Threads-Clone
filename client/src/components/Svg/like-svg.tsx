interface handleLikAndUnlikeProps {
  handleLikAndUnlike: () => void;
  likesCount: number;
}

const LikeSVG = ({
  handleLikAndUnlike,
  likesCount,
}: handleLikAndUnlikeProps) => {
  return (
    <section className="flex gap-2 items-center">
      <svg
        aria-label="Like"
        height="19"
        role="img"
        viewBox="0 0 24 22"
        width="20"
        onClick={handleLikAndUnlike}
      >
        <path
          d="M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z"
          stroke="currentColor"
          strokeWidth="2"
        ></path>
      </svg>
      <p>{likesCount}</p>
    </section>
  );
};

export default LikeSVG;
