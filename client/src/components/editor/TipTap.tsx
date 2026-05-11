import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TipTapProps {
    value : string;
    onChange : (value : string) => void;
}
const Tiptap = ({ value, onChange }: TipTapProps) => {
  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: value, // initial content
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  if(!editor) {
    return null;
  }

  return (
    <div className="border rounded-md p-2">
      <EditorContent editor={editor} className=" prose"/>
     
    </div>
  );
};

export default Tiptap;
