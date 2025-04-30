"use client";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NAVBAR_PAGES } from "../../public/mocks/navbar";

const SidebarCustom = () => {
  const links = NAVBAR_PAGES;

  const [open, setOpen] = useState(false);

  return (
    <div className="w-max lg:h-[calc(100dvh-2rem)]">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 rounded-2xl">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? (
              <X className="text-white" />
            ) : (
              <Menu className="text-white" />
            )}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
};

export default SidebarCustom;
