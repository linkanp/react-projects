import {useCallback, useState } from "react";
import Answers from "./Answers";
import QUESTIONS from '../questions.js'
import QuestionTimer from "./QuestionTimer.jsx";



export default function Question({index, onSelectAnswer, onSkipAnswer}) {
    
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });
    let timeOut = 10000;
    if (answer.selectedAnswer) {
        timeOut = 1000;
    }
    if (answer.isCorrect !== null) {
        timeOut = 2000;
    }

    function handleSetAnswer(answer) {
        console.log(answer);
        console.log(QUESTIONS[index].answers[0]);
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        });
        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer
            });
            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000);
        }, 1000);
    }

    let answerState = '';
    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }
    
    
    return <div id="question">
        <QuestionTimer 
            key={timeOut}
            timeOut={timeOut} 
            onTimeOut={answer.selectedAnswer === '' ? onSkipAnswer : null } 
            mode={answerState}
        />
        <h2>{QUESTIONS[index].text}</h2>
        <Answers 
            index={index} 
            answers={QUESTIONS[index].answers}
            onSelectAnswer={handleSetAnswer} 
            answerState={answerState} 
            selectedAnswer={answer.selectedAnswer}/>
    </div>
}