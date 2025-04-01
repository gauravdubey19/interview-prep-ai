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
      image: "/user-avatar.png",
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

export async function signInWithGoogle(idToken: string) {
  try {
    // Verify the Google ID token
    const decodedToken = await auth.verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    if (!email) {
      return {
        success: false,
        message: "Email not provided from Google account",
      };
    }

    // Check if user already exists
    let userRecord;
    try {
      userRecord = await db.collection("users").doc(uid).get();
    } catch (error) {
      console.error("Error getting user:", error);
    }

    // If user doesn't exist, create a new one
    if (!userRecord?.exists) {
      await db
        .collection("users")
        .doc(uid)
        .set({
          email,
          name: name || email.split("@")[0],
          createdAt: new Date(),
          updatedAt: new Date(),
          image: picture || "/user-avatar.png",
          authProvider: "google",
        });
    }

    // Set session cookie
    await setSessionCookie(idToken);

    return {
      success: true,
      message: userRecord?.exists
        ? "Signed in successfully!"
        : "Account created and signed in successfully!",
    };
  } catch (error) {
    console.error("Error with Google authentication:", error);
    return { success: false, message: "Failed to authenticate with Google" };
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
  try {
    const user = await getCurrentUser();

    if (user) {
      // Revoke Firebase session
      await auth.revokeRefreshTokens(user.id);
    }

    // Delete the session cookie
    const cookiesStore = await cookies();
    cookiesStore.delete("session");

    return { success: true, message: "Signed out successfully" };
  } catch (error) {
    console.error("Error signing out:", error);
    return { success: false, message: "Failed to sign out" };
  }
}
