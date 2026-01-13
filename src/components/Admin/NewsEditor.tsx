"use client"

import { API_BASE_URL } from '../../config/api';
import { FaBold, FaItalic, FaStrikethrough  } from "react-icons/fa6";
import { MdFormatListBulleted, MdFormatUnderlined, MdOutlineImage } from "react-icons/md";
import { AiOutlineOrderedList } from "react-icons/ai";
import { RiMenu2Fill, RiMenu3Fill, RiMenu5Fill } from "react-icons/ri";
import { TbBallpenOff, TbLink, TbLinkOff } from "react-icons/tb";
import UploadImage from "../../assets/upload.png";
import toast, { Toaster } from "react-hot-toast";
import { MdPreview } from "react-icons/md";

import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { useAuthUser } from "../../hooks/useAuthUser";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import ImageResize from "tiptap-extension-resize-image";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import Gapcursor from "@tiptap/extension-gapcursor";
import { TextStyle } from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import { HexColorPicker } from "react-colorful";
import { Modal } from "@mui/material";

const fonts = [
  { label: "Inter", value: "Inter" },
  { label: "Comic Sans", value: '"Comic Sans MS", "Comic Sans"' },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "monospace" },
  { label: "Cursive", value: "cursive" },
  { label: "CSS Variable", value: "var(--title-font-family)" },
  { label: "Exo 2", value: '"Exo 2"' },
  { label: "Arial", value: "Arial" },
  { label: "Helvetica", value: "Helvetica" },
  { label: "Verdana", value: "Verdana" },
  { label: "Tahoma", value: "Tahoma" },
  { label: "Trebuchet MS", value: "Trebuchet MS" },
  { label: "Geneva", value: "Geneva" },
  { label: "Times New Roman", value: '"Times New Roman", Times, serif' },
  { label: "Georgia", value: "Georgia" },
  { label: "Garamond", value: "Garamond" },
  { label: "Palatino", value: "Palatino" },
  { label: "Bookman", value: "Bookman" },
  { label: "Courier New", value: '"Courier New", Courier, monospace' },
  { label: "Lucida Console", value: "Lucida Console, Monaco, monospace" },
  { label: "Monaco", value: "Monaco" },
  { label: "Consolas", value: "Consolas" },
  { label: "Brush Script", value: '"Brush Script MT", cursive' },
  { label: "Impact", value: "Impact, fantasy" },
];

interface NewsEditorProps {
  existingNews?: {
    _id: string;
    title: string;
    content: string;
    image: string;
    author: string;
    status: string;
  };
}

