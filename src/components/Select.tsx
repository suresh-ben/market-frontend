import React, { useEffect, useState } from 'react';
import Info from './FieldInfo';

type SelectProps = {
    name: string,
    label?: string,
    options: Array<{key: string, value: string}>,
    message?: string,
    marginClass?: string,
    paddingClass?: string
    tailwindClasses?: string,
    placeHolder?: string,
    isErrRequired?: boolean,
    errorMessage?: string,
    disabled?: boolean,
    isFieldImportant?:boolean,
    onChange: (event: string) => void,
    defaultValue?: string
}

const Select = ({
    name="", 
    label="",
    message="",
    marginClass='mx-auto',
    paddingClass='py-2',
    tailwindClasses='',  
    placeHolder='--Chooose an option--',
    isErrRequired=false,
    errorMessage="",
    options=[],
    disabled=false,
    isFieldImportant=false,
    onChange,
    defaultValue=""
    }: SelectProps): React.JSX.Element => {


    //value
    const [value, setValue] = useState<string | number>(defaultValue);
    
    //styling
    const [isHowering, setIsHowering] = useState(false);
    const [isInFocus, setIsInFocus] = useState(false);
        
    const [optionsList, setOptionsList] = useState([{key: placeHolder, value: ''}, ...options]);
    useEffect(() => {
        if(!options || options?.length === 0) return;
            setOptionsList([{key: placeHolder, value: ''}, ...options]);
    }, [options]);

    return (
        <div 
            className={`w-full flex flex-col ${marginClass}`}
        >
            {
                label && <div className='flex items-center pb-sm'>
                    <label htmlFor={name} className={`${!message && 'flex-1 flex'} ${message && 'mr-2'}`}>{label}<span className='text-veotsRed'>{isFieldImportant? '*' : ''}</span></label>
                    {message && <Info message={message} />}
                </div>
            }
            <select 
                name={name} 
                id={name}
                value={value} 
                disabled={disabled}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }} 
                className={`rounded-xs border disabled:bg-veotsGrey-150 ${disabled && "bg-gray-200"} ${errorMessage? 'border-veotsRed' : `${(isHowering || isInFocus)? 'border-veotsBlue' : 'border-veotsGrey-500'}`} ${value? 'text-black' : 'text-gray-500'} ${tailwindClasses} ${paddingClass}`}
                
                onBlur={() => setIsInFocus(false)}
                onFocus={() => setIsInFocus(true)}
                onMouseEnter={() => setIsHowering(true)}
                onMouseLeave={() => setIsHowering(false)}
            >
                {
                    optionsList && optionsList.map((option, ind) => {
                        return <option key={ind} value={option?.value} >{option?.key}</option>
                    })
                }
            </select>
            {isErrRequired && <p className='text-veotsRed text-md'>{errorMessage}&nbsp;</p>}
        </div>
    );
}

export default Select;
