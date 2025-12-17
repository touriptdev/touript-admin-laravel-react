/*
"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";

import { Document } from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { HardBreak } from "@tiptap/extension-hard-break";
import { ListItem } from "@tiptap/extension-list";
import { TextStyle } from "@tiptap/extension-text-style";
import { Dropcursor, Gapcursor, Placeholder, TrailingNode } from "@tiptap/extensions";

// reactjs-tiptap-editor
import { RichTextProvider } from "reactjs-tiptap-editor";
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
import { SlashCommand, SlashCommandList } from "reactjs-tiptap-editor/slashcommand";

import "reactjs-tiptap-editor/style.css";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  const extensions = [
    Document,
    Text,
    Paragraph,
    HardBreak,
    ListItem,
    TextStyle,
    Dropcursor,
    Gapcursor,
    TrailingNode,
    Placeholder.configure({
      placeholder: "Press '/' for commands",
    }),

    History,
    Bold,
    Italic,
    TextUnderline,
    Strike,
    BulletList,
    OrderedList,
    Heading,
    Link,
    Blockquote,
    CodeBlock,
    Image,
    SlashCommand,
  ];

  const editor = useEditor({
    extensions,
    content: value || "<p>Write your story...</p>",
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  // Keep editor synced with external value
  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || "<p></p>", { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="rte-wrapper">
      <RichTextProvider editor={editor}>
        <div className="rte-toolbar" onMouseDown={(e) => e.preventDefault()}>
          <RichTextUndo />
          <RichTextRedo />
          <RichTextHeading />
          <RichTextBold />
          <RichTextItalic />
          <RichTextUnderline />
          <RichTextStrike />
          <RichTextBulletList />
          <RichTextOrderedList />
          <RichTextBlockquote />
          <RichTextCodeBlock />
          <RichTextLink />
          <RichTextImage />
        </div>
        <div className="rte-editor prose prose-sm max-w-none">
          <EditorContent editor={editor} />
        </div>
        <SlashCommandList />
      </RichTextProvider>
    </div>
  );
}
*/

/*

  Bador code jeta kham korsil but H1-h6, plus p tag ota gesil gi

"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import DOMPurify from "dompurify";
import { Plugin } from "prosemirror-state";

import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import HardBreak from "@tiptap/extension-hard-break";
import ListItem from "@tiptap/extension-list-item";
import { TextStyle } from "@tiptap/extension-text-style";
import Dropcursor from "@tiptap/extension-dropcursor";
import Gapcursor from "@tiptap/extension-gapcursor";
import Placeholder from "@tiptap/extension-placeholder";
// import TrailingNode from "@tiptap/extension-trailing-node";
import Heading from "@tiptap/extension-heading";

import { RichTextProvider } from "reactjs-tiptap-editor";
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
import { RichTextHeading } from "reactjs-tiptap-editor/heading";
// import {
//   Heading as RichTextHeading,
// } from "reactjs-tiptap-editor/heading";

import { Image, RichTextImage } from "reactjs-tiptap-editor/image";
import { SlashCommand, SlashCommandList } from "reactjs-tiptap-editor/slashcommand";

import "reactjs-tiptap-editor/style.css";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

const CustomHeading = Heading.configure({
  levels: [1, 2, 3, 4, 5, 6],
  keepMarks: true, // ✅ allows bold/italic inside headings
});

const CleanPastePlugin = () =>
  new Plugin({
    props: {
      handlePaste(view, event) {
        const clipboardData = event.clipboardData;
        if (!clipboardData) return false;

        const html = clipboardData.getData("text/html");
        if (!html) return false;

        // 🧼 Clean copied HTML
        const cleanHtml = DOMPurify.sanitize(html, {
          ALLOWED_TAGS: [
            "p",
            "br",
            "strong",
            "b",
            "em",
            "i",
            "u",
            "s",
            "strike",
            "ul",
            "ol",
            "li",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "blockquote",
            "pre",
            "code",
            "a",
            "img",
          ],
          ALLOWED_ATTR: ["href", "src", "alt", "title"],
          FORBID_TAGS: ["style", "font", "span", "div"],
          KEEP_CONTENT: true,
        });

        const temp = document.createElement("div");
        temp.innerHTML = cleanHtml;

        const slice = view.domParser.parseSlice(temp, {
          preserveWhitespace: true,
        });

        view.dispatch(view.state.tr.replaceSelection(slice));
        return true;
      },
    },
  });

export default function RichTextEditor({ value, onChange }: Props) {
  const extensions = [
    Document,
    Paragraph,
    Text,
    HardBreak,
    ListItem,
    TextStyle,
    Dropcursor,
    Gapcursor,
    // TrailingNode,
    Placeholder.configure({
      placeholder: "Press '/' for commands",
    }),

    History,
    Bold,
    Italic,
    TextUnderline,
    Strike,
    BulletList,
    OrderedList,
    // CustomHeading,
    Link,
    Blockquote,
    CodeBlock,
    Image,
    SlashCommand,
  ];

  const editor = useEditor({
    extensions,
    content: value || "<p>Write your story...</p>",
    immediatelyRender: false,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },

    onCreate({ editor }) {
      editor.registerPlugin(CleanPastePlugin());
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || "<p></p>", { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="rte-wrapper">
      <RichTextProvider editor={editor}>
        <div
          className="rte-toolbar"
          onMouseDown={(e) => e.preventDefault()}
        >
          <RichTextUndo />
          <RichTextRedo />
          <RichTextHeading />
          <RichTextBold />
          <RichTextItalic />
          <RichTextUnderline />
          <RichTextStrike />
          <RichTextBulletList />
          <RichTextOrderedList />
          <RichTextBlockquote />
          <RichTextCodeBlock />
          <RichTextLink />
          <RichTextImage />
        </div>

        <div
          className="rte-editor prose prose-sm max-w-none"
          onClick={() => editor.chain().focus().run()}
        >
          <EditorContent editor={editor} />
        </div>

        <SlashCommandList />
      </RichTextProvider>
    </div>
  );
}

*/



