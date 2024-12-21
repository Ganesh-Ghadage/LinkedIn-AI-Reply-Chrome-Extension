import Modal from "@/components/Modal";
import { useState } from "react";
import aiLogo from '../../assets/aiLogo.svg'

export default () => {

  const [showModal, setShowModal] = useState<boolean>(false)

  let parentElement: HTMLElement;

  //Creating AI Icon 
  const aiIconHTML = document.createElement("img");
        aiIconHTML.className = "edit-icon";
        aiIconHTML.src = aiLogo;
        aiIconHTML.alt = "Custom Icon";
        aiIconHTML.style.position = "absolute";
        aiIconHTML.style.bottom = "6px";
        aiIconHTML.style.right = "6px";
        aiIconHTML.style.width = "40px";
        aiIconHTML.style.height = "40px";
        aiIconHTML.style.cursor = "pointer";
        aiIconHTML.style.zIndex = "1000";

  //This block detect an click event and appen AI Icon if we clicked in to Message Text Area
  document.addEventListener("click", (event: MouseEvent) => {
    event.stopPropagation()
    event.stopImmediatePropagation()
    const target = event.target as HTMLElement

    if(target.matches('.msg-form__contenteditable') || target.matches(".msg-form__contenteditable > p")){
      parentElement = target?.closest('.msg-form__contenteditable') || target?.closest(".msg-form__contenteditable > p")!
      parentElement?.appendChild(aiIconHTML)

      aiIconHTML.addEventListener("click", (e) => {
        e.stopPropagation();
        setShowModal(true)
      })

    }else if(parentElement?.contains(aiIconHTML)) {
      parentElement?.removeChild(aiIconHTML)
    }
  })


  if(showModal){
    return (
      <Modal setShow={setShowModal} />
    );
  }
  
};
