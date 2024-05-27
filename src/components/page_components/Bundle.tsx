import { FormEvent, useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { TicketProps, addItemInCart } from "../../utils/CartService";
import { useAuth } from "../../providers/AuthProvider";

type BundleProps = {
  id: number;
  title: string;
  description: string;
  quantity: number;
  discount: number;
  ticket: TicketProps;
};

/**
 * Renders a Bundle component with the provided props.
 * Calculates the price based on the quantity, discount, and ticket price.
 * Handles adding the item to the cart if the user is authenticated.
 * 
 * @param {BundleProps} props - The props for the Bundle component.
 * @returns {JSX.Element} JSX element representing the Bundle component.
 */
const Bundle = ({
  id,
  title,
  description,
  quantity,
  discount,
  ticket,
}: BundleProps) => {
  const { user } = useAuth();
  const [price, setPrice] = useState<number | null>(null);
  const [needLogin, setNeedLogin] = useState<boolean>(false);
  const [addedToCart, setAddedtoCart] = useState<boolean>(false);

  useEffect(() => {
    const priceBundle = ticket.price * quantity;
    setPrice(priceBundle - (discount ? discount * priceBundle : 0));
  }, [discount, quantity, ticket.price]);

  const handleAddInCart = (event: FormEvent) => {
    event.preventDefault();
    if (user.isAuth && user.id) {
        addItemInCart(id, quantity);
        setAddedtoCart(true);
        setTimeout(() => {
          setAddedtoCart(false);
        }, 1500);
    } else {
      setNeedLogin(true);
      setTimeout(() => {
        setNeedLogin(false);
      }, 5000);
    }
  };

  return (
    <>
      <div
        id={`formula_${id}`}
        className="border-2 p-4 w-[350px] h-full rounded-lg bg-blue-400 space-y-4 shadow-xl transition duration-300  text-white cursor-pointer"
      >
        <div className="flex items-center w-full justify-between space-x-4">
          <h3 className="text-3xl text-white font-bold">{title}</h3>
          <h3 className="text-2xl rounded-full p-1 shadow-inner">{price} €</h3>
        </div>
        <p className="text-md">{description}</p>

        <form
          method="post"
          className="w-fit mx-auto"
          onSubmit={handleAddInCart}
        >
          <button
            type="submit"
            value=""
            className="p-2 bg-white rounded-full shadow-lg hover:shadow-none text-blue-500"
          >
            {!needLogin ? (
              addedToCart ? (
                <p>+1 {title} in your cart</p>
              ) : (
                <MdAddShoppingCart />
              )
            ) : (
              <a href="/register">Login</a>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Bundle;
