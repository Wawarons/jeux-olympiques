import { ChangeEvent, FormEvent, useState } from "react";
import { ItemCart, updateItemInCart } from "../../utils/CartService";
import { IoCheckmark } from "react-icons/io5";

export interface ItemCartProps {
  item: ItemCart;
}

/**
 * Functional component for rendering an item card in the cart.
 * 
 * @param {ItemCartProps} item - The item object containing details like id, title, quantity, and price.
 * @returns {JSX.Element} - Returns the JSX element for the item card with title, quantity input, price, and update button.
 */
const ItemCartCard = ({ item }: ItemCartProps) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleStateQuantity = async (event: FormEvent) => {
    event.preventDefault();
    const isUpdate = await updateItemInCart(item.id, quantity);
    console.log(isUpdate);
    if (isUpdate) history.go(0);
  };

  return (
    <>
      <div className="flex w-full items-center align-middle justify-between space-x-5">
        <h3 className="w-[50px] text-lg font-bold">{item.title}</h3>
        <div className="w-fit mx-auto">
          <form action="post" onSubmit={handleStateQuantity}>
            <input
              type="number"
              placeholder={quantity.toString()}
              min={1}
              max={100}
              className="w-[70px] cart-quantity-shadow p-1 rounded-sm"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                parseInt(e.target.value) > 0 &&
                  setQuantity(parseInt(e.target.value));
              }}
            />
            <button type="submit" className="mx-2">
              <IoCheckmark />
            </button>
          </form>
        </div>
        <p>{item.price} €</p>
      </div>

      <p>x{quantity}</p>
    </>
  );
};

export default ItemCartCard;
