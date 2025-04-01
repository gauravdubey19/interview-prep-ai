"use client";

import { useState } from "react";
import { toast } from "sonner";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signInWithGoogle } from "@/lib/actions/auth.actions";
import { auth } from "@/firebase/client";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

type GoogleAuthButtonProps = {
  mode: "signin" | "signup";
  className?: string;
};

export default function GoogleAuthButton({ mode }: GoogleAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();

      // Sign in with popup
      const result = await signInWithPopup(auth, provider);

      // Get the ID token
      const idToken = await result.user.getIdToken();

      // Call the server action
      const response = await signInWithGoogle(idToken);

      if (response.success) {
        toast.success(response.message);
        // Redirect to dashboard or home page after successful authentication
        window.location.href = "/dashboard";
      } else {
        toast.error(response.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Google auth error:", error);
      toast.error("Failed to authenticate with Google");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form">
      <Button
        type="button"
        effect="gooeyRight"
        className="btn"
        onClick={handleGoogleAuth}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-t-2 border-b-2 border-primary rounded-full animate-spin" />
        ) : (
          <FcGoogle />
        )}
        <span>{mode === "signin" ? "Sign in" : "Sign up"} with Google</span>
      </Button>
    </div>
  );
}
