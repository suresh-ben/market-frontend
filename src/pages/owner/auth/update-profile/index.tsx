import React from 'react'
import Header from '../../../../components/OwnerHeader'
import Sidebar from '../../../../components/OwnerSidebar'

export default function Index(): React.JSX.Element {
    return (
        <div className='flex flex-col w-screen h-screen'>
            <Header />
            <div className='flex-1 flex bg-gray-300'>
                <Sidebar />

                <div className='w-full h-full p-10'>
                    Update Profile
                </div>
            </div>
        </div>
    )
}
