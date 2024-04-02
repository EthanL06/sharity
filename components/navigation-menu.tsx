import React from "react";
import { MainNav } from "./main-nav";
import { Search } from "./search";
import { UserNav } from "./user-nav";
import { ModeToggle } from "./mode-toggle";

type Props = {};

const NavigationMenu = (props: Props) => {
  return (
    <div className="border-b border-border">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-2" />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <UserNav />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
