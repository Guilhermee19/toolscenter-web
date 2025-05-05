"use client";

import AdComponent from "@/components/ad-component";
import { NAVBAR_PAGES } from "../../public/mocks/navbar";

const Home = () => {
  const link = NAVBAR_PAGES;

  return (
    <div>
      <AdComponent adSlot="XXXX" />

      <div className="relative flex flex-col gap-2 w-full h-full">
        <div className="relative z-20 flex flex-col gap-2 w-full h-full">
          <h1 className="text-4xl font-light text-white">
            Welcome to <strong className="font-bold">ToolsCenter</strong>
          </h1>
          <p className="text-white">
            Select an option from the navbar to get started.
          </p>
        </div>

        <div className="relative z-20 grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {link.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex flex-col items-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-200"
            >
              {item.icon}
              <span className="mt-2 text-white">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