const NewsEditor = ({ existingNews }: NewsEditorProps) => {
  const { data: authUser } = useAuthUser();
  
  console.log('NewsEditor mounted with existingNews:', existingNews);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Document,
      Text,
      Paragraph,
      ListItem,
      BulletList,
      OrderedList,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Gapcursor,
      TextStyle,
      Underline,
      FontFamily,
      Highlight.configure({multicolor: true}),
      Image,
      TextAlign.configure({ 
        types: ["heading", "paragraph"] 
      }),
      ImageResize,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Placeholder.configure({
        placeholder: 'Start typing your article content here...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: existingNews?.content || "<p></p>",
    editable: true,
    autofocus: true,
    onUpdate: ({ editor }) => {
      console.log('Editor content:', editor.getHTML());
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'tiptap-editor',
        spellcheck: 'false',
      },
    },
  });
  
  const [previewOpen, setPreviewOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState(existingNews?.title || '');
  const [content, setContent] = useState(existingNews?.content || '');
  // Auto-populate author with admin username (hidden from user)
  const author = existingNews?.author || authUser?.username || 'MAIS School';
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(existingNews?.image || null);
  const [saveAs, setSaveAs] = useState<'draft' | 'pending'>('draft');
  
  console.log('Editor state:', { title, author, hasImage: !!imagePreview, hasEditor: !!editor });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const processImageFile = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent, status: 'draft' | 'pending' = 'draft') => {
    e.preventDefault();
    const editorContent = editor?.getHTML() || "";
    console.log("Image:", image);
    console.log("Title:", title);
    console.log("Content:", editorContent);
    console.log("Author:", author);
    console.log("Status:", status);
    
    // For updates, image is optional if already exists
    if (!existingNews && !image) {
      toast.error("Please select an image.");
      return;
    }
    
    if (!title || !editorContent) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    if (image) formData.append('image', image);
    formData.append('title', title);
    formData.append('content', editorContent);
    formData.append('author', author);
    formData.append('status', status);
    
    console.log('FormData contents:');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
    }

    try {
      const url = existingNews 
        ? `${API_BASE_URL}/api/news/update/${existingNews._id}`
        : `${API_BASE_URL}/api/news/create`;
      const method = existingNews ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
        credentials: 'include',
      });

      const data = await response.json();
      if (data.success) {
        const action = existingNews ? 'updated' : 'created';
        const statusText = status === 'draft' ? 'as draft' : 'and submitted for approval';
        toast.success(`News ${action} successfully ${statusText}!`);
        
        if (!existingNews) {
          // Reset form for new news
          setTitle('');
          setImage(null);
          setImagePreview(null);
          editor?.commands.setContent('<p></p>');
        }
      } else {
        console.error('Error saving news:', data.error);
        toast.error(data.error || 'Error saving news');
      }
    } catch (error) {
      console.error('Error saving news:', error);
      toast.error("Error saving news. Don't insert pictures larger than 1mb in content.");
    }
  };

  const [highlightColor, setHighlightColor] = React.useState("#ff0000");
  const [showPicker, setShowPicker] = React.useState(false);


  const setLink = () => {
    const previousUrl = editor?.getAttributes("link").href; 
    const url = window.prompt("Enter the URL", previousUrl || "https://");
  
    if (url === null || url.trim() === "") return;
  
    const validUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
  
    editor?.chain().focus().extendMarkRange("link").setLink({ href: validUrl }).run();
  };
  
  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFont = event.target.value;
    if (selectedFont && editor) {
      editor.chain().focus().setFontFamily(selectedFont).run();
    }
  };

  const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      editor?.chain().focus().setImage({ src: base64 }).run();
    };
    reader.readAsDataURL(file);
  };

  const handlePreview = () => {
    setPreviewOpen(true);
    toast.success("Preview opened!");
  };
  
  if (!editor) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">Initializing editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">
                {existingNews ? 'Edit News Article' : 'Publish School News'}
              </h1>
              <p className="text-gray-600">
                {existingNews 
                  ? 'Update your article and manage its status'
                  : 'Create and share important updates with the school community'
                }
              </p>
              {existingNews && (
                <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  Status: {(existingNews.status || 'draft').toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3 flex-shrink-0 flex-wrap">
              <button
                onClick={handlePreview}
                className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-200"
              >
                <MdPreview fontSize={20}/>
                <span className="font-medium">Preview</span>
              </button>
              <button
                onClick={(e) => handleSubmit(e, 'draft')}
                className="flex items-center space-x-2 px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md"
              >
                <span className="font-medium">Save as Draft</span>
              </button>
              <button
                onClick={(e) => handleSubmit(e, 'pending')}
                className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
              >
                <span className="font-medium">Submit for Approval</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Article Details Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">Article Details</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Article Title *</label>
              <input
                value={title}
                onChange={handleInputChange}
                placeholder="Enter a descriptive title..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image *</label>
              <label 
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {imagePreview ? (
                  <img
                    src={imagePreview as string}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <img src={UploadImage} alt="Upload" className="w-16 h-16 mb-3 opacity-50 group-hover:opacity-70" />
                    <p className="text-sm text-gray-500 group-hover:text-indigo-600">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, or WEBP (MAX. 5MB)</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Editor Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">Article Content</h2>
            
            {/* Formatting Toolbar */}
            <div className="sticky top-0 z-10 bg-white border border-gray-200 rounded-lg shadow-sm mb-4 p-3">
              <div className="flex flex-wrap items-center gap-2">
                {/* Text Style Dropdown */}
                <div className="flex items-center border-r border-gray-200 pr-3">
                  <select
                    onChange={(e) => {
                      const level = parseInt(e.target.value);
                      if (level) {
                        editor.chain().focus().toggleHeading({ level: level as any }).run();
                      }
                    }}
                    defaultValue=""
                    className="text-sm border border-gray-200 rounded px-2 py-1.5"
                  >
                    <option value="">Normal Text</option>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                    <option value="4">Heading 4</option>
                    <option value="5">Heading 5</option>
                    <option value="6">Heading 6</option>
                  </select>
                </div>

                {/* Font Selector */}
                <div className="flex items-center border-r border-gray-200 pr-3">
                  <select 
                    onChange={handleFontChange} 
                    defaultValue="" 
                    className="text-sm border border-gray-200 rounded px-2 py-1.5"
                  >
                    <option value="" disabled>Select Font</option>
                    {fonts.map((font) => (
                      <option key={font.value} value={font.value}>
                        {font.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Text Formatting */}
                <div className="flex items-center gap-1 border-r border-gray-200 pr-3">
                  <button 
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-indigo-100 text-indigo-700' : ''}`}
                    title="Bold"
                  >
                    <FaBold />
                  </button>
                  <button 
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-indigo-100 text-indigo-700' : ''}`}
                    title="Italic"
                  >
                    <FaItalic />
                  </button>
                  <button 
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('underline') ? 'bg-indigo-100 text-indigo-700' : ''}`}
                    title="Underline"
                  >
                    <MdFormatUnderlined fontSize={20}/>
                  </button>
                  <button 
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('strike') ? 'bg-indigo-100 text-indigo-700' : ''}`}
                    title="Strikethrough"
                  >
                    <FaStrikethrough />
                  </button>
                </div>

                {/* Highlight Color */}
                <div className="flex items-center gap-1 border-r border-gray-200 pr-3">
                  <div style={{ position: "relative", display: "inline-block" }}>
                    <button
                      style={{
                        backgroundColor: highlightColor,
                        width: "24px", 
                        height: "24px", 
                        borderRadius: "4px", 
                        border: "2px solid #e5e7eb", 
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setShowPicker(!showPicker); 
                        editor.chain().focus().toggleHighlight({ color: highlightColor }).run()
                      }}
                      className={`hover:scale-110 transition-transform ${editor.isActive('highlight', { color: highlightColor }) ? 'ring-2 ring-indigo-500' : ''}`}
                      title="Highlight Color"
                    >
                    </button>
                    {showPicker && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%", 
                          left: "50%",
                          transform: "translateX(-50%)", 
                          zIndex: 1000, 
                          marginTop: "8px", 
                          background: "#fff",
                          padding: "10px",
                          borderRadius: "8px",
                          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                        }}
                      >
                        <HexColorPicker color={highlightColor} onChange={setHighlightColor} />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => editor.chain().focus().unsetHighlight().run()}
                    disabled={!editor.isActive('highlight')}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-30"
                    title="Remove Highlight"
                  >
                    <TbBallpenOff fontSize={20}/>
                  </button>
                </div>

                {/* Insert Options */}
                <div className="flex items-center gap-1 border-r border-gray-200 pr-3">
                  <label className="p-2 rounded hover:bg-gray-100 cursor-pointer" title="Insert Image">
                    <MdOutlineImage fontSize={20}/>
                    <input type="file" accept="image/*" onChange={addImage} className="hidden" />
                  </label>
                  <button 
                    onClick={setLink} 
                    className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("link") ? 'bg-indigo-100 text-indigo-700' : ''}`}
                    title="Insert Link"
                  >
                    <TbLink fontSize={20}/>
                  </button>
                  <button 
                    onClick={() => editor.chain().focus().unsetLink().run()} 
                    disabled={!editor.isActive("link")}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-30"
                    title="Remove Link"
                  >
                    <TbLinkOff fontSize={20}/>
                  </button>
                </div>

                {/* Text Alignment */}
                <div className="flex items-center gap-1 border-r border-gray-200 pr-3">
                  <button
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: 'left' }) ? 'bg-indigo-100 text-indigo-700' : ''}`}
                    title="Align Left"
                  >
                    <RiMenu2Fill fontSize={20}/>
                  </button>
                  <button
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: 'center' }) ? 'bg-indigo-100 text-indigo-700' : ''}`}
                    title="Align Center"
                  >
                    <RiMenu5Fill fontSize={20}/>
                  </button>
                  <button
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: 'right' }) ? 'bg-indigo-100 text-indigo-700' : ''}`}
                    title="Align Right"
                  >
                    <RiMenu3Fill fontSize={20}/>
                  </button>
                </div>

                {/* Lists */}
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-indigo-100 text-indigo-700' : ''}`}
                    title="Bullet List"
                  >
                    <MdFormatListBulleted fontSize={20}/>
                  </button>
                  <button 
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-indigo-100 text-indigo-700' : ''}`}
                    title="Numbered List"
                  >
                    <AiOutlineOrderedList fontSize={20}/>
                  </button>
                </div>
              </div>
            </div>

            {/* Editor Content Area */}
            <div className="border border-gray-300 rounded-lg min-h-[400px] bg-white shadow-inner">
              <div className="p-6 min-h-[400px] cursor-text" onClick={() => editor.chain().focus().run()}>
                <EditorContent editor={editor} />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Write your article content above. Use the formatting toolbar to style your text.
            </p>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .ProseMirror {
          outline: none !important;
          min-height: 400px;
          cursor: text;
          caret-color: black;
          font-size: 16px;
          line-height: 1.6;
        }
        
        .ProseMirror:focus {
          outline: none !important;
        }
        
        .ProseMirror.ProseMirror-focused {
          outline: none !important;
        }
        
        .tiptap-editor {
          outline: none !important;
        }
        
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        
        .tiptap {
          :first-child {
            margin-top: 0;
          }
        }
        
        .tiptap h1,
        .tiptap h2,
        .tiptap h3,
        .tiptap h4,
        .tiptap h5,
        .tiptap h6 {
          line-height: 1.1;
          margin-top: 2.5rem;
          text-wrap: pretty;
        }

        .tiptap h1,
        .tiptap h2 {
          margin-top: 3.5rem;
          margin-bottom: 1.5rem;
        }

        .tiptap h1 {
          font-size: 1.4rem;
        }

        .tiptap h2 {
          font-size: 1.2rem;
        }

        .tiptap h3 {
          font-size: 1.1rem;
        }

        .tiptap h4,
        .tiptap h5,
        .tiptap h6 {
          font-size: 1rem;
        }
        
        .ProseMirror h1 {
          font-size: 1.8rem !important;
          font-weight: bold !important;
          margin-top: 2.5rem !important;
          margin-bottom: 1rem !important;
          line-height: 1.1 !important;
        }
        
        .ProseMirror h2 {
          font-size: 1.5rem !important;
          font-weight: bold !important;
          margin-top: 2rem !important;
          margin-bottom: 0.75rem !important;
          line-height: 1.1 !important;
        }
        
        .ProseMirror h3 {
          font-size: 1.3rem !important;
          font-weight: bold !important;
          margin-top: 1.5rem !important;
          margin-bottom: 0.5rem !important;
          line-height: 1.1 !important;
        }
        
        .ProseMirror h4 {
          font-size: 1.1rem !important;
          font-weight: bold !important;
          margin-top: 1.25rem !important;
          margin-bottom: 0.5rem !important;
          line-height: 1.1 !important;
        }
        
        .ProseMirror h5 {
          font-size: 1rem !important;
          font-weight: bold !important;
          margin-top: 1rem !important;
          margin-bottom: 0.5rem !important;
          line-height: 1.1 !important;
        }
        
        .ProseMirror h6 {
          font-size: 0.9rem !important;
          font-weight: bold !important;
          margin-top: 1rem !important;
          margin-bottom: 0.5rem !important;
          line-height: 1.1 !important;
        }
        
        .ProseMirror ul {
          list-style-type: disc !important;
          padding-left: 1.5em !important;
          margin: 1em 0 !important;
        }
        
        .ProseMirror ol {
          list-style-type: decimal !important;
          padding-left: 1.5em !important;
          margin: 1em 0 !important;
        }
        
        .ProseMirror li {
          display: list-item !important;
          padding: 0.2em 0 !important;
        }
        
        .ProseMirror li p {
          margin: 0 !important;
          display: inline !important;
        }
        
        .ProseMirror p {
          margin: 0.8em 0 !important;
        }
        
        .ProseMirror {
          min-height: 100px;
          padding: 0.5em !important;
        }
        
        .ProseMirror ul li::marker,
        .ProseMirror ol li::marker {
          display: inline !important;
          color: currentColor !important;
        }
      ` }} />
      <Toaster/>
      <Modal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        className="flex items-center justify-center"
      >
        <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto m-4 border border-gray-200">
          {/* Image Section */}
          {imagePreview && (
            <div className="relative h-64 overflow-hidden">
              <img
                src={imagePreview as string}
                alt="Preview"
                className="w-full h-full object-fill"
              />
            </div>
          )}
          
          {/* Content Section */}
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewsEditor;
