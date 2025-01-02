import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { TwitterIcons } from "../icons/sidebar/twitter-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";

import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import { TemplatesIcon } from "../icons/sidebar/templates-icon";
import NextLink from "next/link";
import { MappingIcon } from "../icons/sidebar/mapping-icon";
import { WebhookIcon } from "../icons/sidebar/webhook-icon";


export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full mt-[50%]">
          <div className={Sidebar.Body()}>

            <SidebarItem
                isActive={pathname === "/templates"}
                title="Templates"
                icon={<TemplatesIcon />}
                href="templates"
              />

            <SidebarItem
                isActive={pathname === "/webhooks"}
                title="Webhooks"
                icon={<WebhookIcon />}
                href="webhooks"
              />

              <SidebarItem
                isActive={pathname === "/mapping"}
                title="Mapping"
                icon={<MappingIcon />}
                href="mapping"
              />

              <SidebarItem
                isActive={pathname === "/tweets"}
                title="Tweets"
                icon={<TwitterIcons />}
                href="tweets"
              />

              <SidebarItem
                isActive={pathname === "/accounts"}
                title="Users"
                icon={<AccountsIcon />}
                href="accounts"
              />

              <SidebarItem
                isActive={pathname === "/docs"}
                title="Docs"
                icon={<AccountsIcon />}
                href="docs"
              />
              
            {/* <SidebarItem
                isActive={pathname === "/mappings"}
                title="Mapping"
                icon={<TemplatesIcon />}
                href="mappings"
              />
            </SidebarMenu> */}

          </div>
          <div className={Sidebar.Footer()}>
          <Tooltip content={"Configuration"} color="primary">
              <NextLink
                href="/configurations"
                className="text-default-900 active:bg-none max-w-fit"
              >
                <div
                  className="flex items-center justify-center p-2 rounded-xl hover:bg-default-100 transition-all duration-150 cursor-pointer"
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setCollapsed();
                    }
                  }}
                >
                  <SettingsIcon />
                </div>
              </NextLink>
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
