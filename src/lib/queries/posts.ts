/**
 * Library of common queries for managing Posts
 */

import prisma from "@/lib/prisma";
import type { Post, User } from "@prisma/client";
import { getUserProfile } from "./users";

type GetSinglePostProps = {
  /** unique slug to access the post by */
  slug: Post["slug"];
  /** uid of the post author */
  uid?: Post["uid"];
  /** username of the post author */
  username?: User["username"];
};

/**
 * Get a single Post from the database
 */
export async function getSinglePost({
  slug,
  uid,
  username,
}: GetSinglePostProps) {
  // auto-magically fetch the `uid` for the post when only the username is provided
  if (!uid && !!username) {
    const user = await getUserProfile({ username });

    if (!user) {
      return null;
    }

    uid = user.uid;
  }

  // quick integrity check on the input
  if (!uid || !slug) return null;

  const post = await prisma.post.findUnique({
    where: {
      slugKey: {
        slug,
        uid,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          username: true,
          image: true,
        },
      },
    },
  });

  return post;
}

type GetPostsForUserProps = {
  /** uid of the post author */
  uid?: Post["uid"];
  /** username of the post author */
  username?: User["username"];
};

/**
 * Get a list of Posts
 */
export async function getPostsForUser({ uid, username }: GetPostsForUserProps) {
  // auto-magically fetch the `uid` for the post when only the username is provided
  if (!uid && !!username) {
    const user = await getUserProfile({ username });

    if (!user) {
      return null;
    }

    uid = user.uid;
  }

  // quick integrity check on the input
  if (!uid) return null;

  const posts = await prisma.post.findMany({
    where: {
      uid,
    },
    // include: {
    //   user: {
    //     select: {
    //       uid: true,
    //       name: true,
    //       username: true,
    //       image: true,
    //     },
    //   },
    // },
  });

  return posts;
}
