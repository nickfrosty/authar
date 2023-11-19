import MarketingHeader from "@/components/marketing/MarketingHeader";
import { ProfileHero } from "@/components/profile/ProfileHero";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { STATIC_USER, STATIC_POST } from "@/data";
import { HorizontalPostCard } from "@/components/posts/HorizontalPostCard";
// import { getUserProfile } from "@/lib/queries/users";

type PageProps = {
  params: {
    profile: string;
  };
};

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  if (!params.profile) notFound();

  const profile = STATIC_USER;

  // handle the 404 for no or invalid `profile`
  if (!profile) notFound();

  return {
    title: `${profile.name} (@${profile.username})`,
    description: profile.bio ?? `${profile.name} (@${profile.username})`,
    alternates: {
      canonical: `/${profile.username}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  if (!params.profile) notFound();

  // get the product's record from the database
  // const profile = await getUserProfile({
  //   username: params.profile,
  //   // include: { people: true },
  // });

  // if (!profile) notFound();

  return (
    <>
      <MarketingHeader />

      <main className="profile-container">
        <ProfileHero />

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
