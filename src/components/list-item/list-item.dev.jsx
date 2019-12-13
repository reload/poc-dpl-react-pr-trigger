import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import ListItem from "./list-item";

export default {
  title: "Components|List Item",
  decorators: [withKnobs]
};

export function Base() {
  return (
    <ul>
      <ListItem aside={<p>aside</p>} footer={<p>footer</p>}>
        <h2>children</h2>
      </ListItem>
      <ListItem aside={<p>aside</p>} footer={<p>footer</p>}>
        <h2>children</h2>
      </ListItem>
      <ListItem aside={<p>aside</p>} footer={<p>footer</p>}>
        <h2>children</h2>
      </ListItem>
    </ul>
  );
}
