import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  RotateCcw,
  RotateCw,
} from 'lucide-react';

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export const TipTapEditor: React.FC<TipTapEditorProps> = ({
  content,
  onChange,
  placeholder = 'Write your skincare guide, research breakdown, or ingredient analysis...',
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-clea-coral underline font-semibold',
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return (
      <div className="h-64 border border-clea-border rounded-2xl flex items-center justify-center text-stone-400 text-sm">
        Loading editor...
      </div>
    );
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter link URL:', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="border border-clea-border rounded-2xl bg-white overflow-hidden shadow-clea-sm focus-within:border-clea-coral transition-all">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-clea-border bg-clea-bg-subtle select-none">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
            editor.isActive('heading', { level: 1 })
              ? 'bg-clea-coral text-white'
              : 'text-stone-600 hover:bg-stone-200'
          }`}
          title="Heading 1"
        >
          <Heading1 size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-clea-coral text-white'
              : 'text-stone-600 hover:bg-stone-200'
          }`}
          title="Heading 2"
        >
          <Heading2 size={16} />
        </button>

        <div className="w-[1px] h-5 bg-stone-300 mx-1"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
            editor.isActive('bold')
              ? 'bg-clea-coral text-white'
              : 'text-stone-600 hover:bg-stone-200'
          }`}
          title="Bold"
        >
          <Bold size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
            editor.isActive('italic')
              ? 'bg-clea-coral text-white'
              : 'text-stone-600 hover:bg-stone-200'
          }`}
          title="Italic"
        >
          <Italic size={16} />
        </button>

        <div className="w-[1px] h-5 bg-stone-300 mx-1"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
            editor.isActive('bulletList')
              ? 'bg-clea-coral text-white'
              : 'text-stone-600 hover:bg-stone-200'
          }`}
          title="Bullet List"
        >
          <List size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
            editor.isActive('orderedList')
              ? 'bg-clea-coral text-white'
              : 'text-stone-600 hover:bg-stone-200'
          }`}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
            editor.isActive('blockquote')
              ? 'bg-clea-coral text-white'
              : 'text-stone-600 hover:bg-stone-200'
          }`}
          title="Expert Tip / Quote"
        >
          <Quote size={16} />
        </button>

        <div className="w-[1px] h-5 bg-stone-300 mx-1"></div>

        <button
          type="button"
          onClick={setLink}
          className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
            editor.isActive('link')
              ? 'bg-clea-coral text-white'
              : 'text-stone-600 hover:bg-stone-200'
          }`}
          title="Insert Link"
        >
          <LinkIcon size={16} />
        </button>

        <button
          type="button"
          onClick={addImage}
          className="p-1.5 rounded-lg text-xs font-bold text-stone-600 hover:bg-stone-200 transition-all"
          title="Insert Image URL"
        >
          <ImageIcon size={16} />
        </button>

        <div className="w-[1px] h-5 bg-stone-300 mx-1"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-1.5 rounded-lg text-xs font-bold text-stone-600 hover:bg-stone-200 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          title="Undo"
        >
          <RotateCcw size={15} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-1.5 rounded-lg text-xs font-bold text-stone-600 hover:bg-stone-200 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          title="Redo"
        >
          <RotateCw size={15} />
        </button>
      </div>

      {/* Editor Body */}
      <div className="p-6">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
