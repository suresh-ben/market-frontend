import { useEffect, useRef, useState } from 'react'
import { info } from "../assets/images";

type InfoProps = {
    message: string
}

export default function Info({ message }: InfoProps) {

    const [isMessageInView, setIsMessageInView] = useState<boolean>(false);
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const messageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!messageContainerRef.current || !messageRef.current) return;

        const { x, y } = messageContainerRef.current.getBoundingClientRect();
        messageRef.current.style.top = `${y - messageRef.current.offsetHeight + messageContainerRef.current.offsetHeight}px`;
        messageRef.current.style.left = `${x + messageContainerRef.current.offsetWidth + 3}px`;
        
        return () => {
            if(!messageRef.current) return;
            messageRef.current.style.top = '';
            messageRef.current.style.left = '';
        }
    }, [isMessageInView, messageContainerRef.current, messageRef.current]);

    return (
        <div 
            className='h-[.75rem] w-[.75rem] relative' 
            onMouseEnter={() => setIsMessageInView(true)}
            onMouseLeave={() => setIsMessageInView(false)}
            ref={messageContainerRef}
        >
            <img src={info} alt='info' className='h-full w-full object-contain' />
            {
                isMessageInView &&<div ref={messageRef} className={`fixed max-w-[50vh] border border-black rounded bg-[white] overflow-hidden`}>
                    <p className='m-lg px-4 py-1' >{message}</p>
                </div>
            }
        </div>
    )
}
