import { FC } from 'react'

interface ChatHeaderProps {
  
}
//try to fix the hover over underline in both
const ChatHeader: FC<ChatHeaderProps> = ({}) => {
  return <div className='w-full flex gap-3 justify-start items-center text-zinc-800  '>
    <div className='flex flex-col items-start text-sm'>
        <p className='flex-xs'>Chat with</p>
        <div className='flex gap-1.5 items-center'>
            <p className='w-2 h-2 rounded-full bg-green-500 text'></p>
            <p className='font-medium'>CareerFit support</p>
        </div>
    </div>
</div>
}

export default ChatHeader