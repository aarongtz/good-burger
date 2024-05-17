import { AiOutlineLoading } from "react-icons/ai";

interface LoadingProps {
    className?: string;
}

export const Loading = ({className}: LoadingProps) => {
  return (
    <div className={`${className} w-full text-center text-white`}>
        <div className="w-full text-center">
            <AiOutlineLoading size={50} className="inline animate-spin" />
        </div>
        <div className="text-center">
            Loading
        </div>
    </div>
  )
}
