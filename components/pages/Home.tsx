"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "../ui/moving-border";
import Image from "next/image";
import HowItWorks from "./HowItWorks";

const Home = () => {
  return (
    <>
      {/* <div className="container mx-auto px-4 py-24 sm:py-32"> */}
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"AI-Powered Interview Preparation For Your Dream Job"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                <span className={word === "AI-Powered" ? "text-cyan-500" : ""}>
                  {word}
                </span>
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-3xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400 font-marcellus"
        >
          Simulate real interview scenarios, receive instant feedback, and
          improve your technical and soft skills to stand out from the
          competition.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/dashboard">
            <Button
              borderRadius="5.75rem"
              containerClassName="w-60"
              className="rounded-full text-lg bg-cyan-500 text-white cursor-pointer font-medium hover:bg-cyan-700 transition-colors ease-in-out duration-300"
            >
              Start Preparing
            </Button>
          </Link>

          <Link href="/#how-it-works">
            <Button
              borderRadius="5.75rem"
              containerClassName="w-60"
              className="rounded-full text-lg border border-gray-300 text-gray-200 cursor-pointer font-medium hover:bg-gray-50 hover:text-gray-950 transition-colors ease-in-out duration-300"
            >
              How It Works
            </Button>
          </Link>
        </motion.div>
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          {/* Features list items */}
          {[
            "Personalized Feedback",
            "Technical Interviews",
            "Behavioral Questions",
          ].map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 1 + index * 0.1,
                duration: 0.5,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.05, color: "#22d3ee" }}
              className="flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-cyan-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-400">{feature}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <Image
              src="/hero-banner.jpg"
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div>
      </div>

      <HowItWorks />
    </>
  );
};

export default Home;

// const HowItWorks = () => {
//   return (
//     <>
//       <section
//         id="how-it-works"
//         className="container mx-auto px-4 py-20 sm:py-28"
//       >
//         <div className="max-w-6xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{
//               duration: 0.7,
//               ease: "easeOut",
//             }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-3xl sm:text-4xl font-bold text-primary-100 mb-4">
//               How <span className="text-cyan-500">AceInterviews</span> Works
//             </h2>
//             <p className="text-lg text-gray-400 max-w-2xl mx-auto font-marcellus">
//               Our AI-powered platform makes interview preparation simple,
//               effective, and tailored to your needs.
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
//             {/* Step cards with animations */}
//             {[
//               {
//                 title: "Select Interview Type",
//                 description:
//                   "Choose from technical, behavioral, or industry-specific interview scenarios.",
//                 icon: (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                   />
//                 ),
//               },
//               {
//                 title: "Practice with AI",
//                 description:
//                   "Interact with our AI interviewer through natural voice conversations. Our AI conducts interviews in a human-like manner, creating a realistic experience.",
//                 icon: (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
//                   />
//                 ),
//               },
//               {
//                 title: "Receive Feedback",
//                 description:
//                   "Get instant, detailed feedback on your answers and presentation style.",
//                 icon: (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 ),
//               },
//               {
//                 title: "Improve & Master",
//                 description:
//                   "Track your progress, refine your answers, and build interview confidence.",
//                 icon: (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
//                   />
//                 ),
//               },
//             ].map((step, index) => (
//               <motion.div
//                 key={step.title}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{
//                   delay: 0.2 * index,
//                   duration: 0.5,
//                   ease: "easeOut",
//                 }}
//                 whileHover={{
//                   scale: 1.03,
//                   boxShadow:
//                     "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
//                   backgroundColor: "rgba(8, 145, 178, 0.05)",
//                 }}
//                 className="flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300"
//               >
//                 <motion.div
//                   initial={{ scale: 0.8, opacity: 0 }}
//                   whileInView={{ scale: 1, opacity: 1 }}
//                   viewport={{ once: true }}
//                   transition={{
//                     delay: 0.3 + 0.2 * index,
//                     duration: 0.4,
//                     ease: "easeOut",
//                   }}
//                   className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-8 w-8 text-cyan-500"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     {step.icon}
//                   </svg>
//                 </motion.div>
//                 <motion.h3
//                   initial={{ opacity: 0 }}
//                   whileInView={{ opacity: 1 }}
//                   viewport={{ once: true }}
//                   transition={{
//                     delay: 0.4 + 0.2 * index,
//                     duration: 0.4,
//                   }}
//                   className="text-xl font-semibold text-primary-100 mb-2"
//                 >
//                   {step.title}
//                 </motion.h3>
//                 <motion.p
//                   initial={{ opacity: 0 }}
//                   whileInView={{ opacity: 1 }}
//                   viewport={{ once: true }}
//                   transition={{
//                     delay: 0.5 + 0.2 * index,
//                     duration: 0.4,
//                   }}
//                   className="text-gray-400"
//                 >
//                   {step.description}
//                 </motion.p>
//               </motion.div>
//             ))}
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{
//               delay: 0.5,
//               duration: 0.6,
//               ease: "easeOut",
//             }}
//             className="text-center"
//           >
//             <motion.div
//               whileHover={{ scale: 1.05, opacity: 0.9 }}
//               whileTap={{ scale: 0.98 }}
//               transition={{ duration: 0.2 }}
//             >
//               <Link
//                 href="/dashboard/interview"
//                 className="px-8 py-3 rounded-full bg-cyan-500 text-white font-medium hover:bg-cyan-700 transition-colors ease-in-out duration-300"
//               >
//                 Start Your First Interview
//               </Link>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>
//     </>
//   );
// };
