import clsx from "clsx";
import { FeatherIcon, FeatherIconName } from "@/components/core/FeatherIcon";

type IconButtonProps = {
  icon: FeatherIconName;
  active?: boolean;
} & React.ComponentProps<"button">;

export const IconButton = ({
  icon,
  active,
  className,
  ...props
}: IconButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(
        "p-2 rounded-md text-sm hover:bg-gray-900",
        // active ? "" : "",
        className,
      )}
      {...props}
    >
      <FeatherIcon name={icon} size={18} strokeWidth={active ? 3.4 : 1.4} />
    </button>
  );
};
