import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { STATIC_USER } from "@/data";

// import { serialize } from "next-mdx-remote/serialize";
// import MarkdownFormatter from "@/components/MarkdownFormatter";
import { SocialShareButtons } from "@/components/SocialButtons";
import { FormattedDateAgo } from "@/components/core/FormattedDateAgo";

type PageProps = {
  params: {
    profile: string;
    post: string;
  };
};

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // locate the single record
  // locate the current post being requested
  const post: any = null;

  // do nothing if the post was not found
  if (!post) return {};

  // get the parent's images and add the post specific ones to be the first
  const openGraphImages = (await parent).openGraph?.images || [];
  if (post.image) {
    openGraphImages.unshift(`/${"#todo"}/opengraph-image`);
  }

  return {
    alternates: {
      canonical: post.href,
    },
    title: `title`,
    description: post.description,
    openGraph: {
      title: `title`,
      description: post.description,
      // note: `images` will be auto populated by the `opengraph-image` generator
      images: openGraphImages,
    },
  };
}

export default async function Page({ params }: PageProps) {
  if (!params.profile && !params.post) notFound();

  //   // get the product's record from the database
  //   // const profile = await getUserProfile({
  //   //   username: params.profile,
  //   //   // include: { people: true },
  //   // });

  //   // if (!profile) notFound();

  //   return <main className="flex flex-col">profile page</main>;
  // }

  // serialize the markdown content for parsing via MDX
  // const mdxSerialized = await serialize("post content", {
  //   // scope: { }
  // });

  return (
    <main className="page-container max-w-3xl !space-y-4 md:!space-y-6">
      <h1 className="font-bold text-3xl md:text-4xl max-w-5xl">
        <Link href={`#`} className="">
          Post title
        </Link>
      </h1>

      <section className="flex items-center justify-between gap-4">
        <section className="flex items-center gap-2 md:gap-4">
          <Link
            href={`/${STATIC_USER.username}`}
            className="block rounded-full overflow-hidden w-12 h-12 bg-slate-300"
          >
            <Image
              width={64}
              height={64}
              src={STATIC_USER.image}
              alt={STATIC_USER.name}
              className="object-cover object-center rounded-full overflow-hidden w-12 h-12"
              priority={true}
            />
          </Link>

          <div className="space-y-0">
            <Link
              href={`/${STATIC_USER.username}`}
              className="hover:underline md:text-lg font-medium"
            >
              {STATIC_USER.name}
            </Link>

            <FormattedDateAgo date={new Date().toDateString()} />
          </div>

          <button className="btn mx-8 border-gray-400">Following</button>
        </section>

        <section className="flex items-center gap-3">
          <SocialShareButtons href={`#todo`} />

          <button className="btn btn-dark">Mint</button>
        </section>
      </section>

      <div className="prose-cover-image rounded-2xl overflow-hidden border border-gray-400 bg-slate-100 child-past-parent h-96 max-h-96">
        <Image
          src={"/img/sample.jpg"}
          fill={true}
          alt={"cover"}
          className="object-cover object-center"
          // note: this image will likely be the largest content paint,
          // so setting priority is good for page load speed
          priority={true}
        />
      </div>

      <article className="prose max-w-full !text-lg">
        full post content here
        {/* <MarkdownFormatter source={mdxSerialized} /> */}
      </article>

      {/* <AboutTheAuthor /> */}
    </main>
  );
}
