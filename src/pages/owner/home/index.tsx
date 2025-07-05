import React, { useEffect } from "react"
import Header from "../../../components/OwnerHeader"
import useCountriesAndProducts from "../../../hooks/useCountriesAndProducts"
import Sidebar from "../../../components/OwnerSidebar";
import Market from "../../../components/Market";
import { getAllStocks } from "./services/api";
import useAxiosPrivate from "../../../hooks/useOwnerAxiosPrivate";
import { AxiosError } from "axios";
import Loading from "../../../components/Loading";

export default function Index(): React.JSX.Element {

    const axiosPrivate = useAxiosPrivate();
    const { countriesAndProducts: { countries, products } } = useCountriesAndProducts();

    const [isLoading, setIsLoading] = React.useState(false);
    const [stocks, setStocks] = React.useState<any[]>([]);

    const loadAllStocks = async () => {
        try {
            setIsLoading(true);
            const { stocks: _stocks } = await getAllStocks(axiosPrivate);
            setStocks(_stocks);
        } catch (error) {
            if(error instanceof AxiosError)
                console.error(error?.response?.data?.message || "Failed to load stocks. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        (async () => {
            await loadAllStocks();
        })()
    }, [])

    return (
        <div className="w-screen h-screen flex flex-col">
            {isLoading && <Loading />}
            <Header />

            <div className="h-[calc(100%-4rem)] flex bg-gray-300">
                <Sidebar />
                <div className="w-full p-5">
                    <Market 
                        countries={countries}
                        products={products}
                        stocks={stocks}
                    />
                </div>
            </div>
        </div>
    )
}
