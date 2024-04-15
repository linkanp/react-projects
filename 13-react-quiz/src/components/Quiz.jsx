import { useState, useCallback } from "react";
import QUESTIONS from '../questions.js'

import QuestionTimer from './QuestionTimer.jsx'
import Summary from "./Summary.jsx";
import Question from "./Question.jsx";

export default function Quiz() {
    // console.log(questions);
    const [userAnswers, setUserAnswers] = useState([]);
    const currentQuestionIndex = userAnswers.length;
    // const currentQuestion = QUESTIONS.find((QUESTIONS) => question.);
    const handleSelectAnswer = useCallback(function handleSelectAnser(selectedAnswer){
        //console.log('on-time-out');
        //console.log(selectedAnswer);
        setUserAnswers((prevAnswer) => [...prevAnswer, selectedAnswer]);
        //console.log(userAnswers);
    }, []);
    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    
    const quizComplete = QUESTIONS.length === userAnswers.length;
    if (quizComplete) {
        return <Summary userSelectedAnswers={userAnswers}/>
    }

    return <div id="quiz">
            <Question 
                key={currentQuestionIndex} 
                index={currentQuestionIndex} 
                onSelectAnswer={handleSelectAnswer} 
                onSkipAnswer={handleSkipAnswer} 
            />
        </div>
}