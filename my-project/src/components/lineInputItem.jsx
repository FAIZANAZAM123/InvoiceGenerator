import { CreditCard, FileText, Layers, X } from "lucide-react";
import { EnhancedInput } from "./ui/enhancedInput";

export const LineItemInput = ({ item, index, onChange, onRemove }) => {
    return (
      <div className="grid grid-cols-12 gap-2 mb-2 items-center">
        <div className="col-span-6">
          <EnhancedInput
            type="text"
            name="description"
            placeholder="Item Description"
            value={item.description}
            onChange={(e) => onChange(index, e)}
            icon={FileText}
          />
        </div>
        <div className="col-span-2">
          <EnhancedInput
            type="number"
            name="quantity"
            placeholder="Qty"
            value={item.quantity}
            onChange={(e) => onChange(index, e)}
            icon={Layers}
          />
        </div>
        <div className="col-span-3">
          <EnhancedInput
            type="number"
            name="unitPrice"
            placeholder="Unit Price"
            value={item.unitPrice}
            onChange={(e) => onChange(index, e)}
            icon={CreditCard}
          />
        </div>
        <div className="col-span-1">
          <button 
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700 transition-colors duration-300 p-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };
  