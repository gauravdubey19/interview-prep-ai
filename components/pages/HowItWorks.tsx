// import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import Link from "next/link";

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="container mx-auto px-4 sm:py-16 md:py-28"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-100 mb-4">
            How <span className="text-cyan-500">AceInterviews</span> Works
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-marcellus">
            Our AI-powered platform makes interview preparation simple,
            effective, and tailored to your needs.
          </p>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          duration: 0.9,
          ease: "easeOut",
        }}
        className="w-full"
      >
        <StickyScroll content={content} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.5,
          duration: 0.6,
          ease: "easeOut",
        }}
        className="text-center mt-10"
      >
        <motion.div
          whileHover={{ scale: 1.05, opacity: 0.9 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <Link
            href="/dashboard"
            className="px-8 py-3 rounded-full bg-cyan-500 text-white font-medium hover:bg-cyan-700 transition-colors ease-in-out duration-300"
          >
            Start Your First Interview
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;

const content = [
  {
    title: "Select Interview Type",
    description:
      "Choose from technical, behavioral, or industry-specific interview scenarios tailored to your career goals. Our comprehensive library covers everything from software engineering and data science to marketing and leadership roles.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white rounded-xl p-8">
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="text-xl font-bold mb-2">Multiple Interview Types</h3>
          <p className="text-center">
            Technical, Behavioral, Leadership, and Industry-Specific
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Practice with AI",
    description:
      "Engage in realistic interview simulations with our advanced AI interviewer that adapts to your responses in real-time. Practice from anywhere, anytime, with voice or text interactions that feel remarkably human.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--indigo-500),var(--purple-500))] text-white rounded-xl p-8">
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <h3 className="text-xl font-bold mb-2">AI-Powered Voice Chat</h3>
          <p className="text-center">
            Natural dialogue with contextual follow-up questions
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Receive Feedback",
    description:
      "Get detailed, actionable feedback on your performance immediately after each practice session. Our AI analyzes your responses, communication style, and even body language through video to provide personalized improvement suggestions.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white rounded-xl p-8">
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-bold mb-2">Comprehensive Analysis</h3>
          <p className="text-center">
            Insights on content, delivery, and technical accuracy
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Improve & Master",
    description:
      "Track your progress over time with detailed analytics and performance metrics. Identify patterns, focus on weak areas, and watch your confidence grow as you transform into an interview master through deliberate practice.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white rounded-xl p-8">
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          <h3 className="text-xl font-bold mb-2">Performance Tracking</h3>
          <p className="text-center">
            Data-driven insights to accelerate your growth
          </p>
        </div>
      </div>
    ),
  },
];
