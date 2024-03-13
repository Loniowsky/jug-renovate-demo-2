import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import TimerNodeComponent from "./TimerNodeComponent.jsx";
import { minutesToHoursAndMinutes } from "commons/util/helpers.js";

export default Node.create({
  name: "timer",
  group: "inline",
  inline: true,
  atom: true,

  addAttributes() {
    return {
      value: {
        default: 0,
        parseHTML: element => +element.getAttribute("value"),
      },
    };
  },

  addCommands() {
    return {
      addTimer:
        attributes =>
        ({ commands }) => {
          return commands.insertContent({
            type: "timer",
            attrs: attributes,
            content: [],
          });
        },
    };
  },

  parseHTML() {
    return [
      {
        tag: "button",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "button",
      mergeAttributes(HTMLAttributes, { class: "timer" }),
      minutesToHoursAndMinutes(HTMLAttributes.value),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TimerNodeComponent);
  },
});
