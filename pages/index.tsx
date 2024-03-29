import Head from "next/head";
import { useEffect, useState } from "react";
import { findScheduled } from "../lib/schedule";

export default function Home() {
  const [timeStarted, setTimeStarted] = useState(Date.now());
  const [exercise, setExercise] = useState(findScheduled(0));

  useEffect(() => {
    const interval = setInterval(() => {
      const untilNow = Math.round((Date.now() - timeStarted) / 1000);
      setExercise(findScheduled(untilNow));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeStarted]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-gray-800">
      <Head>
        <title>IsoTimer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        {exercise && (
          <>
            <h1 className="text-xl sm:text-6xl font-bold m-4 dark:text-gray-300">{exercise.name}</h1>
            <h2 className="text-lg sm:text-4xl font-bold m-4 dark:text-gray-300">{exercise.timeLeft}s</h2>
          </>
        )}
        <button
          className="border-2 p-2 rounded m-4 bg-gray-50 dark:border-gray-500 dark:bg-gray-900 dark:text-gray-300"
          onClick={() => {
            setTimeStarted(Date.now());
            setExercise(findScheduled(0));
          }}
        >
          Reset
        </button>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  );
}
