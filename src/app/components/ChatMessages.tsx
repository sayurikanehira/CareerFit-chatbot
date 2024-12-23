"use client"

import { MessagesContext } from '@/context/messages'
import { cn } from '@/lib/utils'
import { FC, HTMLAttributes, useContext } from 'react'
import MarkdownLite from './ui/MarkdownLite'

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {}

const ChatMessages: FC<ChatMessagesProps> = ({className, ...props}) => {
    const { messages } = useContext(MessagesContext)
    const inverseMessages = [...messages].reverse()

    return (     
        <div {...props} className={cn(
            'flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch',
            className
        )}>
            <div className='flex-1 flex-grow' />
            {inverseMessages.map((message) => (
                <div key={message.id} className={cn(
                    'flex',
                    {
                        'justify-end': message.isUserMessage,
                        'justify-start': !message.isUserMessage,
                    }
                )}>
                    <div className={cn(
                        'flex flex-col space-y-2 text-sm max-w-xs mx-2',
                        {
                            'order-1 items-end': message.isUserMessage,
                            'order-2 items-start': !message.isUserMessage,
                        }
                    )}>
                        <div className={cn('px-4 py-2 rounded-lg inline-block', {
                            'bg-blue-600 text-white': message.isUserMessage,
                            'bg-gray-200 text-gray-900': !message.isUserMessage,
                        })}>
                            <MarkdownLite text={message.text} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ChatMessages