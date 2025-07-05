import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Input from '../../../../components/Input'
import { toast } from 'react-toastify'

type UserCreationPopupProps = {
    managerName: string,
    userId: string,
    countryName: string,
    password: string,
    isOpen: boolean,
    onClose: () => void,
}

export default function UserCreationPopup({ managerName="", userId="", countryName="", password="", isOpen=false, onClose }: UserCreationPopupProps): React.JSX.Element {
    return (
        <AnimatePresence>
            {
                isOpen && <motion.div 
                    className='fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,0.25)]'
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                >
                    <div className='p-8 w-[25rem] flex flex-col justify-center items-center gap-4 bg-white shadow-2xl'>
                        <div className='flex justify-end items-end w-full'>
                            <button onClick={onClose} className='text-xl font-semibold'>x</button>
                        </div>
                        <p className='text-center'>"{managerName}'s Manager account" has been created under the country "{countryName}"</p>

                        <hr className='h-1 w-[20rem] my-4' />

                        <div className='flex flex-col gap-1 items-center justify-center w-[20rem]'>
                            <Input label='UserId' name='userId' defaultValue={userId} disabled />
                            <Input label='Password' name='password' defaultValue={password} disabled />

                            <button 
                                className='border rounded-xs px-4 py-1 bg-gray-300' 
                                onClick={() => {
                                    navigator.clipboard.writeText(`userId: ${userId} , password: ${password}`)
                                    toast.info('Credentials have been copied to the clipboard');
                                }} 
                            >
                                Copy Credentials
                            </button>
                            <p className='text-xs'>Please Copy and Share with respective Manager</p>
                        </div>
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
}
