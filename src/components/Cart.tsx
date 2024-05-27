import NavBar from "./NavBar";
import { useCallback, useEffect, useState } from "react";
import { ItemCart, getCartUser } from "../utils/CartService";
import { useAuth } from "../providers/AuthProvider";
import ItemCartTable from "./utils/ItemCartTable";
import Footer from "./page_components/Footer";
import { IoArrowBack } from "react-icons/io5";
const Cart = () => {
  const { user } = useAuth();
  const [userCart, setUserCart] = useState<ItemCart[]>([]);

  const getCart = useCallback(() => {
    if (user.id) getCartUser().then((items) => setUserCart(items));
  }, [user.id]);

  useEffect(() => {
    getCart();
  }, [getCart]);

  return (
    <>
    <NavBar />
    <div className="flex flex-col justify-between h-screen">
      <div className="md:w-5/6 mx-auto">
        <a href="/">
          <IoArrowBack
            size={30}
            className="m-5 hover:scale-110 transform transition duration-300"
          />
        </a>
        <h1 className="text-5xl my-10">My cart</h1>
        <div className="md:w-2/4">
          <ItemCartTable items={userCart} />
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default Cart;
