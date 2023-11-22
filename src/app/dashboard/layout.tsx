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
    <section className="md:flex flex-row">
      <DashboardMenu />

      <section className="flex-grow bg-white mt-[56px] md:mt-0">
        {children}
      </section>
    </section>
  );
}
