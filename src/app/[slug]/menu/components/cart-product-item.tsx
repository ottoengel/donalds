import Image from "next/image";
import { CartContext, CartProduct } from "../context/cart";
import { formatCurrency } from "@/helpers/format-currency";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
    product: CartProduct
} 

const CartProductItem = ({product}: CartItemProps) => {
    const {decreaseProductQuantity} = useContext(CartContext)
    return ( 
        <div className="flex items-center justify-between">
                {/* ESQUERDA */}
            <div className="flex items-center gap-3">
            <div className="relative h-20 w-20 bg-gray-100 rounded-xl">
                <Image src={product.imageUrl} alt={product.name} fill/>
            </div>

            <div className="space-y-1">
                <p className="text-xs max-w-[90%] truncate text-ellipsis">{product.name}</p>
                <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>
                {/* QUATIDADE */}
                <div className="flex items-center gap-1 text-center">
                    <Button variant="outline" className="h-7 w-7 rounded-lg" onClick={() => decreaseProductQuantity(product.id)}>
                        <ChevronLeftIcon />
                    </Button>
                    <p className="text-xs w-7">{product.quantity}</p>
                    <Button variant="destructive" className="h-7 w-7 rounded-lg">
                        <ChevronRightIcon />
                    </Button>
                </div>
            </div>
            </div>
            {/* BOTÃO DEE DELETAR */}
            <Button className="h-7 w-7 rounded-lg" variant="outline">
                <TrashIcon />
            </Button>
        </div>
     );
}
 
export default CartProductItem;