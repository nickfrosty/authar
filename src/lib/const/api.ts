import { ApiAction } from "@/types/api";

/**
 * Typed const list of all the `ApiAction`s for appending
 */
export const API_ACTION: {
  [Action in ApiAction["apiAction"]]: ApiAction;
} = {
  update: { apiAction: "update" },
  delete: { apiAction: "delete" },
  new: { apiAction: "new" },
};
