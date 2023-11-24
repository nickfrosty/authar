/**
 * Library of common queries for managing Products
 */

import prisma from "@/lib/prisma";
import { Profile, Prisma } from "@prisma/client";

type GetUserProps = {
  username: Profile["username"];
};

/**
 * Get a single User record from the database
 *
 * note: this should be used when getting public information for a user
 */
export async function getUser({ username }: GetUserProps) {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      uid: true,
      username: true,
      image: true,
      status: true,
    },
  });

  return user;
}

type GetUserProfileProps = {
  username: Profile["username"];
  // status?: Profile["status"];
};

/**
 * Get a single User's profile from the database
 *
 * note: this should be used when getting public information for a user
 */
export async function getUserProfile({ username }: GetUserProfileProps) {
  const user = await prisma.profile.findUnique({
    where: { username },
    include: {
      user: {
        select: {
          uid: true,
          name: true,
          username: true,
          image: true,
          status: true,
        },
      },
    },
  });

  return user;
}

type UpdateUserProfileProps = {
  username: Profile["username"];
  data: Prisma.ProfileUpdateInput;
};

/**
 * Update a single Profile in the database
 */
export async function updateProfile({
  username,
  data,
}: UpdateUserProfileProps) {
  const profile = await prisma.profile.update({
    where: {
      username,
    },
    data,
  });

  return profile;
}
