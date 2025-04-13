import { useState } from "react";

export const EnhancedInput = ({ 
    type = 'text', 
    name, 
    placeholder, 
    value, 
    onChange, 
    className = '', 
    icon: Icon,
    ...props 
  }) => {
    const [isFocused, setIsFocused] = useState(false);
  
    return (
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {Icon && (
            <Icon 
              className={`w-5 h-5 ${
                isFocused 
                  ? 'text-blue-600' 
                  : 'text-gray-400 group-hover:text-gray-600'
              } transition-colors duration-300`} 
            />
          )}
        </div>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full 
            pl-10 
            pr-3 
            py-3 
            rounded-lg 
            border 
            ${isFocused 
              ? 'border-blue-500 ring-2 ring-blue-200' 
              : 'border-gray-300 hover:border-gray-400'
            }
            bg-white 
            text-gray-800 
            focus:outline-none 
            transition-all 
            duration-300 
            placeholder-gray-400
            ${className}
          `}
          {...props}
        />
      </div>
    );
  };