import React, { useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import T from "prop-types";
import styled from "styled-components/macro";
import { debounce } from "lodash";
import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import BubbleMenu from "./BubbleMenu";
import TimerNode from "./extensions/TimerNode";
import Text from "@tiptap/extension-text";
import History from "@tiptap/extension-history";
import Button from "commons/components/Button";

const AddTimerButton = styled(Button)`
  position: absolute;
  bottom: 0;
  right: 28px;
`;

const EditorContentStyled = styled(EditorContent)`
  width: 100%;

  .ProseMirror {
    background-color: var(--neutral-200);
    border: 1px solid var(--neutral-180);
    border-radius: var(--border-radius-1);
    width: 100%;

    outline: none;
    min-height: 80px;
    padding: 9px 12px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: var(--neutral-100);

    p.is-editor-empty:first-child::before {
      content: attr(data-placeholder);
      color: var(--neutral-160);
      float: left;
      height: 0;
      pointer-events: none;
    }

    &:hover {
      border: 1px solid var(--neutral-170);
    }

    &:focus-within,
    &:focus-visible {
      box-shadow: 0px 0px 0px 3px rgba(255, 214, 219, 0.5);
      border: 1px solid var(--primary-140);
    }
  }
`;

const Tiptap = ({ content, onChange, placeholder, withTimer = false }) => {
  const debouncedOnChange = useCallback(
    debounce(({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    }, 1000),
    [onChange]
  );

  const editor = useEditor(
    {
      extensions: [
        Document,
        Paragraph,
        Text,
        Bold,
        Italic,
        Underline,
        History,
        Placeholder.configure({
          placeholder: placeholder,
        }),
        TimerNode,
      ],
      content: content,
      onUpdate: debouncedOnChange,
      onBlur: () => debouncedOnChange.flush(),
    },
    [placeholder]
  );

  function addTimer() {
    editor.chain().focus().addTimer().run();
  }

  return (
    <>
      {editor && <BubbleMenu editor={editor} />}
      <EditorContentStyled editor={editor} />
      {withTimer && <AddTimerButton variant="tertiary" icon="timer" onClick={addTimer} />}
    </>
  );
};

Tiptap.propTypes = {
  content: T.string,
  onChange: T.func,
  placeholder: T.string,
  withTimer: T.bool,
};

export default Tiptap;
