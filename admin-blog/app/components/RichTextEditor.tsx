/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";

// Base Tiptap kit
import { Document } from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { HardBreak } from "@tiptap/extension-hard-break";
import { ListItem } from "@tiptap/extension-list";
import { TextStyle } from "@tiptap/extension-text-style";
import { Dropcursor, Gapcursor, Placeholder, TrailingNode } from "@tiptap/extensions";

// React Tiptap Editor core
import { RichTextProvider } from "reactjs-tiptap-editor";

// Extensions from reactjs-tiptap-editor
import { History, RichTextUndo, RichTextRedo } from "reactjs-tiptap-editor/history";
import { Bold, RichTextBold } from "reactjs-tiptap-editor/bold";
import { Italic, RichTextItalic } from "reactjs-tiptap-editor/italic";
import { TextUnderline, RichTextUnderline } from "reactjs-tiptap-editor/textunderline";
import { Strike, RichTextStrike } from "reactjs-tiptap-editor/strike";
import { Link, RichTextLink } from "reactjs-tiptap-editor/link";
import { BulletList, RichTextBulletList } from "reactjs-tiptap-editor/bulletlist";
import { OrderedList, RichTextOrderedList } from "reactjs-tiptap-editor/orderedlist";
import { Blockquote, RichTextBlockquote } from "reactjs-tiptap-editor/blockquote";
import { CodeBlock, RichTextCodeBlock } from "reactjs-tiptap-editor/codeblock";
import { Heading, RichTextHeading } from "reactjs-tiptap-editor/heading";
import { Image, RichTextImage } from "reactjs-tiptap-editor/image";
// Slash command
import { SlashCommand, SlashCommandList } from "reactjs-tiptap-editor/slashcommand";

// 🔴 we DO NOT import GIF support, so no GIFs:
// import { ImageGif, RichTextImageGif } from "reactjs-tiptap-editor/imagegif";

import "reactjs-tiptap-editor/style.css";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  // Build base extensions
  const baseExtensions = [
    Document,
    Text,
    Dropcursor,
    Gapcursor,
    HardBreak,
    Paragraph,
    TrailingNode,
    ListItem,
    TextStyle,
    Placeholder.configure({
      placeholder: "Press '/' for commands",
    }),
  ];

  const extensions = [
    ...baseExtensions,
    // history / undo-redo
    History,
    // formatting
    Bold,
    Italic,
    TextUnderline,
    Strike,
    // lists
    BulletList,
    OrderedList,
    // headings
    Heading,
    // links & block elements
    Link,
    Blockquote,
    CodeBlock,
    Image,
    // slash command menu
    SlashCommand,
  ];

  const editor = useEditor({
    extensions,
    content: value || "<p>Write your story...</p>",
    textDirection: "auto",
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  // keep external value in sync (e.g. when loading from API)
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (current !== value) {
      editor.commands.setContent(value || "<p></p>", { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      {/* Toolbar */}
      <RichTextProvider editor={editor}>
        <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 px-2 py-2 text-xs">
          {/* undo / redo */}
          <RichTextUndo />
          <RichTextRedo />

          {/* headings dropdown */}
          <RichTextHeading />

          {/* inline styles */}
          <RichTextBold />
          <RichTextItalic />
          <RichTextUnderline />
          <RichTextStrike />

          {/* lists */}
          <RichTextBulletList />
          <RichTextOrderedList />

          {/* blocks */}
          <RichTextBlockquote />
          <RichTextCodeBlock />

          {/* links & images */}
          <RichTextLink />
          <RichTextImage />
        </div>

        {/* Main editor area */}
        <div className="prose prose-sm max-w-none px-2 py-2 text-gray-900">
          <EditorContent editor={editor} />
        </div>

        {/* Slash command list (for "/" menu) */}
        <SlashCommandList />
      </RichTextProvider>
    </div>
  );
}

