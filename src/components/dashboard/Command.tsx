import { useEffect, useState } from "react";
import { InvoiceItem, getAllInvoiceItems } from "../../utils/apiService";
import 'chart.js/auto';

const Command = () => {
    const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);


  useEffect(() => {
    const fetchInvoiceItems = async () => {
      const invoiceItemList = await getAllInvoiceItems();
      const itemMap = new Map();

      invoiceItemList.forEach((item) => {
        if (!itemMap.has(item.itemName)) {
          itemMap.set(item.itemName, item.quantity);
        } else {
          const quantity = itemMap.get(item.itemName);
          itemMap.set(item.itemName, quantity + item.quantity);
        }

      });

      const updatedInvoiceItems = Array.from(itemMap.entries()).map(
        ([itemName, quantity]) => ({
          itemName,
          quantity,
        })
      );

      setInvoiceItems(updatedInvoiceItems);
    };

    fetchInvoiceItems();
  }, []);

  const getTotalSells = (invoiceItems: InvoiceItem[]): number => {
    let total = 0;
    invoiceItems.forEach((item) => 
        total += item.quantity);

    return total;
  }

  return (
    <div className="w-fit mx-auto">
      <div className="text-center space-y-5">
        <h2 className="text-5xl my-10">Total</h2>
        <p className="text-5xl text-blue-500 shadow-border p-4 rounded-full">{getTotalSells(invoiceItems)}</p>
      </div>
      <div className="flex space-x-10 my-20">
        {
            invoiceItems.map((item) => {
                return (
                <div key={item.id} className="text-2xl flex flex-col items-center">
                    <p className="text-xl">{item.quantity}</p>
                    <h2 className="text-blue-500">{item.itemName}</h2>
                </div>
            )
            })
        }
        </div>
    </div>
  );
};

export default Command;
