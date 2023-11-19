import { Metadata } from "next";
import { DashboardMenu } from "@/components/dashboard/sidebar/DashboardMenu";

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Authar - Dashboard",
};

export default async function Layout({ children }: LayoutProps) {
  return (
    <section className="flex">
      <DashboardMenu />

      <main className="container flex-grow bg-white">{children}</main>
    </section>
  );
}
