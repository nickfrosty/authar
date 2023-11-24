import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SITE } from "@/lib/const/general";
import { getUserProfile } from "@/lib/queries/users";
import { getPostsForUser } from "@/lib/queries/posts";

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

  // get the listing of the user's most recent posts
  const posts = await getPostsForUser({
    uid: profile.user.uid,
  });

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

        {Array.isArray(posts) && posts.length > 0 ? (
          <section className="grid gap-4">
            {posts.map((post, key) => (
              <HorizontalPostCard
                key={key}
                title={post.title}
                href={`/${post.user.username}/${post.slug}`}
                date={post.date}
                excerpt={post.excerpt}
                image={post.image}
                // imageAlt={""}
              />
            ))}
          </section>
        ) : (
          <div className="">No posts founds</div>
        )}
      </main>
    </>
  );
}
