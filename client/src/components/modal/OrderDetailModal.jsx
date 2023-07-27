import React, { useEffect, useMemo, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Table from "../table/Table";
import { formatDate, orderStatusOptions } from "../utils/helper";
import Select from "react-select";
import Currency from "../utils/Currency";

const OrderDetailModal = ({
  isOpen,
  onClose,
  orderDetails,
  onUpdateStatus,
  onDeleteOrder,
}) => {
  const [newOrderStatus, setNewOrderStatus] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowY = "auto";
      setNewOrderStatus("");
    };
  }, [isOpen]);
  const orderColumns = useMemo(() => {
    return [
      {
        header: "Description",
        accessorKey: "description",
      },
      {
        header: "Order Quantity",
        accessorKey: "quantity",
      },
      {
        header: "Order Total",
        accessorKey: "price",
      },
    ];
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-2/5 p-6 max-h-80vh w-80%">
        <button
          onClick={() => {
            onClose();
          }}
          className="relative text-gray-600 hover:text-gray-800 rounded-lg focus:outline-none"
        >
          <IoMdClose />
        </button>
        <h2 className="text-2xl text-center font-semibold mb-4">
          Order Details
        </h2>

        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transform transition-transform">
          <div className="mb-2">
            <p>
              <span className="text-l font-semibold">Order ID:</span>{" "}
              {orderDetails.orderId}
            </p>
            <p>
              <span className="text-l font-semibold">Customer Name:</span>{" "}
              {orderDetails.orderCustomerName}
            </p>
            <p>
              <span className="text-l font-semibold">Order Date:</span>{" "}
              {formatDate(orderDetails.orderDate)}
            </p>
            <p className="flex justify-start ">
              <span className="text-l font-semibold ">Order Total:</span>{" "}
              <Currency price={orderDetails.orderTotal} />
            </p>
            <div className="flex items-center">
              <span className="text-l font-semibold">Order Status:</span> &nbsp;
              {orderDetails.orderStatus}
              <Select
                defaultValue={newOrderStatus}
                onChange={setNewOrderStatus}
                className="ml-5"
                options={orderStatusOptions(orderDetails.orderStatus)}
              />
            </div>
            <span className="text-l font-semibold">Order Details:</span>{" "}
            <div className="container">
              <Table
                data={orderDetails.orderDetails}
                columns={orderColumns}
                itemsPerPage={orderDetails.orderDetails.length}
                paginated={false}
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
            onClick={() => {
              onUpdateStatus(orderDetails, newOrderStatus);
              onClose();
            }}
          >
            Update Status
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={() => {
              onDeleteOrder(orderDetails);
              onClose();
            }}
          >
            Delete Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
