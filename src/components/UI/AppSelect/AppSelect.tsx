import React, { FC } from "react";
import cl from './appSelect.module.scss'; 

interface IAppSelectProps {
    options: {
            value: string
            name:string
        }[]
    
    value: string
    onChange: (e:React.ChangeEvent<HTMLSelectElement>)=> void
}

const AppSelect:FC<IAppSelectProps> = ({options, value, onChange}) => {
    
    return (
        <select  
            className={cl.appSelect}
            value={value} 
            onChange={onChange}
        >
            <option disabled value="">Search in</option>
            {options.map(option => {
                return (
                    <option 
                        key={option.value}
                        value={option.value}
                    >
                        {option.name}
                    </option>
                )
            })}
        </select>
    );
};

export default AppSelect;