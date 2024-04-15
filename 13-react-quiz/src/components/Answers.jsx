import { useRef } from 'react'
import QUESTIONS from '../questions.js'

export default function Answers({index, answers, onSelectAnswer, answerState, selectedAnswer }){
    const suffledAnswer = useRef();
    if (!suffledAnswer.current) {
        suffledAnswer.current = [...answers];
        suffledAnswer.current.sort((a, b) => Math.random() - 0.5);
    }
    
    return <ul id="answers">
        {suffledAnswer.current.map((answer) => {
            const isSelected = selectedAnswer === answer;
            let cssClass = '';
            if (isSelected) {
                cssClass = 'selected';
            }
            if (isSelected && (answerState === 'correct' || answerState === 'wrong')) {
                cssClass = answerState;
            }
            let isDisabled = !isSelected ? '' : 'disabled';
            return <li key={answer} className="answer">
                <button onClick={() => onSelectAnswer(answer)} className={cssClass} disabled={answerState !== ''}>{answer}</button>
            </li>
        })}
    </ul>
}