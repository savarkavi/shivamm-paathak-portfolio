"use client";

import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useCallback, forwardRef } from "react";
import gsap from "gsap";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  ({ href, children, className, onClick }, ref) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        // Call the optional onClick first (e.g. closing mobile menu)
        onClick?.();

        // Skip transition if already on the same page
        if (pathname === href) return;

        const wrapper = document.getElementById("page-transition");
        const white = document.getElementById("transition-white");
        const black = document.getElementById("transition-black");

        if (!wrapper || !white || !black) {
          router.push(href);
          return;
        }

        // Enter: White slides up from bottom first, then black follows
        gsap.set(wrapper, { pointerEvents: "all" });
        gsap.set(white, { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(black, { clipPath: "inset(100% 0% 0% 0%)" });

        const tl = gsap.timeline({
          onComplete: () => {
            router.push(href);
          },
        });

        tl.to(white, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "power4.inOut",
        }).to(
          black,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            ease: "power4.inOut",
          },
          "-=0.8",
        );
      },
      [href, router, onClick, pathname],
    );

    return (
      <a ref={ref} href={href} onClick={handleClick} className={className}>
        {children}
      </a>
    );
  },
);

TransitionLink.displayName = "TransitionLink";

export default TransitionLink;
