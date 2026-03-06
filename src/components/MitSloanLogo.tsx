import { cn } from "@/lib/utils";

type MitSloanLogoProps = {
  className?: string;
};

export function MitSloanLogo({ className }: MitSloanLogoProps) {
  return (
    <a
      href="https://mitsloan.mit.edu"
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center"
    >
      <img
        src="https://mitsloan.mit.edu/sites/default/files/styles/og_image/public/2020-09/logo_thumb_4.png.webp?h=6822f027&itok=_Dj2poFZ"
        alt="MIT Sloan School of Management"
        className={cn("h-6 w-auto", className)}
      />
    </a>
  );
}

