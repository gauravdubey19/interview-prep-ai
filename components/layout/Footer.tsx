"use client";

import Image from "next/image";
import { TextHoverEffect } from "../ui/text-hover-effect";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  if (pathname.includes("/dashboard")) return null;
  return (
    <>
      <div className="w-full h-fit relative border-t border-primary-100/50">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-2 py-2">
          <div className="flex-center gap-3">
            <Image src="/logo.png" alt="logo" width={28} height={32} />
            <h2 className="text-primary-100 font-marcellus text-md mt-1">
              AceInterviews
            </h2>
          </div>
          <div className="text-sm text-primary-100/50">
            &copy; {new Date().getFullYear()} AceInterviews. All rights
            reserved.
          </div>
        </div>
        <TextHoverEffect text="ACEINTERVIEWS" />
      </div>
    </>
  );
};

export default Footer;
