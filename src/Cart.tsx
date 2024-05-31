import NavBar from "./components/NavBar";
import { useCallback, useEffect, useState } from "react";
import { ItemCart, getCartUser } from "./utils/CartService";
import { useAuth } from "./providers/AuthProvider";
import ItemCartTable from "./components/utils/ItemCartTable";
import Footer from "./components/page_components/Footer";
import { IoArrowBack } from "react-icons/io5";
import NoItemMascotte from "./assets/mascottes/MASCOTTES_JO.png";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
const Cart = () => {
  const { user } = useAuth();
  const [userCart, setUserCart] = useState<ItemCart[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  const getCart = useCallback(() => {
    if (user.id) getCartUser().then((items) => setUserCart(items));
  }, [user.id]);

  const handleReload = () => {
    setReload(true);
  };

  useEffect(() => {
    getCart();
    setReload(false);
  }, [getCart, reload]);

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-between h-screen">
        <div className="md:w-5/6 mx-auto">
          <p
            onClick={() => {
              history.go(-1);
            }}
          >
            <IoArrowBack
              size={30}
              className="m-5 hover:scale-110 transform transition duration-300"
            />
          </p>
          {userCart.length ? (
            <>
              <h1 className="text-5xl md:my-10 my-14 max-md:text-center font-bold">My cart</h1>
              <div className="md:w-2/4">
                <ItemCartTable items={userCart} reload={handleReload} />
              </div>
            </>
          ) : (
            <div className="relative top-1/4 py-2 w-fit mx-auto h-full flex flex-col items-center">
              <MdOutlineRemoveShoppingCart
                size={60}
                className="w-fit mx-auto"
              />
              <h2 className="text-blue-500 text-2xl w-fit mb-5">
                Your cart is empty
              </h2>
              <img src={NoItemMascotte} alt="phryges"/>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Cart;
