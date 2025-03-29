"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { BsMoon, BsSun, BsChevronDoubleUp } from "react-icons/bs";
import { Button } from "./button";

export default function ThemeToggle() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  const goToBtn = () => {
    globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const listenToScroll = () => {
      const hidden = 500;
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (winScroll > hidden) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    if (typeof globalThis !== "undefined") {
      globalThis.addEventListener("scroll", listenToScroll);
      return () => {
        globalThis.removeEventListener("scroll", listenToScroll);
      };
    }
  }, []);

  const getNextTheme = () => {
    if (theme === "light") return "dark";
    if (theme === "dark") return "system";
    return "light";
  };

  const getThemeTitle = () => {
    if (theme === "light") return "Light Theme";
    if (theme === "dark") return "Dark Theme";
    return "System Theme";
  };
  // console.log(theme, resolvedTheme);

  return (
    <>
      <div className="relative z-50">
        <div className="animate-slide-up grid gap-2 fixed bottom-2 right-2 bg-transparent p-2">
          {isVisible && (
            <Button
              type="button"
              size="icon"
              effect="gooeyRight"
              title="Scroll to Top"
              className="animate-slide-up bg-primary-clr/40 hover:bg-primary-clr/50 ring-1 ring-primary-clr shadow-md backdrop-blur-xl group rounded-full overflow-hidden"
            >
              <div
                className="cursor-pointer bg-transparent border-none flex flex-col gap-5 transition-all translate-y-5 group-hover:-translate-y-5 ease-in-out duration-200 overflow-hidden"
                onClick={goToBtn}
              >
                <BsChevronDoubleUp className="w-5 h-5 fill-white cursor-pointer" />
                <BsChevronDoubleUp className="w-5 h-5 fill-[cyan] cursor-pointer" />
              </div>
            </Button>
          )}
          {pathname !== "/" && !pathname.includes("/studio") && (
            <Button
              type="button"
              size="icon"
              title={getThemeTitle()}
              onClick={() => setTheme(getNextTheme())}
              className="animate-slide-up group overflow-hidden"
            >
              {resolvedTheme === "light" && theme === "light" ? (
                <BsSun className="cursor-pointer group-hover:fill-[orange]" />
              ) : resolvedTheme === "dark" && theme === "dark" ? (
                <BsMoon className="cursor-pointer group-hover:fill-[cyan]" />
              ) : (
                <HiOutlineDesktopComputer className="cursor-pointer group-hover:fill-[gray]" />
              )}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
