import { Loader } from "lucide-react";
import React from "react";

export default function DeletePopup({ open, onClose, onConfirm, loading }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm ">
      <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Delete Product</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this product?
        </p>
        <div className="flex justify-end gap-4">
          <button
            disabled={loading}
            onClick={onClose}
            className="px-4 py-2 text-red-600 hover:underline font-medium"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={onConfirm}
            className="px-4 py-2 bg-green-600 text-white rounded 
             hover:bg-green-700 
             disabled:hover:bg-green-400 
             disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader className="animate-spin" />
                Deleting...
              </div>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