/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import DOMPurify from "dompurify";
import { Plugin } from "prosemirror-state";

/* -------------------- */
/* Base Tiptap Extensions */
/* -------------------- */
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import HardBreak from "@tiptap/extension-hard-break";
import ListItem from "@tiptap/extension-list-item";
import { TextStyle } from "@tiptap/extension-text-style";
import Dropcursor from "@tiptap/extension-dropcursor";
import Gapcursor from "@tiptap/extension-gapcursor";
import Placeholder from "@tiptap/extension-placeholder";
// import Heading from "@tiptap/extension-heading";

/* -------------------- */
/* Reactjs Tiptap Toolbar */
/* -------------------- */
import { RichTextProvider } from "reactjs-tiptap-editor";
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
// import { RichTextHeading } from "reactjs-tiptap-editor/heading";
import { Image, RichTextImage } from "reactjs-tiptap-editor/image";
import { SlashCommand, SlashCommandList } from "reactjs-tiptap-editor/slashcommand";

import "reactjs-tiptap-editor/style.css";

/* -------------------- */
/* Props */
/* -------------------- */
interface Props {
  value: string;
  onChange: (html: string) => void;
}

/* -------------------- */
/* Custom Heading Extension (H1–H6) */
/* -------------------- */
const CustomHeading = Heading.configure({
  levels: [1, 2, 3, 4, 5, 6],
  keepMarks: true, // allow bold/italic inside headings
});

/* -------------------- */
/* Plugins */
/* -------------------- */

// 1️⃣ Clean paste from websites
const CleanPastePlugin = () =>
  new Plugin({
    props: {
      handlePaste(view, event) {
        const clipboardData = event.clipboardData;
        if (!clipboardData) return false;

        const html = clipboardData.getData("text/html");
        if (!html) return false;

        const cleanHtml = DOMPurify.sanitize(html, {
          ALLOWED_TAGS: [
            "p","br","strong","b","em","i","u","s","strike",
            "ul","ol","li","h1","h2","h3","h4","h5","h6",
            "blockquote","pre","code","a","img",
          ],
          ALLOWED_ATTR: ["href", "src", "alt", "title"],
          FORBID_TAGS: ["style", "font", "span", "div"],
          KEEP_CONTENT: true,
        });

        const temp = document.createElement("div");
        temp.innerHTML = cleanHtml;
        const slice = view.domParser.parseSlice(temp, { preserveWhitespace: true });
        view.dispatch(view.state.tr.replaceSelection(slice));
        return true;
      },
    },
  });

