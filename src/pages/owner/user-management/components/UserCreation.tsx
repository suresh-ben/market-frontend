import React, { useEffect, useState } from 'react'
import Input from '../../../../components/Input'
import TextArea from '../../../../components/TextArea'
import PrimaryButton from '../../../../components/PrimaryButton'
import isValidEmail from '../../../../utils/isValidEmail'
import generatePassword from '../../../../utils/passwordGenerator'
import { createManager } from '../services/api'
import useAxiosPrivate from '../../../../hooks/useOwnerAxiosPrivate'
import UserCreationPopup from './../components/UserCreationPopup'
import generateManagerUserId from '../../../../utils/generateManagerUserId'
import Loading from '../../../../components/Loading'
import { toast } from'react-toastify'
import { AxiosError } from 'axios'

export default function UserCreation(): React.JSX.Element {

    const axiosPrivate = useAxiosPrivate();

    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [managerUserId, setManagerUserId] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [countryName, setCountryName] = useState<string>("");
    const [countryDescription, setCountryDescription] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isUserCreatedPopupOpen, setIsUserCreatedPopupOpen] = useState<boolean>(false);

    const [nameError, setNameError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [countryNameError, setCountryNameError] = useState<string>("");
    const [countryDescriptionError, setCountryDescriptionError] = useState<string>("");

    useEffect(() => {
        setNameError("");
    }, [name])

    useEffect(() => {
        setEmailError("");
    }, [email])

    useEffect(() => {
        setCountryNameError("");
    }, [countryName])

    useEffect(() => {
        setCountryDescriptionError("");
    }, [countryDescription])

    const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!name || name.length < 3) {
            setNameError("Name should be at least 3 characters long");
            return;
        }

        if(!email ||!isValidEmail(email)) {
            setEmailError("Please provide a valid Email address");
            return;
        }

        if(!countryName || countryName.length < 3) {
            setCountryNameError("Country name should be at least 3 characters long");
            return;
        }

        if(countryDescription.length > 200) {
            setCountryDescriptionError("Country description should be less than or equal to 200 characters");
            return;
        }

        // generate a secure random password
        const _password = generatePassword(12);
        setPassword(_password);

        // generate a unique manager user ID
        const _managerUserId = generateManagerUserId();
        setManagerUserId(_managerUserId);
        
        try {
            setIsLoading(true);
            
            await createManager(axiosPrivate, countryName, countryDescription, name, email, _password, _managerUserId);
            setIsUserCreatedPopupOpen(true);

            setName('');
            setNameError('');
            setEmail('');
            setEmailError('');
            setCountryName('');
            setCountryNameError('');
            setCountryDescription('');
            setCountryDescriptionError('');
        } catch (error: unknown) {
            if(error instanceof AxiosError)
                toast.error(error?.response?.data?.message || "Failed to login. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {isLoading && <Loading />}
            <UserCreationPopup 
                managerName={name}
                password={password}
                countryName={countryName}
                isOpen={isUserCreatedPopupOpen}
                onClose={() => setIsUserCreatedPopupOpen(false)}
                userId={managerUserId}
            />

            <form className='bg-white p-6 w-full rounded-sm shadow-lg'
                onSubmit={handleCreateProduct}
            >
                {
                    !isLoading && <>
                        <Input 
                            label='Manager name'
                            name='name'
                            defaultValue={name}
                            onChange={setName}
                            isErrRequired
                            errorMessage={nameError}
                        />

                        <Input 
                            label='Manager EmailID'
                            name='email'
                            defaultValue={email}
                            onChange={setEmail}
                            isErrRequired
                            errorMessage={emailError}
                        />

                        <Input 
                            label='Country Name'
                            name='countryName'
                            defaultValue={countryName}
                            onChange={setCountryName}
                            isErrRequired
                            errorMessage={countryNameError}
                        />

                        <TextArea 
                            label='Country Description (optional, max 200 characters)'
                            name='countryDescription'
                            defaultValue={countryDescription}
                            onChange={setCountryDescription}
                            isErrRequired
                            errorMessage={countryDescriptionError}
                        />

                        <div className='flex justify-end items-end'>
                            <div className='w-[15rem]'>
                                <PrimaryButton 
                                    label='Create Manager'
                                    type="submit"
                                />
                            </div>
                        </div>
                    </>
                }
            </form>
        </>
    )
}
