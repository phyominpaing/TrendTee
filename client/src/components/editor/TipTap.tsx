import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "../ui/button";
import { Bold, Italic, List } from "lucide-react";
import { useEffect } from "react";

interface TipTapProps {
  value: string;
  onChange: (value: string) => void;
}
const Tiptap = ({ value, onChange }: TipTapProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  if (!editor) return null;

  return (
    <div className="rounded-lg border p-2 transition-colors has-[.ProseMirror:focus-visible]:border-ring has-[.ProseMirror:focus-visible]:ring-1 has-[.ProseMirror:focus-visible]:ring-ring/50">
      <div className="flex items-center gap-2 mb-4">
        <Button
          type="button"
          size={"sm"}
          variant={editor.isActive("bold") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size={"sm"}
          variant={editor.isActive("italic") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size={"sm"}
          variant={editor.isActive("bulletList") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size={"sm"}
          variant={editor.isActive("orderedList") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
      <EditorContent
        editor={editor}
        className="prose max-w-none [&_.ProseMirror]:outline-none"
      />
    </div>
  );
};

export default Tiptap;
