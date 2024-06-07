import React from "react";

function TextArea({ label, className, ...props }, ref) {
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={label}>
          {label}
        </label>
      )}
      <textarea
        className={`px-3 py-2 resize-none rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
      />
    </div>
  );
}

export default React.forwardRef(TextArea);
