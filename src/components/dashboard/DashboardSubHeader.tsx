import { memo } from "react";

type DashboardSubHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export const DashboardSubHeader = memo(
  ({ children, className = "" }: DashboardSubHeaderProps) => {
    return (
      <header className={`p-4 border-b shadow border-gray-300 ${className}`}>
        {children}
      </header>
    );
  },
);
