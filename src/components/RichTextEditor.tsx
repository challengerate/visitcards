import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Typography from '@tiptap/extension-typography'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Bold, 
  Italic, 
  Heading1, 
  List, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Undo,
  Redo,
} from 'lucide-react'

interface RichTextEditorProps {
  onChange: (content: string) => void
  value: string
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-1 mb-2 p-1 border-b">
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        variant={editor.isActive('bold') ? 'default' : 'outline'}
        size="sm"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        variant={editor.isActive('italic') ? 'default' : 'outline'}
        size="sm"
      >
        <Italic className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'outline'}
        size="sm"
      >
        <Heading1 className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        variant={editor.isActive('bulletList') ? 'default' : 'outline'}
        size="sm"
      >
        <List className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'outline'}
        size="sm"
      >
        <AlignLeft className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'outline'}
        size="sm"
      >
        <AlignCenter className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'outline'}
        size="sm"
      >
        <AlignRight className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        variant="outline"
        size="sm"
      >
        <Undo className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        variant="outline"
        size="sm"
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  )
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ onChange, value }) => {
  const editor = useEditor({
    extensions: [
          //@ts-ignore
      StarterKit.configure({
        heading: {
          levels: [1],
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Typography,
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[200px] px-3 py-2',
      },
    },
  })

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '')
    }
  }, [value, editor])

  return (
    <div className="border rounded-md">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default RichTextEditor