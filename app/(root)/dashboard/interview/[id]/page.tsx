import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/interview.actions";
import InterviewSession from "@/components/pages/dasboard/interview/InterviewSession";

export default async function InterviewSessionPage({ params }: RouteParams) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user?.id) return redirect("/auth/sing-in");

  const interview = await getInterviewById(id);
  if (!interview) redirect("/dashboard");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user.id!,
  });

  return (
    <InterviewSession
      user={user}
      interviewId={id}
      interview={interview}
      feedbackId={feedback?.id}
    />
  );
}
