import { cn } from "../../lib/utils";

type Props = {
  height?: string;
  width?: string;
  className?: string;
  fullscreen?: boolean;
};

export const LoadingSpinner = ({ height = "24", width = "24", className, fullscreen = false }: Props) => {
  const spinner = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin", className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );

  if (fullscreen) {
    return <div className="flex justify-center items-center h-screen">{spinner}</div>;
  }

  return spinner;
};
