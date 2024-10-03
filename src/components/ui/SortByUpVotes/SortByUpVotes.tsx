"use client";

import { useUser } from "@/src/context/user.provider";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function SortByUpVotes() {
  const { query, setQuery } = useUser();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Sort Post</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          onClick={() => setQuery({ ...query, sort: "upvotes" })}
          key="new"
        >
          Up Votes
        </DropdownItem>
        <DropdownItem
          onClick={() => setQuery({ ...query, sort: "downvotes" })}
          key="copy"
        >
          Down Votes
        </DropdownItem>
        <DropdownItem
          onClick={() => setQuery({ ...query, sort: "" })}
          key="copy"
        >
          Reset
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
