import { memo } from "react";
import Image from "next/image";
import { STATIC_USER } from "@/data";

type ProfileHeroProps = {};

export const ProfileHero = memo(({}: ProfileHeroProps) => {
  return (
    <section className="space-y-4">
      <div className="space-x-6 flex items-center">
        <div className="avatar avatar-base">
          <Image
            src={STATIC_USER.image}
            alt={STATIC_USER.name}
            className={"avatar-base"}
            width={96}
            height={96}
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-0">
            <h2 className="text-3xl font-medium md:text-3xl">
              {STATIC_USER.name}
            </h2>
            <p className="text-sm text-gray-500">@{STATIC_USER.username}</p>
          </div>
        </div>
      </div>

      <p className="text-gray-500">{STATIC_USER.bio}</p>
    </section>
  );
});
