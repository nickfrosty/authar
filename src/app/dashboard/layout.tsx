import { Metadata } from "next";

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}
