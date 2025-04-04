"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.actions";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormField from "../ui/form-field";
import GoogleAuthButton from "./GoogleAuthButton";

interface AuthFormType {
  type?: "sign-in" | "sign-up";
}

const authFormSchema = (type: AuthFormType) => {
  return z.object({
    name:
      type.type === "sign-up"
        ? z.string().min(3).max(100)
        : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
  });
};

const AuthForm: React.FC<AuthFormType> = ({ type = "sign-in" }) => {
  const router = useRouter();
  const isSingIn = type === "sign-in";
  const formSchema = authFormSchema({ type });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { name, email, password } = values;
      if (isSingIn) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          const idToken = await userCredential.user.getIdToken();

          if (!idToken) {
            toast.error("Sign in failed!");
            return;
          }

          await signIn({ email, idToken });

          toast.success("Sign In Successful!");
          router.push("/dashboard");
        } catch (error: unknown) {
          if (typeof error === "object" && error && "code" in error) {
            if (error.code === "auth/invalid-credential") {
              toast.error("Invalid email or password");
            } else {
              toast.error("Failed to sign in, please try again");
            }
          }
          console.error(error);
        }
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          email,
          password,
          name: name!,
        });

        if (!result?.success) {
          toast.error(result?.message || "Sign up failed");
          return;
        }
        toast.success("Account Created Successfully! Please Sign In");
        // toast.success("Sign Up Successful!");
        router.push("/auth/sign-in");
      }
      console.log(values);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again..");
    }
  }

  return (
    <>
      <div className="card-border lg:min-w-[566px]">
        <div className="space-y-6 card py-16 px-10">
          <div className="flex flex-row gap-2 justify-center">
            <Image
              src="/logo.png"
              alt="auth-image"
              width={38}
              height={32}
              className="w-8 h-8 overflow-hidden"
            />
            <h2 className="text-primary-100">AceInterviews</h2>
          </div>

          <h3 className="mt-10 font-marcellus">
            Practice job interviews with an AI
          </h3>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6 mt-4 form"
            >
              {!isSingIn && (
                <FormField
                  control={form.control}
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                />
              )}
              <FormField
                control={form.control}
                type="email"
                name="email"
                label="E-mail"
                placeholder="Enter your email"
              />
              <FormField
                control={form.control}
                type="password"
                name="password"
                label="Password"
                placeholder="Create your password"
              />

              <Button type="submit" effect="gooeyRight" className="btn">
                {isSingIn ? "Sign In" : "Create an Account"}
              </Button>
            </form>
          </Form>

          <div className="flex-center gap-1">
            <span className="w-36 h-[1px] bg-[#8b8d93]"></span>
            <span className="text-[#8b8d93] font-semibold">OR</span>
            <span className="w-36 h-[1px] bg-[#8b8d93]"></span>
          </div>
          <GoogleAuthButton mode="signin" />

          <p className="text-center mt-10">
            {isSingIn ? "New User?" : "Already have an account?"}
            <Link
              href={isSingIn ? "/auth/sign-up" : "/auth/sign-in"}
              className="font-bold text-user-primary ml-1"
            >
              {isSingIn ? "Sign Up Now!" : "Sign In!"}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
