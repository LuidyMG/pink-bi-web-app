export interface OutputProps {
    label: string,
    children: React.ReactNode
}

export function Output({ label, children } : OutputProps)
{
    return (<div className="flex flex-col w-full gap-1 border-b-[1px] border-gray-200">
        <p className="text-xs text-gray-600">{label}</p>
        <p className="text-base">{children || <span>&nbsp;</span>}</p>
    </div>)
}