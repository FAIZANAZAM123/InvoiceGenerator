import React from "react";
import { FileText, Calendar, MapPin, CreditCard } from "lucide-react";

export const ModernTemplate = ({ formData }) => {

  console.log(formData,"formData")

  return(
    <div className="bg-white p-10 shadow-2xl rounded-2xl border-2 border-blue-100 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 z-0">
      <FileText size={300} style={{ color: "#3B82F6" }} />
    </div>

    <div className="relative z-10">
      <div className="flex justify-between items-center mb-10 pb-4 border-b-2 border-blue-100">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2">
            {formData.businessName}
          </h1>
          <div className="flex items-center text-gray-600 space-x-2">
            <MapPin size={16} style={{ color: "#3B82F6" }} />
            <p className="text-sm">{formData.businessAddress}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-1">INVOICE</h2>
            <div className="flex items-center justify-end space-x-2">
              <FileText size={16} style={{ color: "#ffff" }} />
              <span>#{formData.invoiceNumber}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-10">
        <div>
          <h3 className="text-xl font-semibold text-blue-800 mb-3 border-b pb-2">
            Bill To
          </h3>
          <div className="space-y-1">
            <p className="font-medium text-gray-800">{formData.clientName}</p>
            <div className="flex items-center text-gray-600 space-x-2">
              <MapPin size={14} style={{ color: "#3B82F6" }} />
              <p className="text-sm">{formData.clientAddress}</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="space-y-2 text-gray-700">
            <div className="flex items-center justify-end space-x-2">
              <Calendar size={16} style={{ color: "#3B82F6" }} />
              <span>Invoice Date: {formData.invoiceDate}</span>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <Calendar size={16} style={{ color: "#3B82F6" }} />
              <span>Due Date: {formData.dueDate}</span>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <CreditCard size={16} style={{ color: "#3B82F6" }} />
              <span>Payment Terms: {formData.paymentTerms}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <table className="w-full border-collapse">
          <thead className="bg-blue-50">
            <tr>
              <th className="p-3 text-left text-blue-900 border-b border-blue-200">
                Description
              </th>
              <th className="p-3 text-right text-blue-900 border-b border-blue-200">
                Quantity
              </th>
              <th className="p-3 text-right text-blue-900 border-b border-blue-200">
                Unit Price
              </th>
              <th className="p-3 text-right text-blue-900 border-b border-blue-200">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {formData.items.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-blue-50 transition-colors duration-200"
              >
                <td className="p-3 text-gray-800">{item.description}</td>
                <td className="p-3 text-right text-gray-700">
                  {item.quantity}
                </td>
                <td className="p-3 text-right text-gray-700">
                  ${item.unitPrice.toFixed(2)}
                </td>
                <td className="p-3 text-right font-semibold text-blue-800">
                  ${(item.quantity * item.unitPrice).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-10">
        <div className="w-1/3 bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
          <div className="flex justify-between mb-2 text-gray-700">
            <span>Subtotal:</span>
            <span className="font-semibold">
              ${formData.subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between mb-2 text-gray-700">
            <span>Tax ({formData.taxRate}%):</span>
            <span className="font-semibold">
              ${formData.taxAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between mt-4 pt-4 border-t border-blue-200 font-bold text-xl text-blue-900">
            <span>Total:</span>
            <span>${formData.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-600 mt-8 italic">
        {formData.termandconditions}
      </p>
      <div className="text-center text-gray-500 italic border-t pt-6 border-blue-100">
        <p>
          Thank you for your business! Payment is appreciated before the due
          date.
        </p>
      </div>
    </div>
  </div>
  )
 
};
