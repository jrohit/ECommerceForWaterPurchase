import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, fetchAllOrders, updateOrder } from "./orderSlice";
import Table from "../table/Table";
import LoadingSpinner from "../loading/Loading";

const OrderList = () => {
  const { orderList, loading } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, []);

  const updateOrderStatus = (order, orderStatus) => {
    dispatch(updateOrder({ order, orderStatus }));
  };

  const deleteOrderDb = (order) => {
    // Implement the logic to cancel the order
    dispatch(deleteOrder({ order }));
  };

  const orderColumns = useMemo(() => {
    return [
      {
        header: "Order Id",
        accessorKey: "orderId",
      },
      {
        header: "Order Status",
        accessorKey: "orderStatus",
      },
      {
        header: "Customer Name",
        accessorKey: "orderCustomerName",
      },
      {
        header: "Date",
        accessorKey: "orderDate",
      },
      {
        header: "Order Total",
        accessorKey: "orderTotal",
      },
    ];
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Order List</h1>
      <div className="container mx-auto p-4">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Table
            data={orderList}
            isSearchEnabled={true}
            columns={orderColumns}
            itemsPerPage={5}
            paginated={true}
            updateOrderStatus={updateOrderStatus}
            deleteOrder={deleteOrderDb}
          />
        )}
      </div>
    </div>
  );
};

export default OrderList;
