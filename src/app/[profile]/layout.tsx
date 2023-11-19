type LayoutProps = {
  children: React.ReactNode;
  params: {
    profile: string;
  };
};

// todo: should we check for the existence of the `profile` here?
// it may help prevent trickle down requests on child pages

export default async function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}
