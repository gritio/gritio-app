export function AllyLogo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Brown background */}
      <rect
        width="40"
        height="40"
        rx="6"
        fill="#805232"
      />
      
      {/* Mountain peaks - representing grit/climbing */}
      {/* Left peak */}
      <path
        d="M 10 28 L 18 14 L 20 18 L 10 28 Z"
        fill="white"
        opacity="0.9"
      />
      
      {/* Right peak */}
      <path
        d="M 20 18 L 28 12 L 30 28 L 20 28 Z"
        fill="white"
        opacity="0.8"
      />
      
      {/* Middle peak - tallest */}
      <path
        d="M 17 18 L 22 8 L 27 18 Z"
        fill="white"
      />
      
      {/* Upward arrow/spark - representing progress */}
      <path
        d="M 20 20 L 20 10 M 20 10 L 17 13 M 20 10 L 23 13"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Progress steps/foundation line */}
      <line
        x1="10"
        y1="28"
        x2="30"
        y2="28"
        stroke="white"
        strokeWidth="1.5"
        opacity="0.7"
      />
    </svg>
  );
}
