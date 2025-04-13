import React, { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import html2pdf from 'html2pdf.js';

import {
  CreditCard,
  FileText,
  Download,
  Layers,
  Sun,
  Columns,
  Check,
  X,
} from "lucide-react";
import { ClassicTemplate } from "../templates/classicTemplate";
import { ModernTemplate } from "../templates/modernTemplate";
import { LineItemInput } from "./lineInputItem";
import { EnhancedInput } from "./ui/enhancedInput";


const InvoiceGenerator = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    businessAddress: "",
    clientName: "",
    clientAddress: "",
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    paymentTerms: "",
    termandconditions:"",
    items: [{ description: "", quantity: 1, unitPrice: 0 }],
    taxRate: 0,
    subtotal: 0,
    taxAmount: 0,
    total: 0,
  });

  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const invoiceRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      [name]: name === "description" ? value : parseFloat(value),
    };

    const subtotal = newItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
    const taxAmount = subtotal * (formData.taxRate / 100);
    const total = subtotal + taxAmount;

    setFormData((prev) => ({
      ...prev,
      items: newItems,
      subtotal,
      taxAmount,
      total,
    }));
  };

  const removeLineItem = (index) => {
    if (formData.items.length >= 1) {
      setFormData((prev) => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index),
      }));
    }
  };

  const addLineItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, unitPrice: 0 }],
    }));
  };



  const downloadPDF = async () => {
    const element = invoiceRef.current;
    
    const options = {
      margin: [10, 10, 10, 10], 
      filename: `invoice-${formData.invoiceNumber}.pdf`,
      image: { 
        type: 'jpeg', 
        quality: 1.0 
      },
      html2canvas: { 
        scale: 3,  
        useCORS: true,  
        logging: false,
        dpi: 300, 
        letterRendering: true
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      },
      pagebreak: { mode: 'avoid-all' } 
    };
  
    try {
      await html2pdf().set(options).from(element).save();
    } catch (error) {
      console.error('PDF generation error:', error);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-blue-900 flex justify-center items-center gap-4">
          <FileText size={40} className="text-blue-700" /> Invoice Generator
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
            <h2 className="text-2xl font-bold mb-6 text-blue-900 flex items-center gap-2">
              <CreditCard className="text-blue-700" /> Invoice Details
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <EnhancedInput
                name="businessName"
                placeholder="Business Name"
                value={formData.businessName}
                onChange={handleInputChange}
                icon={CreditCard}
              />
              <EnhancedInput
                name="businessAddress"
                placeholder="Business Address"
                value={formData.businessAddress}
                onChange={handleInputChange}
                icon={FileText}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <EnhancedInput
                name="clientName"
                placeholder="Client Name"
                value={formData.clientName}
                onChange={handleInputChange}
                icon={CreditCard}
              />
              <EnhancedInput
                name="clientAddress"
                placeholder="Client Address"
                value={formData.clientAddress}
                onChange={handleInputChange}
                icon={FileText}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <EnhancedInput
                name="invoiceNumber"
                placeholder="Invoice Number"
                value={formData.invoiceNumber}
                onChange={handleInputChange}
                icon={FileText}
              />
              <EnhancedInput
                type="date"
                name="invoiceDate"
                placeholder="Invoice Date"
                value={formData.invoiceDate}
                onChange={handleInputChange}
                icon={Sun}
              />
              <EnhancedInput
                type="date"
                name="dueDate"
                placeholder="Due Date"
                value={formData.dueDate}
                onChange={handleInputChange}
                icon={Columns}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <EnhancedInput
                name="paymentTerms"
                placeholder="Payment Terms"
                value={formData.paymentTerms}
                onChange={handleInputChange}
                icon={CreditCard}
              />
              <EnhancedInput
                type="number"
                name="taxRate"
                placeholder="Tax Rate (%)"
                value={formData.taxRate}
                onChange={handleInputChange}
                icon={Layers}
              />
            </div>


           

            <div className="mb-4">
              <h3 className="font-bold mb-2 text-blue-900 flex items-center gap-2">
                <Layers className="text-blue-700" /> Line Items
              </h3>
              {formData.items.map((item, index) => (
                <LineItemInput
                  key={index}
                  item={item}
                  index={index}
                  onChange={handleItemChange}
                  onRemove={removeLineItem}
                />
              ))}
              <button
                onClick={addLineItem}
                className="
                  w-full 
                  flex 
                  items-center 
                  justify-center 
                  py-3 
                  bg-blue-50 
                  text-blue-700 
                  rounded-lg 
                  hover:bg-blue-100 
                  transition-colors 
                  duration-300 
                  mt-2
                "
              >
                <Check className="mr-2" /> Add Line Item
              </button>
            </div>

            <div className="mb-4">
              <h3 className="font-bold mb-2 text-gray-700 flex items-center gap-2">
                <Columns /> Select Template
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedTemplate("classic")}
                  className={` ${
                    selectedTemplate === "classic" ? " border-red-400 " : ""
                  }`}
                >
                  <Sun className="mr-2" /> Classic Template
                </button>
                <button
                  onClick={() => setSelectedTemplate("modern")}
                  className={` ${
                    selectedTemplate === "modern" ? "border-red-400" : ""
                  }`}
                >
                  <FileText className="mr-2" /> Modern Template
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <EnhancedInput
                name="termandconditions"
                placeholder="Terms and Conditions"
                value={formData.termandconditions}
                onChange={handleInputChange}
                icon={CreditCard}
              />
            
            </div>
          </div>
          

          <div>
            <div ref={invoiceRef} className="bg-white p-4 rounded-xl shadow-lg">
              {selectedTemplate === "classic" ? (
                <ClassicTemplate formData={formData} />
              ) : (
                <ModernTemplate formData={formData} />
              )}
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={downloadPDF}
                className="btn-primary w-full flex items-center justify-center"
              >
                <Download className="mr-2" /> Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
