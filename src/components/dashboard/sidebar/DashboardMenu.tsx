import { memo } from "react";

import { AppLogo } from "@/components/core/AppLogo";
import {
  SidebarHeading,
  SidebarLink,
  SidebarUserSelector,
} from "./DashboardMenuItems";

export const DashboardMenu = memo(() => {
  return (
    <aside className="w-72 flex-shrink-0 space-y-4 p-4 flex flex-col bg-slate-50 h-screen border-r border-gray-300">
      <section className="flex items-center justify-between gap-2">
        <AppLogo height={32} />

        {/* <FeatherIcon
          name="LogOut"
          className="flex-shrink-0 place-self-center rotate-180"
        /> */}
      </section>

      <ul className="space-y-1 flex-grow">
        <li>
          <SidebarLink href="/dashboard" icon="Home" label="Home" />
        </li>
        <li>
          <SidebarHeading label="Content" />
        </li>
        <li>
          <SidebarLink href="/dashboard/posts" icon="Feather" label="Posts" />
        </li>
        <li>
          <SidebarLink href="/dashboard/assets" icon="Image" label="Assets" />
        </li>
        <li>
          <SidebarLink href="/dashboard/pages" icon="FileText" label="Pages" />
        </li>

        <li>
          <SidebarHeading label="Manage" />
        </li>
        <li>
          <SidebarLink
            href="/dashboard/subscribers"
            icon="Users"
            label="Subscribers"
          />
        </li>
        <li>
          <SidebarLink
            href="/dashboard/notifications"
            icon="Bell"
            label="Notifications"
          />
        </li>
        <li>
          <SidebarLink
            href="/dashboard/comments"
            icon="MessageSquare"
            label="Comments"
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
        />

        <SidebarUserSelector />
      </section>
    </aside>
  );
});
