import React, { useState } from "react";
import Currency from "../utils/Currency";
import OrderDetailModal from "../modal/OrderDetailModal";
import { formatDate } from "../utils/helper";

const Table = ({
  data,
  columns,
  itemsPerPage,
  paginated,
  updateOrderStatus,
  deleteOrder,
  isSearchEnabled,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orderDetails, setOrderDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = data.filter((row) => {
    if (isSearchEnabled) {
      return (
        row?.orderId?.toString().includes(searchQuery.toLowerCase()) ||
        row?.orderCustomerName
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        row?.orderTotal
          ?.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        row?.orderStatus?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      return row;
    }
  });

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const getCellValues = (row, column) => {
    switch (column.accessorKey) {
      case "orderId":
        return (
          <p>
            <a
              onClick={() => {
                openModal();
                setOrderDetails(row);
              }}
              className="cursor-pointer text-blue-600 hover:underline"
            >
              {row[column.accessorKey]}
            </a>
          </p>
        );
      case "orderDate":
        return formatDate(row[column.accessorKey]);
      case "orderTotal":
        return <Currency price={row[column.accessorKey]} />;
      default:
        return row[column.accessorKey];
    }
  };

  return (
    <div className="w-full">
      {isSearchEnabled && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      )}
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column) => (
              <th
                key={column.header}
                className="px-4 py-2 text-left font-semibold text-gray-700"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-blue-100"
              }
            >
              {columns.map((column, columnIndex) => (
                <td
                  key={columnIndex}
                  className="px-4 py-2 text-gray-700 border "
                >
                  {getCellValues(row, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {paginated && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 mr-2 bg-blue-500 text-white rounded disabled:opacity-25"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-25"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      <OrderDetailModal
        orderDetails={orderDetails}
        onUpdateStatus={updateOrderStatus}
        onDeleteOrder={deleteOrder}
        isOpen={modalOpen}
        onClose={closeModal}
      ></OrderDetailModal>
    </div>
  );
};

export default Table;
