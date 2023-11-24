/**
 * Types for the "/api/profile" endpoint
 */

import { WithApiAction } from ".";
import { User } from "@prisma/client";

/**
 * Control which `User` fields are editable by the user via the app frontend
 *
 * note: some fields are handled differently and not included in this type (e.g. `elements`)
 */
export type UserProfileEditableFieldKeys = keyof Pick<
  User,
  // todo: add support for all other editable fields
  "name" | "bio" | "image"
>;

/**
 * Composite type of the normally editable fields,
 * with additional custom configured fields to allow editing
 */
export type UserProfileEditableFields<T> = T & {
  [key in UserProfileEditableFieldKeys]: User[key];
};

/**
 * API input for a `PATCH` request to the `/api/profile` endpoint
 * (aka update an existing User's profile info)
 */
export type ApiProfilePatchInput = Partial<
  UserProfileEditableFields<{
    /**  */
    elements: WithApiAction<any>[];
    /**  */
    socialLinks: WithApiAction<any>[];
  }>
>;

/**
 * API response from a `PATCH` request to the `/api/profile` endpoint
 * (aka update an existing User's profile info)
 */
export type ApiProfilePatchResponse = {};
