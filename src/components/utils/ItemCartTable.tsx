import { FormEvent, useEffect, useState } from "react";
import ItemCartCard from "../page_components/ItemCartCard";
import {
  ItemCart,
  deleteItemInCart,
  getCartUser,
} from "../../utils/CartService";
import { IoLockClosed } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { proceedPayement } from "../../utils/apiService";
import InvoiceDetails from "../page_components/InvoiceDetails";
import { ClipLoader } from "react-spinners";

interface ItemCartProps {
  items: ItemCart[] | [];
  reload: (isReaload: boolean) => void;
}

/**
 * Renders a table displaying the items in the cart along with their details and provides functionality to delete items from the cart.
 *
 * @param {ItemCartProps} items - The list of items in the cart to be displayed in the table.
 *
 * @returns {JSX.Element} JSX element representing the cart table with item details and delete functionality.
 */
const ItemCartTable = ({ items, reload }: ItemCartProps) => {
  const [itemsList, setItemsList] = useState<ItemCart[]>(items);
  const [total, setTotal] = useState<number>(0);
  const [validPaiement, setValidPaiement] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let totalItems = 0;
    itemsList.forEach((item) => (totalItems += item.price * item.quantity));
    setTotal(totalItems);
  }, [items, itemsList]);

  const handleDeleteItem = async (itemId: number) => {
    const isDelete = await deleteItemInCart(itemId);
    if (isDelete) getCartUser().then((data) => setItemsList(data));
    reload(true);
  };

  const handleReload = (state: boolean) => {
    reload(state);
  };

  const handlePayement = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await proceedPayement();
    if (response) {
      setValidPaiement(true);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex space-x-4 items-center">
        <ClipLoader />
        <p>Payement in progress...</p>
        </div>
      ) : (
        <>
          {validPaiement ? (
            <InvoiceDetails itemsList={itemsList} amount={total} />
          ) : (
            <div className="flex flex-col md:flex-row space-y-2 rounded-lg text-blue-500 cart-shadow overflow-hidden">
              <div className="md:w-3/4">
                {itemsList.map((item, index) => {
                  return (
                    <div
                      className={`flex flex-col items-start ${
                        index != items.length - 1 ? "border-b-2" : ""
                      } border-blue-300 w-full`}
                    >
                      <div
                        className="w-fit self-start transition duration-300 cursor-pointer hover:bg-red-500 hover:text-white text-red-200 t p-1 rounded-br-lg"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <TiDelete />
                      </div>

                      <div className="p-4 w-full">
                        <ItemCartCard item={item} reload={handleReload} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="md:w-2/5 md:border-l-2 max-md:border-t-2  border-blue-300 ">
                <p className="font-bold text-blue-500 mx-2 text-center text-lg max-md:mt-4">
                  Order summary
                </p>

                <p className="font-bold text-blue-500 w-fit mx-auto my-2">
                  Total: {total} €
                </p>
                <form
                  method="post"
                  onSubmit={handlePayement}
                  className="my-5 px-2 w-fit mx-auto rounded-sm flex items-center space-x-2 bg-blue-500 text-white"
                >
                  <button type="submit" className="p-1 w-fit rounded-sm">
                    Checkout
                  </button>
                  <IoLockClosed />
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ItemCartTable;
