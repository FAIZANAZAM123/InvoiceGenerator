import React from "react";

export const ClassicTemplate = ({ formData }) => (
  <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-8 font-sans">
    <div className="flex justify-between items-start mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          {formData.businessName}
        </h2>
        <p className="text-gray-600 mt-1">{formData.businessAddress}</p>
      </div>
      <div className="text-right">
        <h1 className="text-4xl font-extrabold text-blue-600">INVOICE</h1>
        <p className="text-gray-600 mt-2">#{formData.invoiceNumber}</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Bill To</h3>
        <p className="text-gray-600">{formData.clientName}</p>
        <p className="text-gray-600">{formData.clientAddress}</p>
      </div>
      <div className="text-right">
        <div className="space-y-1">
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Invoice Date:</span>{" "}
            {formData.invoiceDate}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Due Date:</span>{" "}
            {formData.dueDate}
          </p>



          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Payment Terms:</span>{" "}
            {formData.paymentTerms}
          </p>
        </div>
      </div>
    </div>

    <table className="w-full mb-8 border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="text-left p-3 text-gray-600 font-medium">
            Description
          </th>
          <th className="text-center p-3 text-gray-600 font-medium">
            Quantity
          </th>
          <th className="text-right p-3 text-gray-600 font-medium">
            Unit Price
          </th>
          <th className="text-right p-3 text-gray-600 font-medium">Total</th>
        </tr>
      </thead>
      <tbody>
        {formData.items.map((item, index) => (
          <tr key={index} className="border-b border-gray-200">
            <td className="p-3 text-gray-800 break-all">{item.description}</td>

            <td className="p-3 text-center text-gray-600">{item.quantity}</td>
            <td className="p-3 text-right text-gray-600">
              ${item.unitPrice.toFixed(2)}
            </td>
            <td className="p-3 text-right font-semibold text-gray-800">
              ${(item.quantity * item.unitPrice).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="ml-auto max-w-xs">
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Subtotal:</span>
        <span className="font-semibold">${formData.subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Tax ({formData.taxRate}%):</span>
        <span className="font-semibold">${formData.taxAmount.toFixed(2)}</span>
      </div>
      <div className="flex justify-between border-t pt-3 border-gray-300">
        <span className="text-xl font-bold text-gray-800">Total:</span>
        <span className="text-xl font-bold text-blue-600">
          ${formData.total.toFixed(2)}
        </span>
      </div>
    </div>



    <p className="text-center text-gray-600 mt-8 italic">
      {formData.termandconditions}
    </p>
    <p className="text-center text-gray-600 mt-8 italic">
      We appreciate your prompt payment!
    </p>
  </div>
);

export default ClassicTemplate;
