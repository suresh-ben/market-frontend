import React from 'react';
import ROUTES from '../routes/routes';
import { unAuthorized } from '../../assets/images';

function UnAuthorized(): React.JSX.Element {
    return (
        <div className='w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
            <div className='mx-5 flex items-center gap-4'>
                <div className='flex justify-start'>
                    <img src={unAuthorized} alt="Unauthorized" className='h-[6rem]' />
                </div>
                <div>
                    <h1 className='w-full text-2xl font-black'>UNAUTHORIZED TO ACCESS</h1>
                    <p className='w-full text-xl font-semibold'>You are not authorized to visit this page</p>
                    <div className='w-full my-3'>
                        <button onClick={() => window.location.href = ROUTES.OWNER_LOGIN} className='p-1 px-6 border border-[#50AFF8] text-[#50AFF8] rounded-full text-sm'>
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UnAuthorized