// 2️⃣ Only one H1 allowed
const SingleH1Plugin = () =>
  new Plugin({
    appendTransaction(transactions, oldState, newState) {
      if (!transactions.some(tr => tr.docChanged)) return;

      let h1Count = 0;
      const tr = newState.tr;

      newState.doc.descendants((node, pos) => {
        if (node.type.name === "heading" && node.attrs.level === 1) {
          h1Count++;
          if (h1Count > 1) {
            tr.setNodeMarkup(pos, undefined, { level: 2 });
          }
        }
      });

      return tr.steps.length ? tr : null;
    },
  });

// 3️⃣ Convert pasted H1 → H2
const NormalizePasteHeadingsPlugin = () =>
  new Plugin({
    props: {
      transformPastedHTML(html) {
        return html.replace(/<h1/gi, "<h2").replace(/<\/h1>/gi, "</h2>");
      },
    },
  });

// 4️⃣ Paste as plain text (Shift + Ctrl/Cmd + V)
const PlainTextPastePlugin = () =>
  new Plugin({
    props: {
      handlePaste(view, event) {
        if (!event.clipboardData) return false;
        if (event.shiftKey) {
          const text = event.clipboardData.getData("text/plain");
          view.dispatch(view.state.tr.insertText(text));
          return true;
        }
        return false;
      },
    },
  });

/* -------------------- */
/* RichTextEditor Component */
/* -------------------- */
export default function RichTextEditor({ value, onChange }: Props) {
  const extensions = [
    Document,
    Paragraph,
    Text,
    HardBreak,
    ListItem,
    TextStyle,
    Dropcursor,
    Gapcursor,
    Placeholder.configure({
      placeholder: "Press '/' for commands",
    }),

    History,
    Heading,
    Bold,
    Italic,
    TextUnderline,
    Strike,
    BulletList,
    OrderedList,
    CustomHeading,
    Link,
    Blockquote,
    CodeBlock,
    Image,
    SlashCommand,
  ];

  const editor = useEditor({
    extensions,
    content: value || "<p>Write your story...</p>",
    immediatelyRender: false,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },

    onCreate({ editor }) {
      editor.registerPlugin(CleanPastePlugin());
      editor.registerPlugin(SingleH1Plugin());
      editor.registerPlugin(NormalizePasteHeadingsPlugin());
      editor.registerPlugin(PlainTextPastePlugin());
    },
  });

  // Keep external value synced
  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || "<p></p>", { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="rte-wrapper">
      <RichTextProvider editor={editor}>
        {/* Toolbar */}
        <div className="rte-toolbar" onMouseDown={(e) => e.preventDefault()}>
          <RichTextUndo />
          <RichTextRedo />
          <RichTextHeading />

          {/* {editor && <RichTextHeading editor={editor} />} */}

          <RichTextBold />
          <RichTextItalic />
          <RichTextUnderline />
          <RichTextStrike />

          {/* Clear Formatting Button */}
          <button
            title="Clear formatting"
            className="rte-btn"
            onMouseDown={(e) => {
              e.preventDefault();
              editor.chain().focus().clearNodes().unsetAllMarks().run();
            }}
          >
            🧹
          </button>

          <RichTextBulletList />
          <RichTextOrderedList />
          <RichTextBlockquote />
          <RichTextCodeBlock />
          <RichTextLink />
          <RichTextImage />
        </div>

        {/* Editor Content */}
        <div className="rte-editor prose prose-sm max-w-none" onClick={() => editor.chain().focus().run()}>
          <EditorContent editor={editor} />
        </div>

        {/* Slash Command */}
        <SlashCommandList />
      </RichTextProvider>
    </div>
  );
}
