import { useCallback, useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import clsx from 'clsx';
// import api from './api';
import api from "../api";

export default function RichTextEditor({ value, onChange, placeholder = 'Write something...' }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      Underline,
      Link.configure({ openOnClick: true, autolink: true, linkOnPaste: true }),
      Image.configure({ inline: false, allowBase64: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || '',
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  const addImage = useCallback(async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const form = new FormData();
      form.append('image', file);

      const res = await api.post('/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const url = res.data.url;
      editor?.chain().focus().setImage({ src: url }).run();
    };

    input.click();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="tiptap-wrapper">
      <div className="toolbar">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={clsx({ active: editor.isActive('bold') })}
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={clsx({ active: editor.isActive('italic') })}
        >
          <em>I</em>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={clsx({ active: editor.isActive('underline') })}
        >
          U
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={clsx({ active: editor.isActive('strike') })}
        >
          S
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={clsx({ active: editor.isActive('bulletList') })}
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={clsx({ active: editor.isActive('orderedList') })}
        >
          1. List
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={clsx({ active: editor.isActive('paragraph') })}
        >
          P
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={clsx({ active: editor.isActive('heading', { level: 1 }) })}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={clsx({ active: editor.isActive('heading', { level: 2 }) })}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={clsx({ active: editor.isActive('heading', { level: 3 }) })}
        >
          H3
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('left').run()}>Left</button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()}>Center</button>
        <button onClick={() => editor.chain().focus().setTextAlign('right').run()}>Right</button>
        <button
          onClick={() => {
            const url = window.prompt('Paste link URL');
            if (url === null) return;
            if (url === '') {
              editor.chain().focus().unsetLink().run();
              return;
            }
            editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          Link
        </button>
        <button onClick={addImage}>Image</button>
        <button onClick={() => editor.chain().focus().undo().run()}>Undo</button>
        <button onClick={() => editor.chain().focus().redo().run()}>Redo</button>
      </div>

      <EditorContent editor={editor} className="editor" />

      <style>{`
        .tiptap-wrapper { border: 1px solid #ddd; border-radius: 8px; }
        .toolbar { display: flex; flex-wrap: wrap; gap: 8px; padding: 8px; border-bottom: 1px solid #eee; }
        .toolbar button { padding: 4px 8px; border: 1px solid #ccc; background: #fafafa; border-radius: 6px; cursor: pointer; }
        .toolbar button.active { background: #e6f0ff; border-color: #9dbbff; }
        .editor { padding: 12px; min-height: 220px; }
        .editor img { max-width: 100%; height: auto; }
      `}</style>
    </div>
  );
}
