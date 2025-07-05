import React from 'react'
import type { Country } from '../@types/Country'
import type { Product } from '../@types/Product'

export default function Market({ countries, products, stocks }: { countries: Country[], products: Product[], stocks: any[] }): React.JSX.Element {
    
    console.log(stocks)
    
    return (
        <div className='w-full h-full bg-white rounded-sm flex overflow-y-auto'>
            <div className='flex flex-col w-[20rem] border-r min-h-full'>
                <div className='p-4 text-center border-b h-[6rem] flex justify-center items-center'><h4 className='text-xl font-semibold'>Countries</h4></div>
                {
                    countries?.map((country, ind) => {
                        return <div key={ind} className='p-4 border-b text-center'><p>{country.name}</p></div>
                    })
                }
            </div>

            <div className='min-h-full overflow-x-scroll max-w-[calc(100vw-40rem)]'>
                <div className='w-full h-full flex overflow-x-auto flex-nowrap'>
                    {
                        products?.map((product, ind) => {
                            return <div key={ind} className="flex flex-col w-[22rem] h-full border-r flex-shrink-0">
                                <div className=' text-center border-b h-[6rem] flex flex-col'>
                                    <h4 className='p-4 text-xl font-semibold'>{product.name}</h4>

                                    <div className='flex-1 flex border-t'>
                                        <div key={ind} className='py-2 flex justify-center items-center text-center w-1/2 border-r'><p>Quantity (Kg/Lit)</p></div>
                                        <div key={ind} className='py-2 flex justify-center items-center text-center w-1/2'><p>Price ($)</p></div>
                                    </div>
                                </div>
                                {
                                    countries?.map((country, index) => {
                                        return <div key={index} className='flex'>
                                            <div key={ind} className='p-4 border-b text-center w-1/2 border-r'><p>{stocks.filter(stock => stock.countryName == country.name)[0]?.stocks[0]?.quantity}&nbsp;</p></div>
                                            <div key={ind} className='p-4 border-b text-center w-1/2'><p>{stocks.filter(stock => stock.countryName == country.name)[0]?.stocks[0]?.price}&nbsp;</p></div>
                                        </div>
                                    })
                                }
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
