"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/lib/actions/auth.actions";
import { Button as MovingButton } from "../ui/moving-border";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const NavBar = ({
  isUserAutenticated,
  userName,
  userPfp,
}: {
  isUserAutenticated: boolean;
  userName: string;
  userPfp: string;
}) => {
  const router = useRouter();

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) router.push("/auth/sign-in");
    else {
      console.error(result.message);
    }
  };

  return (
    <nav className="sticky top-4 z-50 flex items-center justify-between p-2 px-3 rounded-full backdrop-blur-md shadow-[1px_1px_5px_rgba(0,0,0,0.2)]">
      <Link href="/" className="flex-center gap-3 overflow-hidden group">
        <Image
          src="/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="w-7 h-7 lg:w-8 lg:h-8 object-cover overflow-hidden"
        />
        <h2 className="text-primary-100 font-marcellus  md:text-4xl mt-1 group-hover:text-cyan-500 ease-in-out duration-200">
          AceInterviews
        </h2>
      </Link>

      {isUserAutenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="w-10 h-10 cursor-pointer">
              <Image
                src={userPfp}
                alt="user profile picture"
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white/5 backdrop-blur-lg"
          >
            <DropdownMenuLabel className="text-md font-semibold capitalize font-marcellus">
              {userName}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="w-full cursor-pointer">
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/auth/sign-in">
          <MovingButton
            borderRadius="2.75rem"
            containerClassName="scale-90"
            className="cursor-pointer"
          >
            Sign In
          </MovingButton>
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
