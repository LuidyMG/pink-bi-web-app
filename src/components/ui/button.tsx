import { InputHTMLAttributes } from "react";

export interface ButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
    label: string,
    children?: React.ReactNode
}

export function Button({children, ...props} : ButtonProps)
{
    return (
        <button {...props} className={`bg-violet-500 border border-violet-500 text-white rounded-md p-2 w-full ${props.className}`}>
            {children}
            {props.label}
        </button>
    );
}