export interface CardProps {
    children: React.ReactNode,
    className?: string
}

export function Card({children, ...props} : CardProps)
{
    return (<div className={`bg-white shadow-md w-full px-5 py-3 rounded-md justify-between border border-gray-200 ${props.className ? props.className : ''}`}>
        {children}
    </div>)
}