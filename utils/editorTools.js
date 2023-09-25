import Embed from "@editorjs/embed";
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";

export const EDITOR_TOOLS = {
  header: {
    class: Header,
    config: {
      placeholder: "Enter a Header",
      levels: [2, 3, 4],
      defaultLevel: 2,
    },
  },
  paragraph: Paragraph,
  embed: Embed,
  inlineCode: InlineCode,
  list: List,
  quote: Quote,
};
