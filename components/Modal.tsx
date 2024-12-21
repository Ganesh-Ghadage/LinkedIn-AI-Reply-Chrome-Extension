import React, {useRef, useState} from 'react'
import insertIcon from "~/assets/insert.svg";
import genIcon from "~/assets/generate.svg";
import reGenIcon from "~/assets/regenerate.svg";

import { generateAIReply } from '@/services/OpenAIService';
import { generateGeminiReply } from '@/services/GeminiAIServices';

type prompts = 
    {
        inputPrompt: string | null,
        aiResponse: string | null,
    }

function Modal({setShow}:{
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}) {

    const [inputText, setInputText] = useState("")
    const [prompts, setPrompts] = useState<prompts[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    //this is get referance on Prompt Box Div
    const modalContentRef = useRef<HTMLInputElement>(null);

    //This function generates dummy AI response
    const generateaiResponse = (textInput:string): Promise<string> => {
        setLoading(true)
        // const response = generateAIReply(textInput)
        const response = generateGeminiReply(textInput)
        //setTimeout is added to have exprience like real API call
        return new Promise((res, rej) => {
            if(!textInput) {
                setError(true)
                return rej("No Respose")
            }
            setTimeout(() => {
                res(response)
                setLoading(false)
            }, 1000)
        })
    }

    //This block executes when Generate button is clicked
    const handleGenrateBtnClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();

        //Checks if user has provided Input or not
        if(!inputText){
            return
        }

        let generatedResponse = await generateaiResponse(inputText)
        setPrompts([...prompts, {inputPrompt: inputText, aiResponse: generatedResponse}])

        setInputText("")
    }

    //This blocks executes when Insert button is clicked
    const handleInsertBtn = () => {
        if(prompts.length > 0){
            const messageContainer = document.getElementsByClassName("msg-form__contenteditable")[0]
            messageContainer.ariaLabel=""

            const placeholderDiv = document.getElementsByClassName("msg-form__placeholder")
            placeholderDiv[0]?.parentElement?.removeChild(placeholderDiv[0])
            
            messageContainer.children[0].textContent = prompts[prompts.length - 1].aiResponse

            setShow(false)
        }
    }

    //This block is close the modal by clicking outside of it
    const handleCustomModalClick = (event: any) => {
        if (modalContentRef.current && modalContentRef.current != event.target && !modalContentRef.current.contains(event.target)) {
            setShow(false)
        }
    }

if(error){
    return (
        <div id='error-div'
            className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[4000]'
            onClick={(event) => handleCustomModalClick(event)}
        >
            <div id='error-msg'
                className='bg-red-300 text-red-700 rounded-xl w-fit p-4 mx-5 z-[10000]'
                ref={modalContentRef}
            >
                Something went Wrong
            </div>
        </div>
    )
}


return (
    <div id="custom-modal" 
            className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[4000]'
        onClick={(event) => handleCustomModalClick(event)}
    >
        <div id="modal-content" 
            className='bg-white rounded-xl w-full max-w-4xl p-7 mx-5 z-[10000]'
            ref={modalContentRef}
        >
            <div id="messages" 
            className='max-h-64 overflow-y-auto flex flex-col'
            >
                {prompts.map((value, index) => (
                    <div key={index}>
                        <div
                            className='bg-[#DFE1E7] text-[#666D80] rounded-xl p-3 mb-3 text-right w-fit max-w-[80%] self-end ml-auto'
                        >{value.inputPrompt}</div>

                        <div
                            className='bg-[#DBEAFE] text-[#666D80] rounded-xl p-3 mb-3 text-left w-fit max-w-[80%] self-start mr-auto'
                        >{value.aiResponse}</div>
                    </div>
                ))}

            </div>
            <div className='my-5'>
                <input id="input-text" type="text" placeholder="Your prompt" 
                    className='w-full p-2 border rounded-lg bg-white'
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
            </div>
            <div className='flex justify-end gap-3 mt-3'>
                <button id="insert-btn" 
                    className={`bg-white items-center text-[#666D80] px-3 py-1 border-2 border-[#666D80] rounded-md cursor-pointer mr-2 ${prompts.length > 0 ? 'flex' : 'hidden'}`}
                    onClick={handleInsertBtn}
                >
                    <img src={insertIcon} alt="Insert" 
                    className='align-middle mr-2 w-5 h-5'
                    /> 
                    <b>Insert</b>
                </button>
                
                <button id="generate-btn" 
                    className={`bg-[#007bff] items-center text-white flex px-3 py-1 border-2 rounded-md cursor-pointer
                        ${loading ? `disabled bg-[#666D80]` : `border-[#007bff]`}
                        `}
                    onClick={(event :React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleGenrateBtnClick(event)}
                >
                    {loading ? 'Loading...' :
                        prompts.length == 0 ?
                        <>
                            <img src={genIcon} alt="Generate" 
                                className='align-middle mr-2 w-6 h-6'
                            />
                            Generate
                        </>
                        :
                        <>
                            <img src={reGenIcon} alt="Generate" 
                                className='align-middle mr-2 w-6 h-6'
                            />
                            Regenerate
                        </>
                    }
                </button> 
            </div>
        </div>
    </div>
  )
}

export default Modal