"use client"

import { MessagesContext } from '@/context/messages'
import { cn } from '@/lib/utils'
import { Message } from '@/lib/validators/message'
import { useMutation } from '@tanstack/react-query'
import { CornerDownLeft, Loader2 } from 'lucide-react'
import { nanoid } from 'nanoid'
import { FC, HTMLAttributes, useContext, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import {toast} from 'react-hot-toast'

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> { }

const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
  const [input, setInput] = useState<string>('')
  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = useContext(MessagesContext)

  const textareaRef = useRef<null | HTMLTextAreaElement>(null)

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (message: Message) => {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: [message] }),
      })


      if(!response.ok) {
        throw new Error()
      }

      return response.body
    },
    onMutate: (message) => {
      addMessage(message)
    },

    onSuccess: async (stream) => {
      if (!stream) throw new Error('No stream found')

      const id = nanoid()
      const responseMessage: Message = {
        id,
        isUserMessage: false,
        text: '',

      }

      addMessage(responseMessage)

      setIsMessageUpdating(true)

      const reader = stream.getReader()
      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunckValue = decoder.decode(value)
        console.log(chunckValue)
        updateMessage(id, (prev) => prev + chunckValue)
      }
      //clean up
      setIsMessageUpdating(false)
      setInput('')

      setTimeout(() => {
        textareaRef.current?.focus()
      }, 10)
    },
    onError(_, message) {
    toast.error('Something went wrong. Please try again.')
    removeMessage(message.id)
    setInput(message.text)
    textareaRef.current?.focus()
    },
  })

  return (
    <div{...props} className={cn('border-zinc-600', className)}>
      <div className='relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none '>
        <TextareaAutosize
          ref={textareaRef}
          rows={2}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
             const trimmedInput = input.trim()
             if (!trimmedInput){
              e.preventDefault()
              return
             }
              e.preventDefault()

              const message: Message = {
                id: nanoid(),
                isUserMessage: true,
                text: input,
              }

              sendMessage(message)
              setInput('')
            }
          }}
          maxRows={4}
          disabled={isPending}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          placeholder='Write a message...'
          className='peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 focus:outline-none focus:border-none text-sm sm:leading-6'>
        </TextareaAutosize>

        <div className='absolute inset-y-0 right-0 flex py-1.5 pr-1.5 '>
          <kbd className='inline-flex item-center rounded border bg-red border-gray-200 px-1 font-sans text-xs text-gray-400'>
            
           {/*isLoading write always as isPending! */}

            {isPending ? (
              <Loader2 className='w-auto h-auto animate-spin ' />
            ) : (
              <CornerDownLeft className='w-auto h-auto' />
            )}
          </kbd>
        </div>

            <div
              className='absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:broder-t-2 peer-focus:border-indigo-600'
              aria-hidden='true'
              ></div>






      </div>
    </div>
  )
}

export default ChatInput