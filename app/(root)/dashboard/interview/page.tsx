import { getCurrentUser } from "@/lib/actions/auth.actions";
import Agent from "@/components/pages/dasboard/interview/Agent";

export default async function InterviewPage() {
  const user = await getCurrentUser();

  return (
    <>
      <h3>Interview Generation</h3>

      <Agent
        userName={user?.name || "You"}
        userId={user?.id}
        userPfp={user?.image || "/user-avatar.png"}
        type="generate"
      />
    </>
  );
}
