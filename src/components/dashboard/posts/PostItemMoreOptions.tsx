"use client";

import { memo } from "react";
import {
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@/components/core/DropdownMenu";

type PostItemMoreOptionsProps = {};

export const PostItemMoreOptions = memo(({}: PostItemMoreOptionsProps) => {
  return (
    <DropdownMenu button={{ className: "btn btn-ghost !p-2" }}>
      <DropdownSection>
        <DropdownItem
          icon="Edit"
          label="Edit post"
          onClick={() => alert("edit")}
        />
        <DropdownItem
          icon="ExternalLink"
          label="View public page"
          onClick={() => alert("open link")}
        />
      </DropdownSection>
      <DropdownSection>
        <DropdownItem
          icon="Copy"
          label="Copy sharable link"
          onClick={() => alert("copy")}
        />
        <DropdownItem
          icon="Trash"
          label="Delete post"
          onClick={() => alert("delete")}
        />
      </DropdownSection>
    </DropdownMenu>
  );
});
