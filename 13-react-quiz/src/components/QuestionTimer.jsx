import { useState, useEffect } from "react";

export default function QuestionTimer({timeOut, onTimeOut, mode}) {
    const [timeReamining, setTimeReamining] = useState(timeOut);
    useEffect(() => {
        const timeOutRef = setTimeout(onTimeOut, timeOut);
        return () => {
            clearTimeout(timeOutRef);
        }
    }, [timeOut, onTimeOut]);

    useEffect(() => {
        // console.log('set interval');
        const interval = setInterval(() => {
            setTimeReamining((prevTime) => {
                return prevTime - 100;
              });
        }, 100);
        return () => {
            clearInterval(interval);
        }
    }, []);
   
    return <progress id="question-time" max={timeOut} value={timeReamining} className={mode}></progress>
}