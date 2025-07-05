import React, { useEffect } from 'react'
import Header from '../../../components/OwnerHeader'
import Sidebar from '../../../components/OwnerSidebar'
import { getAllStockUpdateRequests } from './services/api'
import useAxiosPrivate from '../../../hooks/useOwnerAxiosPrivate'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import Request from './components/Request'
import Loading from '../../../components/Loading'

export default function Index(): React.JSX.Element {

    const axiosPrivate = useAxiosPrivate();
    const [requests, setRequests] = React.useState<any[]>([]);

    const [isLoading, setIsLoading] = React.useState(false);

    const loadAllStocks = async () => {
        try {
            setIsLoading(true);
            const { requests: _requests } = await getAllStockUpdateRequests(axiosPrivate);
            setRequests(_requests);

            console.log(_requests);
        } catch (error) {
            if(error instanceof AxiosError)
                toast.error(error?.response?.data?.message || "Failed to load requests. Please try again.");
        } finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        (async () => {
            await loadAllStocks();
        })();
    }, []);

    return (
        <div className='flex flex-col w-screen h-screen'>
            {isLoading && <Loading />}
            <Header />
            <div className='flex-1 flex bg-gray-300'>
                <Sidebar />

                <div className='w-full h-full p-10'>
                   <div className='w-full h-full flex flex-col overflow-scroll gap-6 flex-nowrap max-h-[calc(100vh-9rem)]'>
                        {
                            requests.map((request, ind) => {
                                return <Request key={ind} 
                                    request={request} 
                                    loadAllStocks={loadAllStocks}
                                />
                            })
                        }
                    </div> 
                </div>
            </div>
        </div>
    )
}