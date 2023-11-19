type LayoutProps = {
  children: React.ReactNode;
  params: {
    post: string;
  };
};

export default async function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}
