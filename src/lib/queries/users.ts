/**
 * Library of common queries for managing Users
 */

import prisma from "@/lib/prisma";
import { User, Prisma } from "@prisma/client";

type GetUserProfileProps = {
  username: User["username"];
  // status?: User["status"];
};

/**
 * Get a single User's profile information from the database
 *
 * note: this should be used when getting public information for a user
 *
 * todo: add support for customizing the data retrieved, likely with a few
 * standard options without needing to manually define each selected field each time
 */
export async function getUserProfile({ username }: GetUserProfileProps) {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      uid: true,
      name: true,
      username: true,
      image: true,
      bio: true,
      verified: true,
      status: true,
    },
  });

  return user;
}

type UpdateUserProps = {
  username: User["username"];
  data: Prisma.UserUpdateInput;
};

/**
 * Update a single User record in the database
 */
export async function updateUser({ username, data }: UpdateUserProps) {
  const user = await prisma.user.update({
    where: {
      username,
    },
    data,
  });

  return user;
}
