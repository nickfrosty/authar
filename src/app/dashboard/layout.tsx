import { Metadata } from "next";
import { SITE } from "@/lib/const/general";
import DashboardLayout from "@/layout/DashboardLayout";

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: `${SITE.name} - Dashboard`,
};

export default async function Layout({ children }: LayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
