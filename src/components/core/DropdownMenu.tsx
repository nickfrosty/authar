"use client";

import clsx from "clsx";
import { ButtonHTMLAttributes, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FeatherIcon, FeatherIconName } from "@/components/core/FeatherIcon";

type MoreOptionsDropdownProps = {
  /** slot that contains all the dropdown items */
  children: React.ReactNode;
  /** configurable options for the dropdown menu's primary button */
  button?: {
    className?: string;
    icon?: FeatherIconName;
    label?: string | React.ReactNode;
  };
};

/**
 *
 */
export const DropdownMenu = ({
  button,
  children,
}: MoreOptionsDropdownProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className={clsx("inline-flex", button?.className)}>
          {button?.label && button.label}

          <FeatherIcon
            name={button?.icon || "MoreVertical"}
            // className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={clsx(
            "absolute right-0 mt-2 w-full min-w-[14rem] origin-top-right rounded-md",
            "border border-gray-100 shadow-lg",
            "bg-white ring-1 ring-black/5 focus:outline-none",
            "divide-y divide-gray-200",
          )}
        >
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

/**
 *
 */
export const DropdownSection = ({
  className,
  children,
}: SimpleComponentProps) => {
  return <div className={clsx("px-1 py-1", className)}>{children}</div>;
};

// DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
// &&
type DropdownItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  icon?: FeatherIconName;
  iconSide?: "left" | "right";
};

/**
 *
 */
export const DropdownItem = ({
  icon,
  label,
  iconSide = "left",
  ...props
}: DropdownItemProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={clsx(
            "group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm",
            iconSide == "right" ? "justify-between" : "justify-start",
            active ? "bg-gray-100 text-black" : "text-gray-900",
          )}
          {...props}
        >
          {typeof icon !== "undefined" && iconSide == "left" && (
            <FeatherIcon name={icon} aria-hidden="true" size={18} />
          )}

          {label && label}

          {typeof icon !== "undefined" && iconSide == "right" && (
            <FeatherIcon name={icon} aria-hidden="true" size={18} />
          )}
        </button>
      )}
    </Menu.Item>
  );
};
