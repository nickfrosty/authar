import { SITE } from "@/lib/const/general";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "react-feather";

export const metadata: Metadata = {
  title: `${SITE.name} - Page not found`,
};

/**
 * note:
 * for some reason, when  the marketing footer is loaded on this page,
 * the social button styles do not apply...
 * specifically from the `module.css` file and when direct visit a 404 page.
 * if the user routes to the page via internal navigation, then it works fine
 */

export default async function NotFound() {

  return (
    <main className="page-container !space-y-8 md:py-20">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 gap-y-10 md:mx-20">
        <div className="col-span-2 items-center flex flex-grow text-center md:text-left">
          <div>
            <section className={"py-4 md:py-8 max-w-lg space-y-2"}>
              <h1 className="text-4xl md:text-5xl font-bold">Page not found</h1>

              <p className="text-base md:text-lg text-gray-500">
                Looks like you hit a wall. We could not find the page you were
                looking for...
              </p>
            </section>

            <Link
              href="/"
              className="btn inline-flex font-semibold border-gray-300"
            >
              No place like home
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </Link>

            {/* <PodcastFeedLinkButtons /> */}
          </div>
        </div>

      </section>
    </main>
  );
}
