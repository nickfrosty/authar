/**
 * Types for the "/api/profile" endpoint
 */

import { WithApiAction } from ".";
import { Profile } from "@prisma/client";

/**
 * Control which `Profile` fields are editable by the user via the app frontend
 *
 * note: some fields are handled differently and not included in this type (e.g. `elements`)
 */
export type ProfileEditableFieldKeys = keyof Pick<
  Profile,
  // todo: add support for all of these: "title" | "name" | "bio" | "image" | "oneLiner"
  "title"
>;

/**
 * Composite type of the normally editable fields,
 * with additional custom configured fields to allow editing
 */
export type ProfileEditableFields<T> = T & {
  [key in ProfileEditableFieldKeys]: Profile[key];
};

/**
 * API input for a `PATCH` request to the `/api/profile` endpoint
 * (aka update an existing Profile)
 */
export type ApiProfilePatchInput = Partial<
  ProfileEditableFields<{
    /**  */
    elements: WithApiAction<any>[];
    /**  */
    socialLinks: WithApiAction<any>[];
  }>
>;

/**
 * API response from a `PATCH` request to the `/api/profile` endpoint
 * (aka update an existing Profile)
 */
export type ApiProfilePatchResponse = {};

/**
 * API input from a `POST` request to the `/api/profile` endpoint
 * (aka create a new Profile)
 */
export type ApiProfilePostInput = {};

/**
 * API response from a `POST` request to the `/api/profile` endpoint
 * (aka create a new Profile)
 */
export type ApiProfilePostResponse = {};
