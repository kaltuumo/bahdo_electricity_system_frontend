import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useInvoice from "../../hooks/invoice/useInvoice";

const InvoiceList = () => {
  const navigate = useNavigate();
  const { invoices, loading, fetchInvoices } = useInvoice();
  const [search, setSearch] = useState("");

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.fullname?.toLowerCase().includes(search.toLowerCase()) ||
      invoice.phone?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchInvoices();
  }, []);

  if (loading) return <p>Loading invoices...</p>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold mb-4 text-white bg-[#2e6f7e] p-3 rounded shadow">
        Invoice Management
      </h1>

      <input
        type="text"
        placeholder="Search by Name or Phone..."
        className="border px-3 py-1 rounded w-full mb-4 text-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto shadow border bg-[#f5f0e9]">
        <table className="min-w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-[#2e6f7e] text-white text-[13px]">
              <th className="px-2 py-2 border">#</th>
              <th className="px-2 py-2 border">Bill No</th>
              <th className="px-2 py-2 border">Macaamiil</th>
              <th className="px-2 py-2 border">Total</th>
              <th className="px-2 py-2 border">Status</th>
              <th className="px-2 py-2 border">Paid</th>
              <th className="px-2 py-2 border">Remaining</th>
              <th className="px-2 py-2 border">Created</th>
              <th className="px-2 py-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredInvoices.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-2 py-2 text-center">
                  No invoices found.
                </td>
              </tr>
            ) : (
              filteredInvoices.map((i, idx) => {
                const usedKwh = Math.max(i.afterRead - i.beforeRead, 0);
                const totalAmount = usedKwh * Number(i.kwhUsed);
                const required = totalAmount - Number(i.discount);
                const remaining = Math.max(required - Number(i.paid), 0);
                const paid = Number(i.paid);

                const rowColor =
                  i.status === "Paid"
                    ? "bg-green-200"
                    : i.status === "Unpaid"
                    ? "bg-red-200"
                    : i.status === "Pending"
                    ? "bg-yellow-200"
                    : "bg-[#f7f3ee]";

                return (
                  <tr
                    key={i._id}
                    className={`${rowColor} hover:bg-[#f1ebe4] border-b border-[#c9c3bd]`}
                  >
                    <td className="px-2 py-1 border">{idx + 1}</td>
                    <td className="px-2 py-1 border">{i.billNo}</td>
                    <td className="px-2 py-1 border">
                      {i.fullname && i.houseNo && i.watchNo
                        ? `${i.fullname} - ${i.houseNo} - ${i.watchNo}`
                        : "-"}
                    </td>
                    <td className="px-2 py-1 border">{totalAmount.toFixed(2)}</td>
                    <td
                      className={`px-2 py-1 border font-semibold ${
                        i.status === "Paid"
                          ? "text-green-700"
                          : i.status === "Unpaid"
                          ? "text-red-700"
                          : "text-yellow-700"
                      }`}
                    >
                      {i.status}
                    </td>
                    <td className="px-2 py-1 border">{paid.toFixed(2)}</td>
                    <td className="px-2 py-1 border">{remaining.toFixed(2)}</td>
                    <td className="px-2 py-1 border">
                      {i.createdDate && i.createdTime
                        ? `${i.createdDate} ${i.createdTime}`
                        : "-"}
                    </td>
                    <td className="px-2 py-1 border flex gap-1 text-base">
                      <span
                        className="cursor-pointer text-orange-600"
                        onClick={() =>
                          navigate("/customer-update", { state: { electric: i } })
                        }
                      >
                        ✏️
                      </span>
                      <span
                        className="cursor-pointer text-blue-600"
                        onClick={() =>
                          navigate("/invoice-payment", { state: { invoice: i } })
                        }
                      >
                        👁️
                      </span>
                      <span
                        className="cursor-pointer text-green-600"
                        onClick={() => {
                          if (i.status === "Paid") {
                            alert("💵 Lacagta waa la bixiyay!");
                          } else {
                            navigate("/receipt-payment", { state: { invoice: i } });
                          }
                        }}
                      >
                        💰
                      </span>
                      {i.status === "Pending" && (
                        <span
                          className="cursor-pointer text-yellow-600"
                          onClick={() =>
                            navigate("/receipt-payment", { state: { invoice: i } })
                          }
                        >
                          ➡️
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList;
