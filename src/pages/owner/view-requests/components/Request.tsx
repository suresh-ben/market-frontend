import React, { useCallback } from 'react'
import { rightArrow } from '../../../../assets/images'
import PrimaryButton from '../../../../components/PrimaryButton'
import { STOCK_REQUEST_STATUS } from '../../../../config/constants';
import { AxiosError } from 'axios';
import useAxiosPrivate from '../../../../hooks/useOwnerAxiosPrivate';
import { acceptStockUpdateRequest, rejectStockUpdateRequest } from '../services/api';
import { toast } from 'react-toastify/unstyled';
import Loading from '../../../../components/Loading';
import useUserData from '../../../../hooks/useOwnerUserData';

export default function Request({ request, loadAllStocks }: { request: any, loadAllStocks: () => void }): React.JSX.Element  {

    const { userData } = useUserData();
    const axiosPrivate = useAxiosPrivate();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleOnAcceptRequest = useCallback(async () => {
        try {
            console.log({userData, axiosPrivate});

            setIsLoading(true);
            await acceptStockUpdateRequest(axiosPrivate, request._id);
            toast.success("Request accepted successfully.");

            await loadAllStocks();
        } catch (error) {
            if(error instanceof AxiosError)
                toast.error(error?.response?.data?.message || "Failed to load requests. Please try again.");
        } finally{
            setIsLoading(false);
        }
    }, [axiosPrivate, request._id, loadAllStocks]);

    const handleOnRejectRequest = useCallback(async () => {
        try {
            setIsLoading(true);
            await rejectStockUpdateRequest(axiosPrivate, request._id);
            toast.success("Request rejected successfully.");

            await loadAllStocks();
        } catch (error) {
            if(error instanceof AxiosError)
                toast.error(error?.response?.data?.message || "Failed to load requests. Please try again.");
        } finally{
            setIsLoading(false);
        }
    }, [axiosPrivate, request._id, loadAllStocks]);

    return (
        <div className='bg-white p-4 w-full rounded-sm flex-shrink-0'>
            {isLoading && <Loading />}
            <p className='font-medium text-lg'>Country: {request?.stock?.country?.name}  |  Product: {request?.stock.product.name}</p>

            <div className='flex justify-between items-center my-6'>
                <div className='flex'>
                    <p>Request created by: </p>
                    <div className='flex flex-col'>
                        <p className='ml-4'>{request?.requestedBy.name}</p>
                        <p className='ml-4'>{request?.requestedBy.email}</p>
                    </div>
                </div>

                <div className='flex flex-col justify-end items-end gap-4'>
                    <div className='flex gap-2 items-center'>
                        <p>Quantity:</p>
                        
                        <div className={`flex gap-2 items-center ${request?.status == STOCK_REQUEST_STATUS.PENDING? "min-w-[14rem]": "min-w-[4rem]"}`}>
                            {
                                request?.status == STOCK_REQUEST_STATUS.PENDING && <>
                                    <div className='border rounded-sm px-2 min-w-[4rem] h-[2rem] flex justify-center items-center'>
                                        <p className='text-center'>{request?.stock.quantity || 0}</p>
                                    </div>

                                    <img 
                                        src={rightArrow}
                                        className='h-[1.5rem] aspect-square'
                                    />
                                </>
                            }

                            <div className='border rounded-sm px-2 min-w-[4rem] h-[2rem] flex justify-center items-center'>
                                <p className='text-center'>{request?.updatedQuantity}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <p>Price:</p>
                        
                        <div className={`flex gap-2 items-center ${request?.status == STOCK_REQUEST_STATUS.PENDING? "min-w-[14rem]": "min-w-[4rem]"}`}>
                            {
                                request?.status == STOCK_REQUEST_STATUS.PENDING && <>
                                    <div className='border rounded-sm px-2 min-w-[4rem] h-[2rem] flex justify-center items-center'>
                                        <p className='text-center'>{request?.stock.price || 0}</p>
                                    </div>

                                    <img 
                                        src={rightArrow}
                                        className='h-[1.5rem] aspect-square'
                                    />
                                </>
                            }

                            <div className='border rounded-sm px-2 min-w-[4rem] h-[2rem] flex justify-center items-center'>
                                <p className='text-center'>{request?.updatedPrice}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <div className='w-full flex justify-between items-end'>
                <p className='text-xs'>Requested on: {
                    new Date(request?.createdAt)
                        .toLocaleString('en-IN', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                    })}
                </p>

                {
                    request?.status == STOCK_REQUEST_STATUS.PENDING && <div className='flex justify-end items-center gap-4'>
                        <div className='w-[15rem]'>
                            <PrimaryButton 
                                label='Accept Request'
                                onClick={handleOnAcceptRequest}
                            />
                        </div>

                        <div className='w-[15rem]'>
                            <PrimaryButton 
                                primaryColor='white'
                                secondaryColor='white'
                                primaryColorHover='white'
                                secondaryColorHover='white'
                                color='black'
                                tailwindClasses='border'
                                label='Reject Request'
                                onClick={handleOnRejectRequest}
                            />
                        </div>
                    </div>
                }

                {
                    request?.status == STOCK_REQUEST_STATUS.REJECTED && <div className='flex justify-end items-center gap-4'>
                        <p className='text-customRed text-xl p-4'>Rejected</p>
                    </div>
                }

                {
                    request?.status == STOCK_REQUEST_STATUS.APPROVED && <div className='flex justify-end items-center gap-4'>
                        <p className='text-customGreen text-xl p-4'>Accepted</p>
                    </div>
                }
            </div>
        </div>
    )
}
