import { notFound } from "next/navigation";
// import { getUserProfile } from "@/lib/queries/users";

type PageProps = {
  params: {
    profile: string;
  };
};

export default async function Page({ params }: PageProps) {
  if (!params.profile) notFound();

  // get the product's record from the database
  // const profile = await getUserProfile({
  //   username: params.profile,
  //   // include: { people: true },
  // });

  // if (!profile) notFound();

  return <main className="flex flex-col">profile page</main>;
}
