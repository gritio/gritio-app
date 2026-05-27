export function AllyLogo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="100" fill="#805232" />
      <path d="M 20 70 L 50 30 L 80 70" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="30" r="6" fill="white" />
    </svg>
  );
}
