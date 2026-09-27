"use client";

import { useEffect, useState } from "react";

const tournamentStart = new Date("2026-10-02T09:00:00-06:00").getTime();

type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  complete: boolean;
};

function getTimeRemaining(): TimeRemaining {
  const difference = Math.max(0, tournamentStart - Date.now());

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
    complete: difference === 0
  };
}

export default function GolfCountdown() {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    const updateCountdown = () => setTimeRemaining(getTimeRemaining());

    updateCountdown();
    const intervalId = window.setInterval(updateCountdown, 1_000);

    return () => window.clearInterval(intervalId);
  }, []);

  const countdownUnits = [
    { label: "Days", value: timeRemaining?.days },
    { label: "Hours", value: timeRemaining?.hours },
    { label: "Minutes", value: timeRemaining?.minutes },
    { label: "Seconds", value: timeRemaining?.seconds }
  ];

  return (
    <section className="border-b border-white/15 bg-primary text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(460px,0.8fr)] lg:items-center">
        <div>
          <p className="font-accent text-sm uppercase tracking-[0.3em] text-accent">
            Countdown to Tee Time
          </p>
          <h2 className="mt-2 font-heading text-2xl font-semibold md:text-3xl">
            Friday, October 2, 2026
          </h2>
          <p className="mt-2 text-base text-white/75">Shotgun start at 9:00 AM MDT</p>
        </div>

        {timeRemaining?.complete ? (
          <p className="font-heading text-3xl font-semibold text-accent">
            Tournament day is here!
          </p>
        ) : (
          <div
            className="grid grid-cols-4 gap-2 sm:gap-3"
            aria-label="Time remaining until the golf tournament"
          >
            {countdownUnits.map((unit) => (
              <div
                key={unit.label}
                className="rounded-xl border border-white/15 bg-white/10 px-2 py-4 text-center shadow-soft sm:px-4"
              >
                <p className="font-heading text-2xl font-semibold tabular-nums text-white sm:text-3xl">
                  {unit.value === undefined ? "--" : String(unit.value).padStart(2, "0")}
                </p>
                <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/70 sm:text-xs sm:tracking-[0.18em]">
                  {unit.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
