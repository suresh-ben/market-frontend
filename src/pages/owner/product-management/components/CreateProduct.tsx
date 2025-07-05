import React, { useEffect } from 'react'
import Input from '../../../../components/Input'
import TextArea from '../../../../components/TextArea'
import PrimaryButton from '../../../../components/PrimaryButton'
import { createProduct } from '../services/api'
import useAxiosPrivate from '../../../../hooks/useOwnerAxiosPrivate'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import Loading from '../../../../components/Loading'

export default function CreateProduct(): React.JSX.Element {

    const axiosPrivate = useAxiosPrivate();
    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [nameError, setNameError] = React.useState<string>('');
    const [descriptionError, setDescriptionError] = React.useState<string>('');

    useEffect(() => {
        setNameError('');
    }, [name]);

    useEffect(() => {
        setDescriptionError('');
    }, [description]);

    const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!name || name.length < 3) {
            setNameError('Please provide a valid product name');
            return;
        }

        if(description.length > 200) {
            setDescriptionError('Please provide a description with a maximum length of 200 characters');
            return;
        }

        try {
            setIsLoading(true);

            await createProduct(name, description, axiosPrivate);

            setName('');
            setDescription('');

            setNameError('');
            setDescriptionError('');

            toast.info('Product created successfully');
        } catch (error: unknown) {
            if(error instanceof AxiosError)
                toast.error(error?.response?.data?.message || "Failed to login. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form 
            className='bg-white p-6 w-full rounded-sm shadow-lg'
            onSubmit={handleCreateProduct}
        >
            {isLoading && <Loading />}
            {
                !isLoading && <>
                    <Input 
                        label='Product Name'
                        name='product'
                        defaultValue={name}
                        onChange={setName}
                        isErrRequired
                        errorMessage={nameError}
                    />

                    <TextArea 
                        label='Description (optional, max 200 characters)'
                        name='description'
                        defaultValue={description}
                        onChange={setDescription}
                        isErrRequired
                        errorMessage={descriptionError}
                    />

                    <div className='flex justify-end items-end'>
                        <div className='w-[15rem]'>
                            <PrimaryButton 
                                label='Create Product'
                                type="submit"
                            />
                        </div>
                    </div>
                </>
            }
        </form>
    )
}
