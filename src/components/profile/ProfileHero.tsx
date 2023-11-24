import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { type User } from "@prisma/client";
import { FeatherIcon } from "@/components/core/FeatherIcon";

type ProfileHeroProps = {
  name: User["name"];
  username: User["username"];
  image: User["image"];
  bio: User["bio"];
};

export const ProfileHero = memo(
  ({ name, username, image, bio }: ProfileHeroProps) => {
    return (
      <section className="space-y-4">
        <div className="space-x-6 flex items-center">
          <Link
            href={`/${username}`}
            className="avatar avatar-base bg-gray-100 border border-slate-200"
          >
            {!!image ? (
              <Image
                src={image}
                alt={name ?? username}
                className={"avatar-base"}
                width={96}
                height={96}
              />
            ) : (
              <span className="flex items-center align-middle w-full h-full text-center justify-center">
                <FeatherIcon
                  name="User"
                  size={64}
                  strokeWidth={1.0}
                  className="text-gray-500"
                />
              </span>
            )}
          </Link>

          <div className="space-y-4">
            <div className="space-y-0">
              <h1>
                <Link
                  href={`/${username}`}
                  className="text-3xl font-medium md:text-3xl"
                >
                  {name ?? username}
                </Link>
              </h1>

              <p className="text-sm text-gray-500">@{username}</p>
            </div>
          </div>
        </div>

        {!!bio && <p className="text-gray-500">{bio}</p>}
      </section>
    );
  },
);
