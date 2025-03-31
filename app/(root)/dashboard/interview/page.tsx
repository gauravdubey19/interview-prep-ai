import Agent from "@/components/pages/dasboard/Agent";
import { getCurrentUser } from "@/lib/actions/auth.actions";

export default async function InterviewPage() {
  const user = await getCurrentUser();
  return (
    <>
      <h3>Interview Generation</h3>

      <Agent userName={user?.name || "You"} userId={user?.id} type="generate" />
    </>
  );
}
