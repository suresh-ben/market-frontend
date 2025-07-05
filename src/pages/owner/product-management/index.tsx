import React from 'react'
import Header from '../../../components/OwnerHeader'
import Sidebar from '../../../components/OwnerSidebar'
import CreateProduct from './components/CreateProduct'

const PRODUCT_MANAGEMENT_TYPES = {
    CREATE_PRODUCT: 'CREATE_PRODUCT',
    PRODUCT_MANAGEMENT: 'PRODUCT_MANAGEMENT',
}

export default function Index(): React.JSX.Element {

    const [productManagementType, setProductManagementType] = React.useState(PRODUCT_MANAGEMENT_TYPES.CREATE_PRODUCT);

    return (
        <div className='flex flex-col w-screen h-screen'>
            <Header />
            <div className='flex-1 flex bg-gray-300'>
                <Sidebar />

                <div className='w-full p-10'>
                    <div className='bg-white flex mb-5 gap-2 p-2'>
                        <button onClick={() => setProductManagementType(PRODUCT_MANAGEMENT_TYPES.CREATE_PRODUCT)} className={`p-2 border hover:bg-amber-100 ${productManagementType == PRODUCT_MANAGEMENT_TYPES.CREATE_PRODUCT && "underline shadow-2xl border-2 border-blue-500"}`}>Product Creation</button>

                        <button onClick={() => setProductManagementType(PRODUCT_MANAGEMENT_TYPES.PRODUCT_MANAGEMENT)} className={`p-2 border hover:bg-amber-100 ${productManagementType == PRODUCT_MANAGEMENT_TYPES.PRODUCT_MANAGEMENT && "underline shadow-2xl border-2 border-blue-500"}`}>Product Management</button>
                    </div>

                    {productManagementType === PRODUCT_MANAGEMENT_TYPES.CREATE_PRODUCT && <CreateProduct />}
                </div>
            </div>
        </div>
    )
}
