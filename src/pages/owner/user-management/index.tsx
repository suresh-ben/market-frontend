import React from 'react'
import Header from '../../../components/OwnerHeader'
import Sidebar from '../../../components/OwnerSidebar'
import UserCreation from './components/UserCreation'

const USER_MANAGEMENT_TYPES = {
    USER_CREATION: 'USER_CREATION',
    USER_MANAGEMENT: 'USER_MANAGEMENT',
}

export default function index(): React.JSX.Element {

    const [userManagementType, setUserManagementType] = React.useState<string>(USER_MANAGEMENT_TYPES.USER_CREATION);

    return (
        <div className='flex flex-col w-screen h-screen'>
            <Header />
            <div className='flex-1 flex bg-gray-300'>
                <Sidebar />
                <div className='w-full p-10'>
                    <div className='bg-white flex mb-5 gap-2 p-2'>
                        <button onClick={() => setUserManagementType(USER_MANAGEMENT_TYPES.USER_CREATION)} className={`p-2 border hover:bg-amber-100 ${userManagementType == USER_MANAGEMENT_TYPES.USER_CREATION && "underline shadow-2xl border-2 border-blue-500"}`}>User Creation</button>

                        <button onClick={() => setUserManagementType(USER_MANAGEMENT_TYPES.USER_MANAGEMENT)} className={`p-2 border hover:bg-amber-100 ${userManagementType == USER_MANAGEMENT_TYPES.USER_MANAGEMENT && "underline shadow-2xl border-2 border-blue-500"}`}>User Management</button>
                    </div>

                    {userManagementType === USER_MANAGEMENT_TYPES.USER_CREATION && <UserCreation />}
                </div>
            </div>
        </div>
    )
}
