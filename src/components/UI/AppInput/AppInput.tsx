import React, { FC } from 'react';
import cl from './appInput.module.scss';

interface IInputProps {
    type: string
    name?:string
    placeholder?: string
    value?: string
    id?: string
    required?: boolean
    onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void
}
const AppInput: FC<IInputProps> = (props) => {
    return (
        <input className={cl.appInput} {...props} />
    );
};

export default AppInput;