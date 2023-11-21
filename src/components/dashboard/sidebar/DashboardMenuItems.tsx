"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { STATIC_USER } from "@/data";

import {
  FeatherIcon,
  type FeatherIconName,
} from "@/components/core/FeatherIcon";

type SidebarHeadingProps = {
  className?: string;
  label: string;
  icon?: FeatherIconName;
  hideLabel?: boolean;
};

export const SidebarHeading = memo(
  ({ label, icon, hideLabel = false }: SidebarHeadingProps) => {
    return (
      <h5 className="flex h-8 uppercase gap-2 font-semibold items-center py-2 text-xs mt-3 text-gray-500">
        {typeof icon !== "undefined" && (
          <FeatherIcon
            name={icon}
            className="flex-shrink-0 place-self-center"
          />
        )}

        <span className={clsx(!!hideLabel && "md:hidden")}>{label}</span>
        <div className={clsx(!!hideLabel && " md:border-t w-full h-1")}></div>
      </h5>
    );
  },
);

type SidebarLinkProps = {
  className?: string;
  href: string;
  label: string;
  icon: FeatherIconName;
  hideLabel?: boolean;
};

export const SidebarLink = memo(
  ({ href, icon, label, className, hideLabel = false }: SidebarLinkProps) => {
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

        <span className={clsx(!!hideLabel && "md:hidden")}>{label}</span>
      </Link>
    );
  },
);

type SidebarUserSelectorProps = {};

export const SidebarUserSelector = memo(({}: SidebarUserSelectorProps) => {
  return (
    <section className="border flex items-center gap-3 border-gray-300 bg-white p-2 rounded-md shadow-sm">
      <Image
        src={STATIC_USER.image}
        alt={STATIC_USER.name}
        className="flex-shrink-0 rounded-full w-9 h-9"
      />

      <div className="space-y-0 flex-grow">
        <h5 className="text-base font-semibold line-clamp-1">
          {STATIC_USER.name}
        </h5>
        <p className="text-gray-400 text-xs line-clamp-1">
          @{STATIC_USER.username}
        </p>
      </div>

      <FeatherIcon
        name="MoreVertical"
        className="flex-shrink-0 place-self-center"
      />
    </section>
  );
});
