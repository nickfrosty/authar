"use client";

import { memo, useEffect, useState } from "react";
import clsx from "clsx";

import { AppLogo } from "@/components/core/AppLogo";
import {
  SidebarHeading,
  SidebarLink,
  SidebarUserSelector,
} from "./DashboardMenuItems";
import { FeatherIcon } from "@/components/core/FeatherIcon";
import { usePathname } from "next/navigation";

export const DashboardMenu = memo(
  ({ className = "" }: SimpleComponentProps) => {
    const pathName = usePathname();
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
      setShowMenu(false);
    }, [pathName]);

    return (
      <>
        <header className="md:hidden fixed top-0 w-full bg-white border-b border-gray-300">
          <div className="py-2 px-4 flex items-center justify-between gap-2">
            <AppLogo height={32} />

            <button
              type="button"
              className="p-2"
              onClick={() => setShowMenu(!showMenu)}
            >
              <FeatherIcon
                name="LogOut"
                className={clsx(
                  "flex-shrink-0 place-self-center",
                  //
                  !!showMenu && "rotate-180",
                )}
              />
            </button>
          </div>
        </header>

        {/* {!!showMenu && (
          <div
            onClick={() => setShowMenu(false)}
            className={"overlay"}
            aria-hidden="true"
          />
        )} */}

        <aside
          className={clsx(
            className,
            "flex-shrink-0 top-0 left-0 space-y-4 p-4 pt-2 md:pt-4 flex flex-col bg-slate-50 border-r border-gray-300",
            "h-screen min-h-screen max-h-screen overflow-y-auto w-full",
            "md:w-[18rem] sticky",
            // support the collapsible sidebar for a cleaner dashboard UI
            !!showMenu && "md:max-w-fit",
            //
            showMenu ? "h-screen" : "hidden md:flex",
          )}
        >
          <section className="flex items-center justify-between gap-2">
            <AppLogo
              href={"/dashboard"}
              height={32}
              className={clsx(!!showMenu && "md:hidden")}
            />

            <button
              type="button"
              className="p-2"
              onClick={() => setShowMenu(!showMenu)}
            >
              <FeatherIcon
                name="LogOut"
                className={clsx(
                  "flex-shrink-0 place-self-center",
                  !showMenu && "rotate-180",
                )}
              />
            </button>
          </section>

          <ul className="space-y-1 flex-grow">
            <li>
              <SidebarLink
                href="/dashboard"
                icon="Home"
                label="Home"
                hideLabel={showMenu}
              />
            </li>
            <li>
              <SidebarHeading label="Content" hideLabel={showMenu} />
            </li>
            <li>
              <SidebarLink
                href="/dashboard/posts"
                icon="Feather"
                label="Posts"
                hideLabel={showMenu}
              />
            </li>
            <li>
              <SidebarLink
                href="/dashboard/assets"
                icon="Image"
                label="Assets"
                hideLabel={showMenu}
              />
            </li>
            <li>
              <SidebarLink
                href="/dashboard/pages"
                icon="FileText"
                label="Pages"
                hideLabel={showMenu}
              />
            </li>

            <li>
              <SidebarHeading label="Manage" hideLabel={showMenu} />
            </li>
            <li>
              <SidebarLink
                href="/dashboard/subscribers"
                icon="Users"
                label="Subscribers"
                hideLabel={showMenu}
              />
            </li>
            <li>
              <SidebarLink
                href="/dashboard/notifications"
                icon="Bell"
                label="Notifications"
                hideLabel={showMenu}
              />
            </li>
            <li>
              <SidebarLink
                href="/dashboard/comments"
                icon="MessageSquare"
                label="Comments"
                hideLabel={showMenu}
              />
            </li>
            {/* <li>
              <SidebarLink href="/dashboard" icon="Layout" label="Design" />
            </li> */}
          </ul>

          <section className="border-t border-gray-200 pt-3 space-y-2">
            <SidebarLink
              href="/settings"
              icon="Settings"
              label="Settings"
              className=""
              hideLabel={showMenu}
            />

            {/* <SidebarUserSelector /> */}
          </section>
        </aside>
      </>
    );
  },
);
