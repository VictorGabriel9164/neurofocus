import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

const timeOptions = {
  "15": 15 * 60,
  "25": 25 * 60,
  "50": 50 * 60,
} as const;

type TimeKey = keyof typeof timeOptions;

type PomodoroContextType = {
  selectedTime: TimeKey;
  time: number;
  isRunning: boolean;
  state: "focus" | "break";
  cycles: number;
  changeTime: (newTime: TimeKey) => void;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
  formatTime: () => string;
};

const PomodoroContext = createContext({} as PomodoroContextType);

export function PomodoroProvider({ children }: { children: ReactNode }) {
  const [selectedTime, setSelectedTime] = useState<TimeKey>("25");
  const [time, setTime] = useState(timeOptions["25"]);
  const [isRunning, setIsRunning] = useState(false);
  const [state, setState] = useState<"focus" | "break">("focus");
  const [cycles, setCycles] = useState(0);

  const changeTime = (newTime: TimeKey) => {
    setSelectedTime(newTime);
    setTime(timeOptions[newTime]);
    setIsRunning(false);
    setState("focus");
  };

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    const handleTimerEnd = () => {
      setIsRunning(false);

      if (state === "focus") {
        setState("break");
        setTime(5 * 60);
      } else {
        setState("focus");
        setTime(timeOptions[selectedTime]);
        setCycles((c) => c + 1);
      }
    };

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            handleTimerEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, selectedTime, state]);

  const formatTime = () => {
    const mins = Math.floor(time / 60).toString().padStart(2, "0");
    const secs = (time % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <PomodoroContext.Provider
      value={{
        selectedTime,
        time,
        isRunning,
        state,
        cycles,
        changeTime,
        setIsRunning,
        formatTime,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}

export function usePomodoro() {
  return useContext(PomodoroContext);
}