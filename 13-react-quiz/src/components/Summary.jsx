import quizCompleteImg from '../assets/quiz-complete.png'
import QUESTIONS from '../questions.js'

export default function Summary({userSelectedAnswers}) {
    console.log(userSelectedAnswers);
    // const correct = QUESTIONS.
    let correct = 0;
    let skipped = 0;
    userSelectedAnswers.map((answer, index) => {
        if (answer === null) {
            skipped += 1;
        }
        if (answer && answer === QUESTIONS[index].answers[0]) {
            correct += 1;
        }
    });
    
    const correctPercent = Math.round((correct / QUESTIONS.length) * 100);
    const skipPercent = Math.round((skipped / QUESTIONS.length) * 100);
    const incorrect = 100 - (correctPercent + skipPercent);

    return <div id="summary">
        <img src={quizCompleteImg} alt="Quiz Complete" />
        <h2>Quiz Completed!</h2>
        <div id='summary-stats'>
            <p>
                <span className='number'>{skipPercent}%</span>
                <span className='text'>skipped</span>
            </p>
            <p>
                <span className='number'>{correctPercent}%</span>
                <span className='text'>correct</span>
            </p>
            <p>
                <span className='number'>{incorrect}%</span>
                <span className='text'>incorrect</span>
            </p>
        </div>
        <ol>
            {userSelectedAnswers.map((answer, index) => {
                let cssClass = 'user-answer';
                if (answer === null) {
                    cssClass += ' skipped';
                    answer = 'Skipped';
                }
                if (answer && answer === QUESTIONS[index].answers[0]) {
                    cssClass += ' correct';
                }
                if (answer && answer !== QUESTIONS[index].answers[0]) {
                    cssClass += ' wrong';
                }
                return <li>
                    <h3>{index+1}</h3>
                    <p className='question'>{QUESTIONS[index].text}</p>
                    <p className={cssClass}>{answer}</p>
                </li>
            })}
        </ol>
    </div>
}