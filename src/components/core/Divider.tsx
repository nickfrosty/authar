import { memo } from "react";

export const Divider = memo(
  ({ label, className }: { label?: string; className?: string }) => {
    return (
      <div className={`flex items-center justify-between gap-x-3 ${className}`}>
        <hr className="flex-grow block border-gray-300 h-[1px]" />
        {!!label && (
          <>
            <span className="flex-shrink block text-sm text-gray-500">
              {label}
            </span>
            <hr className="flex-grow block border-gray-300 h-[1px]" />
          </>
        )}
      </div>
    );
  },
);
