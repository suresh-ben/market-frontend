import { useState } from 'react';
import Info from './FieldInfo';

type InputProps = {
    name: string,
    rows?: number,
    disabled?: boolean,
    marginClass?: string,
    paddingClass?: string,
    tailwindClasses?: string,
    placeholder?: string,
    label?: string,
    message?: string,
    isErrRequired? :boolean,
    errorMessage?: string,
    inputFormatter?: (val: string) => string,
    onChange?: (val: string) => unknown,
    isFieldImportant? :boolean,
    defaultValue?: string
}

const TextArea = ({
    name, 
    rows=3,
    disabled=false,
    marginClass='mx-auto',
    paddingClass="px-2 py-[.35rem]",
    tailwindClasses='',    
    placeholder='',
    label='',
    message='',
    isErrRequired=true,
    errorMessage='',
    inputFormatter,
    onChange,
    isFieldImportant=false,
    defaultValue=""
    }: InputProps) => {
    
    const [isHowering, setIsHowering] = useState<boolean>(false);
    const [isInFocus, setIsInFocus] = useState<boolean>(false);

    const [value, setValue] = useState<string>(defaultValue);

    return (
        <div 
            className={`w-full flex flex-col ${marginClass}`}
        >
            {
                label && <div className='flex items-center pb-sm'>
                    <label htmlFor={name} className={`${!message && 'flex-1 flex text-sm'} ${message && 'mr-1'}`}>{label}<span className='text-customRed'>{isFieldImportant? '*' : ''}</span></label>
                    {message && <Info message={message} />}
                </div>
            }
            <textarea 
                name={name} 
                id={name}
                value={value} 
                onChange={e => {
                    const formattedValue = inputFormatter? inputFormatter(e.target.value) : e.target.value;
                    e.target.value = formattedValue;

                    setValue(formattedValue);
                    onChange && onChange(formattedValue);
                }} 
                placeholder={placeholder}
                className={`rounded-xs border disabled:cursor-not-allowed disabled:bg-customGrey-150 ${tailwindClasses} ${paddingClass} ${errorMessage? 'border-customRed' : `${(isHowering || isInFocus)? 'border-customBlue' : 'border-customGrey-500'}`}`}
                disabled={disabled}

                onFocus={() => setIsInFocus(true)}
                onBlur={() => setIsInFocus(false)}
                onMouseEnter={() => setIsHowering(true)}
                onMouseLeave={() => setIsHowering(false)}
                autoComplete='off'
                rows={rows}
            />
            {
                isErrRequired && <div className={`flex items-center`}>
                    <p className='text-customRed flex-1 text-xs'>{errorMessage}&nbsp;</p>
                </div>
            }
        </div>
    );
}

export default TextArea;
