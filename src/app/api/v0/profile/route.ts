/**
 * API handlers for the "/api/profile" v0 endpoint
 */

import { JsonResponse } from "@/lib/api";
import { getUserProfile, updateUser } from "@/lib/queries/users";
import { ApiProfilePatchInput, ApiProfilePatchResponse } from "@/types/api";

// export async function GET(req: Request) {
//   return Response.json({ hi: true });
// }

// export async function POST(req: Request) {
//   console.log("POST");
//   return Response.json({ hi: true });
// }

export async function PATCH(req: Request) {
  console.log("PATCH");

  //
  const username = "nickfrosty";

  // get the client supplied form data
  const input: ApiProfilePatchInput = await req.json();

  console.log("input:", input);

  const profile = await getUserProfile({ username });

  // get the current profile data from the database
  // todo

  // handle the changes to social links
  if (typeof input.socialLinks !== "undefined") {
    // verify an array was provided
    if (!Array.isArray(input.socialLinks))
      throw Error("Expected an array of social links");

    // loop and process each of the
    for (let i = 0; i < input.socialLinks.length; i++) {
      // console.log(i, input.socialLinks[i]);
      // todo: need to handle reordering of social link items

      // batch prepare the database updates
      switch (input.socialLinks[i].apiAction) {
        case "delete": {
          // todo: handle delete item
          break;
        }
        case "update": {
          // todo: handle updating existing items
          break;
        }
        case "new": {
          // todo: handle adding new items
          break;
        }
        default: {
          // do nothing
          // console.warn("Unknown social link action");
        }
      }
    }

    // perform the database update
    // todo
  }

  // handle the changes to social links
  if (typeof input.elements !== "undefined") {
    // verify an array was provided
    if (!Array.isArray(input.elements))
      throw Error("Expected an array of elements");

    console.log("elements:", input.elements);
  }

  //
  const updatedProfile = await updateUser({
    username,
    data: {
      // socialLinks: input.socialLinks,
      // elements: JSON.stringify(input.elements),
    },
  });

  console.log("updatedProfile:", updatedProfile);

  return JsonResponse<ApiProfilePatchResponse>({
    socialLinks: input.socialLinks,
  });
}
