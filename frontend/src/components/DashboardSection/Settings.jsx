import React from "react";
import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <div className="bg-white h-[400px] flex flex-col justify-center items-center text-center px-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
        <SettingsIcon className="w-8 h-8 text-blue-600" />
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Settings Under Construction
      </h2>
      <p className="text-gray-600 max-w-md">
        This section is coming soon! 🚧 <br />
        We're working to make your experience even better. Please check back
        later.
      </p>
    </div>
  );
}
