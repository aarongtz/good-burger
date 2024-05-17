import { BurgerItem } from "@/typings"
import Image from "next/image"
import Link from "next/link";

interface BurgerCardProps {
    burger: BurgerItem
}

export const BurgerCard = ({ burger }: BurgerCardProps) => {
    const { description, image, name, slug } = burger;
    return (
        <div role="card-burger" data-testid="burger-card" className="relative shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="h-80 overflow-hidden bg-gray-500">
                <Image priority width={100} height={100} className="w-full h-full object-cover" src={image} alt={`Product "${name}" image`} />
            </div>
            <div className="px-5 py-5">
                <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white mb-4">{name}</h3>
                <div className="flex items-center justify-between">
                    <p className="text-gray-900 dark:text-white">
                        {description}
                    </p>
                </div>
            </div>
            <Link href={`/burgers/${slug}`} data-testid="burger-card-link" className="absolute w-full h-full top-0 left-0"></Link>
        </div>
    )
}
