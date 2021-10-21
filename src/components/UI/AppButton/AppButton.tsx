import React, { FC, ReactChild, ReactNode } from 'react';
import cl from './appButton.module.scss'

interface IButtonProps {     
    type: any
    onClick?: ()=>void
    children: ReactChild | ReactNode    
}

const AppButton: FC<IButtonProps> = (props) => {
    return (
        <button className={cl.appButton} {...props}>
            {props.children}
        </button>
    );
};

export default AppButton;