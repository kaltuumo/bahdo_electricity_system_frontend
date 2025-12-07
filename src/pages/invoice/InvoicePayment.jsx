import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import logo from '../../assets/images/logo.png'; // hubi path-ka logo

export default function InvoiceGenerator({ filename = "invoice" }) {
  const invoiceRef = useRef(null);

  // Sample invoice data
  const invoice = {
    billNo: "INV-20251207-001",
    fullname: "Axmed Ali Mohamud",
    phone: "+252 61 234 5678",
    houseNo: "H-12",
    area: "Zone A",
    zone: "Jubadda Hoose",
    watchNo: "W-07",
    totalAmount: 200,
    paidAmount: 180,
    status: "Pending",
    createdDate: "2025-12-07",
    kwhUsed: 100,
    rate: 2,
    items: [
      { desc: "Electricity Usage (kWh)", unit: 100, rate: 2, amount: 200 },
    ],
  };

  // Company info
  const company = {
    name: "Bahdo Electricity Co.",
    logo: logo, // logo image
    address: "123 Energy St, Hargeisa",
    phone: "+252 61 000 000",
    email: "info@bahdoelectricity.com",
    website: "www.bahdoelectricity.com",
  };

  // Calculate remaining amount
  const getRemaining = (total, paid) => {
    const t = Number(total) || 0;
    const p = Number(paid) || 0;
    const rem = t - p;
    return rem <= 0 ? 0 : rem;
  };

  const rem = getRemaining(invoice.totalAmount, invoice.paidAmount);

  // Download as PDF
  const handleDownloadPdf = async () => {
    if (!invoiceRef.current) return;
    const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pageWidth - 40;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 20, 20, imgWidth, imgHeight);
    pdf.save(`${filename}.pdf`);
  };

  // Download as Excel
  const handleDownloadExcel = () => {
    const sheetData = [
      ["Field", "Value"],
      ["Invoice No", invoice.billNo],
      ["Customer Full Name", invoice.fullname],
      ["Phone", invoice.phone],
      ["House No", invoice.houseNo],
      ["Area/Zone", invoice.area + " / " + invoice.zone],
      ["Watch No", invoice.watchNo],
      ["Total Amount", invoice.totalAmount],
      ["Paid Amount", invoice.paidAmount],
      ["Remaining", rem],
      ["Status", invoice.status],
      ["Created Date", invoice.createdDate],
    ];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(wb, ws, "Invoice");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), `${filename}.xlsx`);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Buttons */}
      <div className="flex justify-end gap-3 mb-4">
        <button
          onClick={handleDownloadExcel}
          className="px-4 py-2 rounded-md border shadow-sm text-sm bg-white hover:bg-gray-50"
        >
          Export Excel
        </button>
        <button
          onClick={handleDownloadPdf}
          className="px-4 py-2 rounded-md border shadow-sm text-sm bg-[#2e6f7e] text-white hover:opacity-90"
        >
          Download PDF
        </button>
      </div>

      {/* Invoice card */}
      <div
        ref={invoiceRef}
        className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-200"
        style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img
              src={company.logo}
              alt="logo"
              style={{ height: 150, width: "auto" }}
              className="object-contain"
            />
            <div>
              <h2 className="text-lg font-bold">{company.name}</h2>
              <p className="text-sm text-gray-600">{company.address}</p>
              <p className="text-sm text-gray-600">{company.phone} • {company.email}</p>
              <p className="text-sm text-gray-600">{company.website}</p>
            </div>
          </div>
          <div className="text-right">
            <h3 className="text-2xl font-extrabold text-[#2e6f7e]">INVOICE</h3>
            <div className="mt-1 text-sm text-gray-600">#{invoice.billNo}</div>
            <div className="mt-1 text-sm text-gray-600">{invoice.createdDate}</div>
          </div>
        </div>

        <hr className="border-gray-200 mb-6" />

        {/* Customer & Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Bill To</h4>
            <div className="text-sm font-medium">{invoice.fullname}</div>
            <div className="text-sm text-gray-600">Phone: {invoice.phone}</div>
            <div className="text-sm text-gray-600">House: {invoice.houseNo}</div>
            <div className="text-sm text-gray-600">Area/Zone: {invoice.area} / {invoice.zone}</div>
            <div className="text-sm text-gray-600">Watch No: {invoice.watchNo}</div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Summary</h4>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-medium">{invoice.totalAmount}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Paid</span>
              <span className="font-medium">{invoice.paidAmount}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Remaining</span>
              <span className={`font-semibold ${rem === 0 ? "text-green-600" : "text-red-600"}`}>{rem}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-gray-600">Status</span>
              <span className={`font-semibold px-3 py-1 rounded-full ${invoice.status === "Paid" ? "bg-green-100 text-green-700" : invoice.status === "Unpaid" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                {invoice.status}
              </span>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full text-sm border-collapse mb-6">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-3 py-2 border border-gray-200">Description</th>
              <th className="text-right px-3 py-2 border border-gray-200">Unit</th>
              <th className="text-right px-3 py-2 border border-gray-200">Rate</th>
              <th className="text-right px-3 py-2 border border-gray-200">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((it, idx) => (
              <tr key={idx} className="odd:bg-white even:bg-gray-50">
                <td className="px-3 py-2 border border-gray-200">{it.desc}</td>
                <td className="px-3 py-2 border border-gray-200 text-right">{it.unit}</td>
                <td className="px-3 py-2 border border-gray-200 text-right">{it.rate}</td>
                <td className="px-3 py-2 border border-gray-200 text-right">{it.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer Notes */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex justify-between items-start gap-4 mb-6">
            <div className="text-sm text-gray-600">
              <div className="font-semibold mb-1">Notes</div>
              <div>Mahadsanid isticmaalka adeegeena. Fadlan bixinta hore si looga fogaado jarista korontada.</div>
            </div>
          </div>

          {/* Signature Section */}
          <div className="grid grid-cols-2 gap-4 mt-6 text-center">
            <div>
              <div className="text-sm font-semibold">Authorized by (Electricity Officer)</div>
              <div className="h-16 border-b border-gray-400 mt-2"></div>
            </div>
            <div>
              <div className="text-sm font-semibold">Received by (Customer)</div>
              <div className="h-16 border-b border-gray-400 mt-2"></div>
            </div>
          </div>

          {/* Contact Footer */}
          <div className="text-center text-sm text-gray-600 mt-6">
            <p>Phone: {company.phone} | Email: {company.email} | Website: {company.website}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
