import { PiSealCheckFill } from "react-icons/pi";
import { ItemCart } from "../../utils/CartService";

const InvoiceDetails = ({
  itemsList,
  amount,
}: {
  itemsList: ItemCart[];
  amount: number;
}) => {
  return (
    <div className="flex flex-col space-y-5">
      <PiSealCheckFill size={30} color="lightgreen"/>
      <h3 className="text-2xl my-10">Purchase Confirmation Congratulations!</h3>
      <p>
        Your purchase has been successfully completed. Here are the details of
        your order:
      </p>
      <ul>
        {itemsList.map((item) => {
          return (
            <li>
              <span className="font-bold text-blue-500">
                {item.title} x{item.quantity}:
              </span>{" "}
              <span>{item.price * item.quantity}€</span>
            </li>
          );
        })}
      </ul>
      <p>Total price: {amount}€</p>
      <p>An email containing your tickets has been sent to you.</p>
    </div>
  );
};

export default InvoiceDetails;
