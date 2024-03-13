import React from "react";
import { BubbleMenu as TiptapBubbleMenu } from "@tiptap/react";
import T from "prop-types";
import styled from "styled-components/macro";
import Icon from "commons/components/Icon";

const TiptapBubbleMenuStyled = styled(TiptapBubbleMenu)`
  display: flex;
  gap: 8px;
  padding: 4px;
  border-radius: var(--border-radius-1);
  background-color: var(--neutral-100);
  color: var(--neutral-200);
  box-shadow: var(--shadow-1);
`;

const IconStyled = styled(Icon)`
  padding: 4px;
  border-radius: var(--border-radius-1);
  cursor: pointer;

  &:hover {
    background-color: var(--neutral-120);
  }

  &.is-active {
    background-color: var(--neutral-120);

    &:hover {
      background-color: var(--neutral-140);
    }
  }
`;

const BubbleMenu = ({ editor }) => {
  return (
    <TiptapBubbleMenuStyled className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
      <IconStyled
        size={20}
        name="format_bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      />
      <IconStyled
        size={20}
        name="format_italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      />
      <IconStyled
        size={20}
        name="format_underlined"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
      />
    </TiptapBubbleMenuStyled>
  );
};

BubbleMenu.propTypes = {
  editor: T.object,
};

export default BubbleMenu;
