import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { BundleResponse, getBundles } from "../../utils/apiService";
import CreateBundle from "./CreateBundle";
import UpdateBundle from "./UpdateBundle";

/**
 * Renders a component that displays a list of bundles with their details such as id, title, availability, price, start date, and end date.
 * Allows users to update or create new bundles.
 * Calculates the price of each bundle based on quantity and discount.
 * Handles the logic for updating and canceling bundle updates.
 * Triggers a reload when necessary.
 *
 * @returns JSX.Element
 */
const Bundles = () => {
  const [bundles, setBundles] = useState<BundleResponse[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [editBundle, setEditBundle] = useState<boolean>(false);
  const [bundleId, setBundleId] = useState<number>(0);

  useEffect(() => {
    getBundles().then((bundleList) => setBundles(bundleList));
    setReload(false);
  }, [reload]);

  const getBundlePrice = (bundle: BundleResponse): number => {
    let price = bundle.quantity * bundle.ticket.price;
    if (bundle.discount && bundle.discount > 0)
      price -= price * bundle.discount;
    return price;
  };

  const handleUpdateCancel = (isUpdateCancel: boolean) => {
    isUpdateCancel ? setEditBundle(false) : null;
  };

  const handleReload = (state: boolean) => {
    setReload(state);
  };

  const handleUpdateBundle = (id: number) => {
    setBundleId(id);
    setEditBundle(true);
  };

  return (
    <>
      {editBundle ? (
        <UpdateBundle
          reload={handleReload}
          isCancel={handleUpdateCancel}
          id={bundleId}
        />
      ) : (
        <CreateBundle reload={handleReload} />
      )}
      <div className="form-shadow w-11/12 md:w-3/4 mx-auto my-10 rounded-lg">
        <div className="flex w-full mx-auto text-center bg-blue-500 text-white rounded-t-lg">
          <p className="w-1/6 text-lg font-semibold mx-auto p-2">Id</p>
          <p className="w-1/6 text-lg font-semibold mx-auto p-2">Title</p>
          <p className="w-1/6 text-lg font-semibold mx-auto p-2">Available</p>
          <p className="w-1/6 text-lg font-semibold mx-auto p-2">Price</p>
          <p className="w-1/6 text-lg font-semibold mx-auto p-2">Start</p>
          <p className="w-1/6 text-lg font-semibold mx-auto p-2">End</p>
        </div>
        {bundles?.map((bundle, index) => {
          return (
            <div
              key={index}
              className="p-2 flex w-full mx-auto border-blue-200 border-t-2 cursor-pointer hover:bg-gray-200"
              // onClick={() => handeleUpdatebundle(bundle.id)}
            >
              <div
                className=" text-md md:text-xl space-x-2 md:space-x-5 flex items-center w-full text-center"
                onClick={() => handleUpdateBundle(bundle.id)}
              >
                <p className="w-1/6">{index + 1}</p>
                <p className="w-1/6">{bundle.title}</p>
                <p className="w-1/6">
                  {!bundle.ticket.isAvailable ? (
                    <FaCheckCircle
                      className="w-fit mx-auto"
                      color="lightgreen"
                    />
                  ) : (
                    <FaCircleXmark className="w-fit mx-auto" color="red" />
                  )}
                </p>
                <p className="w-1/6">{getBundlePrice(bundle)}</p>
                <p className="w-1/6">
                  {new Date(bundle.ticket.startDate).toLocaleDateString("fr")}
                </p>
                <p className="w-1/6">
                  {new Date(bundle.ticket.endDate).toLocaleDateString("fr")}
                </p>
              </div>
            </div>
          );
        })}
        {bundles.length < 1 && (
          <h2 className="text-xl w-fit p-2 mx-auto flex items-center">
            No bundles
          </h2>
        )}
      </div>
    </>
  );
};

export default Bundles;
