import { FlameIcon, HomeIcon, User2Icon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className='w-full h-18 flex flex-row items-center justify-around px-8 border-t border-stone-200'>
            <Link href={'/dashboard'} className='flex flex-col gap-0 items-center justify-center text-stone-400'>
                <HomeIcon width={18} />
                <p className='text-xs font-[inter] select-none'>Home</p>
            </Link>
            <Link href={'/dashboard'} className='flex flex-col gap-0 items-center text-stone-400 justify-center'>
                <FlameIcon width={18} />
                <p className='text-xs font-[inter] select-none'>Progress</p>
            </Link>
            <Link href={'/dashboard/profil'} className='flex flex-col gap-0 items-center text-stone-400 justify-center' >
                <User2Icon width={18} />
                <p className='text-xs font-[inter] select-none'>Profil</p>
            </Link>
        </div>
    )
}

export default Footer
