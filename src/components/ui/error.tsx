export interface ErrorProps {
    error?: string
}

export function Error(props: ErrorProps)
{
    if(!props.error) return null;
    return ( <p className="text-left text-red-600 w-full text-xs">{props.error}</p>)
}