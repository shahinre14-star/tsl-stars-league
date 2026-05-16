import { initials } from "@/lib/league-data";

type TeamBadgeProps = {
  name: string;
  tag?: string;
  logo?: string;
  size?: "sm" | "md" | "lg";
  align?: "default" | "right";
};

const sizeClasses = {
  sm: "h-11 w-11 rounded-2xl text-sm",
  md: "h-12 w-12 rounded-2xl text-base",
  lg: "h-20 w-20 rounded-[26px] text-2xl",
};

export default function TeamBadge({
  name,
  tag,
  logo,
  size = "md",
  align = "default",
}: TeamBadgeProps) {
  if (logo) {
    return (
      <div
        aria-label={`${name} logo`}
        role="img"
        className={`${sizeClasses[size]} shrink-0 bg-contain bg-center bg-no-repeat ${
          align === "right" ? "ml-auto" : ""
        }`}
        style={{ backgroundImage: `url("${logo}")` }}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} flex shrink-0 items-center justify-center bg-[#37003c] font-black text-white ${
        align === "right" ? "ml-auto" : ""
      }`}
    >
      {tag || initials(name)}
    </div>
  );
}
