type Exercise = {
  name: string;
  time: number;
  pause: number;
  reps?: number;
  setup?: number;
};

const schedule: Exercise[] = [
  { name: "Around the world", time: 30, reps: 3, pause: 10 },
  { name: "Goblet Squat", time: 30, reps: 3, pause: 10 },
  { name: "Swings", time: 30, pause: 10 },
  { name: "Deadlift", time: 10, reps: 6, setup: 30, pause: 30 },
  { name: "Curl", time: 10, reps: 6, setup: 30, pause: 30 },
  { name: "Shoulder Press", time: 10, reps: 6, setup: 30, pause: 30 },
  { name: "Half Bridge", time: 60, pause: 30 },
  { name: "Half Bridge", time: 60, pause: 30 },
  { name: "90/90", time: 60, reps: 2, pause: 10 },
  { name: "QL", time: 60, reps: 2, pause: 10 }
];

export function findScheduled(time: number) {
  const [result] = schedule.reduce<[{ name: string; timeLeft: number } | null, number]>(
    ([result, timeLeft], { name, time = 0, reps = 1, setup = 0, pause = 0 }) => {
      if (result) return [result, 0];
      const eventTime = setup + time * reps + pause;

      if (timeLeft - eventTime <= 0) {
        timeLeft -= setup;
        if (timeLeft < 0) return [{ timeLeft: -timeLeft, name: `${name} (Setup)` }, 0];
        for (let rep = 0; rep < reps; rep++) {
          timeLeft -= time;
          const suffix = reps > 1 ? ` (${rep + 1})` : "";
          if (timeLeft < 0) return [{ timeLeft: -timeLeft, name: `${name} ${suffix}` }, 0];
          timeLeft -= pause;
          if (timeLeft < 0) return [{ timeLeft: -timeLeft, name: "Pause" }, 0];
        }
      }
      return [null, timeLeft - eventTime];
    },
    [null, time]
  );
  return result;
}
