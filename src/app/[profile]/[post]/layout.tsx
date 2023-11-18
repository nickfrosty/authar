// import { notFound } from "next/navigation";
// import { Metadata, ResolvingMetadata } from "next";
// import { getUserProfile } from "@/lib/queries/users";
// import ProfileFooter from "@/components/profiles/ProfileFooter";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    profile: string;
    post: string;
  };
};

// export async function generateMetadata(
//   { params }: LayoutProps,
//   parent: ResolvingMetadata,
// ): Promise<Metadata> {
//   if (!params.profile) notFound();

//   // get the profile record from the database
//   const profile = await getUserProfile({
//     username: params.profile,
//   });

//   // handle the 404 for no or invalid `profile`
//   if (!profile) notFound();

//   return {
//     title: profile.title
//       ? profile.title
//       : profile.name
//       ? `${profile.name} (@${profile.username})`
//       : `@${profile.username}'`,
//     description:
//       profile.bio ??
//       profile.oneLiner ??
//       `${profile.name} (@${profile.username})`,
//     alternates: {
//       canonical: `/${profile.username}`,
//     },
//   };
// }

export default async function Layout({ children }: LayoutProps) {
  return (
    <>
      {children}

      {/* <ProfileFooter /> */}
    </>
  );
}
