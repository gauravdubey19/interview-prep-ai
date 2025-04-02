import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import { DisplayTechIcons } from "@/components/ui/interview/interview-card";
import Agent from "./Agent";

const InterviewSession = ({
  user,
  interviewId,
  interview,
  feedbackId,
}: {
  user: User;
  interviewId: string;
  interview: Interview;
  feedbackId: string | undefined;
}) => {
  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={40}
              height={40}
              className="rounded-full object-cover size-[40px]"
            />
            <h3 className="capitalize">{interview.role} Interview</h3>
          </div>

          <DisplayTechIcons techStack={interview.techstack} />
        </div>

        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize font-marcellus">
          {interview.type}
        </p>
      </div>

      <Agent
        userName={user.name!}
        userPfp={user?.image || "/user-avatar.png"}
        userId={user?.id}
        interviewId={interviewId}
        type="interview"
        questions={interview.questions}
        feedbackId={feedbackId}
      />
    </>
  );
};

export default InterviewSession;
