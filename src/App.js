import React, { useState, useEffect } from 'react';
import './App.css';
import beepSound from './beep_alarm.mp3'; // Make sure to have your beep sound file in the correct directory

function App() {
  const [time, setTime] = useState(10);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    if (time === 0) { // Adjust this value to set the time for the alarm to go off
      playAlarm();
      setIsRunning(false);
    }
  }, [time]);

  const playAlarm = () => {
    const audio = new Audio(beepSound);
    audio.play();
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(10);
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-black text-white shadow-2xl">
      <h1 className='text-[3rem]'>Alarm Stopwatch</h1>
      <div className="timer text-[2rem] my-10">{formatTime()}</div>
      <div className="buttons w-[50%] flex justify-evenly">
        {!isRunning ? <button className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-20 h-10' onClick={startTimer}>Start</button> : <button className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-red-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-20 h-10' onClick={stopTimer}>Stop</button>}
        <button className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-red-500 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-20 h-10' onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default App;
