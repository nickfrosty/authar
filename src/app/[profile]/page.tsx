import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getUserProfile } from "@/lib/queries/users";
import { SITE } from "@/lib/const/general";
import { STATIC_POST } from "@/data";

import MarketingHeader from "@/components/marketing/MarketingHeader";
import { HorizontalPostCard } from "@/components/posts/HorizontalPostCard";
import { ProfileHero } from "@/components/profile/ProfileHero";

type PageProps = {
  params: {
    profile: string;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  if (!params.profile) notFound();

  // get the profile's record from the database
  const profile = await getUserProfile({
    username: params.profile,
  });

  // handle the 404 for no or invalid `profile`
  if (!profile) notFound();

  return {
    title: `${profile.name ?? `@${profile.username}`} - ${SITE.name}`,
    description: profile.bio ?? `${profile.name} (@${profile.username})`,
    alternates: {
      canonical: `/${profile.username}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  if (!params.profile) notFound();

  // get the profile's record from the database
  const profile = await getUserProfile({
    username: params.profile,
  });

  if (!profile) notFound();

  return (
    <>
      <MarketingHeader />

      <main className="profile-container">
        <ProfileHero
          name={profile.name}
          username={profile.username}
          image={profile.image}
          bio={profile.bio}
        />

        <section className="grid gap-4">
          <HorizontalPostCard
            href={STATIC_POST.href}
            date={STATIC_POST.date}
            title={STATIC_POST.title}
            description={STATIC_POST.description}
            imageSrc={STATIC_POST.image}
          />
        </section>
      </main>
    </>
  );
}
