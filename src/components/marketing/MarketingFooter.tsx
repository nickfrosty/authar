import Link from "next/link";
import { Twitter } from "react-feather";
import { SocialButtonLink } from "@/components/SocialButtons";
import { SITE, TWITTER } from "@/lib/const/general";
import { AppLogo } from "@/components/core/AppLogo";

export default function MarketingFooter() {
  return (
    <footer className="border-t border-gray-300 bg-gray-100">
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 container gap-8 py-8">
        <section className="col-span-full max-w-lg lg:col-span-2 space-y-6">
          <AppLogo className="" />

          {/* <p className="text-lg"></p> */}
        </section>

        <ul className="space-y-2">
          <FooterSectionTitle title={"Section"} />
          <FooterSectionLink href="/link" label="Custom link" />
        </ul>
        <ul className="space-y-2">
          <FooterSectionTitle title={"Section"} />

          <FooterSectionLink href="/link" label="Custom link" />
        </ul>
        {/* <ul className="space-y-2">
          <FooterSectionTitle title="Resources" />
          <FooterSectionLink href="#" label="Getting started" />
        </ul> */}
        {/* <ul className="space-y-2">
          <FooterSectionTitle title="Support" />
          <FooterSectionLink href="#" label="Privacy policy" />
        </ul> */}
      </section>

      <section className="container grid gap-4 md:flex items-center justify-center md:justify-between text-gray-500">
        <div className="order-2 md:order-1">
          &copy;{new Date().getFullYear()}{" "}
          <Link href={"/"} className="underline">
            {SITE.name}
          </Link>
          {". All rights reserved."}
        </div>

        <div className="order-1 justify-center md:order-2 flex items-center gap-2">
          <SocialButtonLink
            newTab={true}
            title={"Twitter / X"}
            href={TWITTER.url}
            icon={Twitter}
            label={TWITTER.handle}
          />
        </div>
      </section>
    </footer>
  );
}

export const FooterSectionTitle = ({ title }: { title: string }) => {
  return (
    <li>
      <h4 className="font-semibold text-base text-gray-700">{title}</h4>
    </li>
  );
};

export const FooterSectionLink = ({
  href,
  label,
  target,
}: {
  href: string;
  label: string;
  target?: "_blank";
}) => {
  return (
    <li>
      <Link
        href={href}
        title={label}
        target={target}
        className="hover:underline"
      >
        {label}
      </Link>
    </li>
  );
};
