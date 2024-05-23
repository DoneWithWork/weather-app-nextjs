"use client";

import { ModeToggle } from "@/components/DropDownTheme";
import { Button } from "@/components/ui/button";
import { github } from "@/utils/Icons";
import { useRouter } from "next/navigation";
import React from "react";
import SearchDialog from "./SearchDialog/SearchDialog";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="w-full py-4 flex items-center justify-between">
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />
        <div className="btn-group">
          <ModeToggle />
          <Button
            className="source-code flex items-center gap-2"
            onClick={() => {
              router.push("https://github.com/DoneWithWork");
            }}
          >
            {github} Source Code
          </Button>
        </div>
      </div>
    </nav>
  );
}
