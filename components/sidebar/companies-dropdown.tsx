"use client";

import React from "react";

interface Company {
  name: string;
  location: string;
  logo: React.ReactNode;
}

export const CompaniesDropdown = () => {

  return (
    <div className="flex items-center gap-2">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
              TwitX
            </h3>
            
          </div>
        </div>
  );
};
