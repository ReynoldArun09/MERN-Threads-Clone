const ShareSVG = () => {
  return (
    <svg
      aria-label="Share"
      height="20"
      role="img"
      viewBox="0 0 24 24"
      width="20"
      onClick={(e) => e.stopPropagation()}
    >
      <title>Share</title>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="22"
        x2="9.218"
        y1="3"
        y2="10.083"
      ></line>
      <polygon
        fill="none"
        points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      ></polygon>
    </svg>
  );
};

export default ShareSVG;
