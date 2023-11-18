"use client";

import { useState } from "react";
import { Switch } from "@headlessui/react";
import styles from "@/styles/Forms.module.css";
import clsx from "clsx";

type FormElementProps = SimpleComponentProps & {
  name: string;
  label?: string;
  description?: string;
  toggle?: boolean;
  defaultVisible?: boolean;
};

/**
 *
 */
export const FormElement = ({
  children,
  className,
  name,
  label,
  description,
  toggle,
  defaultVisible,
}: FormElementProps) => {
  const [visible, setVisible] = useState(
    defaultVisible !== undefined ? defaultVisible : !!toggle,
  );

  return (
    <div className={clsx(styles.element, className)}>
      <div className={styles.head}>
        {!!label && (
          <label htmlFor={name}>
            <p className={styles.label}>{label}</p>
          </label>
        )}

        {!!toggle && (
          <Switch
            checked={visible}
            onChange={setVisible}
            className={clsx(
              !visible ? "bg-blue-500" : "bg-gray-300",
              "relative inline-flex h-5 w-11 items-center rounded-full",
            )}
          >
            <span className="sr-only">Toggle option</span>
            <span
              className={clsx(
                "inline-block rounded-full bg-white",
                !visible ? "translate-x-2" : "-translate-x-2",
                "h-3 w-3 transform transition",
              )}
            />
          </Switch>
        )}
      </div>

      {!!description ? (
        <p className={styles.description}>{description}</p>
      ) : null}

      <div className={!!visible ? "hidden" : "block"}>{children}</div>
    </div>
  );
};
