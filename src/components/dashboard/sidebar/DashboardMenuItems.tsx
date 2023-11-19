"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import {
  FeatherIcon,
  type FeatherIconName,
} from "@/components/core/FeatherIcon";

import AvatarPic from "@/../public/img/nick.jpg";

type SidebarHeadingProps = {
  className?: string;
  label: string;
  icon?: FeatherIconName;
};

export const SidebarHeading = memo(({ label, icon }: SidebarHeadingProps) => {
  return (
    <h3 className="flex gap-2 font-medium items-center py-2 text-sm mt-3 text-gray-500">
      {typeof icon !== "undefined" && (
        <FeatherIcon name={icon} className="flex-shrink-0 place-self-center" />
      )}

      {label}
    </h3>
  );
});

type SidebarLinkProps = {
  className?: string;
  href: string;
  label: string;
  icon: FeatherIconName;
};

export const SidebarLink = memo(
  ({ href, icon, label, className }: SidebarLinkProps) => {
    return (
      <Link
        href={href}
        className={clsx(
          "group flex gap-3 items-center text-sm p-2 hover:text-black rounded-md text-gray-500 hover:bg-hot-pink hover:bg-opacity-5",
          className,
        )}
      >
        <FeatherIcon
          name={icon}
          className="flex-shrink-0 place-self-center group-hover:text-hot-pink"
        />

        {label}
      </Link>
    );
  },
);

type SidebarUserSelectorProps = {};

export const SidebarUserSelector = memo(({}: SidebarUserSelectorProps) => {
  return (
    <section className="border flex items-center gap-3 border-gray-300 bg-white p-2 rounded-md shadow-sm">
      <Image
        src={AvatarPic}
        alt=""
        className="flex-shrink-0 rounded-full w-9 h-9"
      />

      <div className="space-y-0 flex-grow">
        <h5 className="text-base font-semibold line-clamp-1">Display Name</h5>
        <p className="text-gray-400 text-xs line-clamp-1">@username</p>
      </div>

      <FeatherIcon
        name="MoreVertical"
        className="flex-shrink-0 place-self-center"
      />
    </section>
  );
});
