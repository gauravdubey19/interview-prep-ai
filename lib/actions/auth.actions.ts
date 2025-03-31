"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const FIVE_DAYS = 60 * 60 * 24 * 5; // 5 days

export async function signUp(params: SignUpParams) {
  const { uid, email, password, name } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return { success: false, message: "User already exists" };
    }
    await db.collection("users").doc(uid).set({
      email,
      name,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      success: true,
      message: "Account created successfully, please sign in!",
    };
  } catch (error: unknown) {
    console.error("Error signing up:", error);

    if (typeof error === "object" && error && "code" in error) {
      if (error.code === "auth/email-already-in-use") {
        return { success: false, message: "Email already in use" };
      }
      if (error.code === "auth/weak-password") {
        return { success: false, message: "Weak password" };
      }
      if (error.code === "auth/invalid-email") {
        return { success: false, message: "Invalid email" };
      }

      return { success: false, message: "Faied to create an account!" };
    }
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: "User doesn't exist, please sign up instead!",
      };
    }

    await setSessionCookie(idToken);
    return { success: true, message: "Sign in successful!" };
  } catch (error) {
    console.log("Error signing in:", error);
    return { success: false, message: "Failed to sign in" };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookiesStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: FIVE_DAYS * 1000,
  });

  cookiesStore.set("session", sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: FIVE_DAYS,
    path: "/",
    sameSite: "lax",
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const cookiesStore = await cookies();
  const sessionCookie = cookiesStore.get("session")?.value;

  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.error("Error verifying session cookie:", error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();

  return !!user; // logic of "!!" :=> '' -> false ->  !'' -> true -> !true -> false
}

export async function signOut() {
  const cookiesStore = await cookies();
  cookiesStore.delete("session");
}
