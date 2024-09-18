import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    children?: React.ReactNode,
    register?: UseFormRegisterReturn
}

export function Input({children, register, ...props} : InputProps){
    return (
        <div className="flex flex-col gap-1 relative w-full">
            <input {...register} placeholder={props.label} {...props} className={`rounded-md border border-gray-300 focus:outline-none focus:border-violet-500 p-2 ${children ? "pl-10" : ""} ${props.className ? props.className : ""}`} ></input>
            <div className="text-gray-300 absolute bottom-0 p-2">{children}</div>
        </div>
    );
}