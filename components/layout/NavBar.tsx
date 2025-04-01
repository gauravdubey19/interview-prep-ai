"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/lib/actions/auth.actions";
import { Button } from "../ui/button";
import { Button as MovingButton } from "../ui/moving-border";

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
      <Link href="/" className="flex-center gap-3 overflow-hidden">
        <Image src="/logo.png" alt="logo" width={38} height={32} />
        <h2 className="text-primary-100 font-marcellus text-4xl mt-1">
          AceInterviews
        </h2>
      </Link>

      {isUserAutenticated ? (
        <div className="w-10 h-10 relative group">
          <Image
            src={userPfp}
            alt="user profile picture"
            width={48}
            height={48}
            className="rounded-full cursor-pointer"
          />
          <div className="absolute right-0 top-11 w-fit bg-white/5 backdrop-blur-md shadow-lg rounded-md hidden group-hover:block">
            <div className="w-full flex-center flex-col p-2 space-y-2">
              <h4 className="text-md font-semibold capitalize font-marcellus">
                {userName}
              </h4>
              <Link href="/dashboard" className="btn">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button
                variant="ghost"
                className="text-sm text-red-500 hover:bg-red-500/80"
                effect="gooeyRight"
                type="button"
                onClick={handleSignOut}
              >
                Sign out
              </Button>
            </div>
          </div>
        </div>
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
