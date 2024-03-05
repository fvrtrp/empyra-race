'use client'
import React, { useEffect, useRef, useState } from 'react'
import sha256 from 'js-sha256'
import { questions, finalHash } from './questions'
import Background from './background'

export default function Hunt(props) {
    const inputRef = useRef(null);
    const [ userInput, setUserInput] = useState("")
    const [currentQuestion, setQuestion] = useState(null)
    const [completed, setCompleted] = useState(false)
    const [player, setPlayer] = useState('')

    useEffect(() => {
        const nextQuestion = questions.find(i=>i.key === 0)
        setQuestion(nextQuestion)
    }, [])

    const checkPassword = (e) => {
        e.preventDefault();
        const key = currentQuestion.solution;
        let hash = sha256.create().update(userInput.toLowerCase()).hex();
        const isCorrect = hash===key;
        if(isCorrect) {
            const nextHash = sha256.create().update(hash).hex();

            //end condition - player has finished the last question
            if(nextHash === finalHash) {
                setCompleted(true)
                return
            }

            const nextQuestion = questions.find(i=>i.key === nextHash);
            if(!nextQuestion) {
                //throw error
                alert(`couldn't find next question, please contact admin`);
            }
            else {
                setQuestion(nextQuestion);
                setUserInput('');
                inputRef.current.className = 'highlight success'
            }
        } else {
            console.log(`wrong answer, fool`)
            inputRef.current.className = 'highlight error'
        }
        setTimeout(() => inputRef.current.className = '', 1500)
    }

    if(!currentQuestion)
    return null;

    if(completed) {
        return (
            <>
                <Background />
                <div className="winContainer">
                    <h1 className="header">You have<br/>finished.</h1>
                    <div className="winPrompt">
                        Share this screen on Teams<br/>to mark completion.<br/><br/><b>Congrats {player}!</b>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Background />
            <div className="container">
                <div className="prompt">
                <h3 aria-label='imjustaprompt'>
                    {currentQuestion.title}
                </h3>
                {
                    currentQuestion.body &&
                    <h5 className="promptBody">
                        {currentQuestion.body}
                    </h5>
                }
                </div>
                <form onSubmit={checkPassword}>
                    <input
                        ref={inputRef}
                        id="primaryInput"
                        placeholder={"TYPE HERE"}
                        value={userInput}
                        onChange={(e)=>setUserInput(e.target.value)}
                        autoFocus
                        autoComplete="false"
                        autoCorrect="false"
                    />
                </form>
                <textarea
                    id="players"
                    onChange={(e) => setPlayer(e.target.value)}
                    placeholder="Who's playing?"
                />
            </div>
        </>
    )
}