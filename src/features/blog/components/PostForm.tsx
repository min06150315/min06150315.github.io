import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Post } from '@/types';
import React, { useEffect, useRef, useState } from 'react';
import { NavButton } from '@/components/ui';
import { Image, X } from 'lucide-react';
import { uploadImage } from '@/lib/supabase';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

const blogSchema = z.object({
  title: z.string().min(2, '제목은 최소 2글자 이상이어야 합니다.').max(50),
  content: z.string().min(5, '내용은 최소 5글자 이상 적어주세요.'),
});

export type PostFormData = z.infer<typeof blogSchema>;

interface PostFormProps {
  initialData?: Post | null;
  onSubmit: (data: PostFormData, imageFile: File | null) => void;
  isLoading: boolean;
}

const PostForm = ({ initialData, onSubmit, isLoading }: PostFormProps) => {
  const [preview, setPreview] = useState<string | null>(
    initialData?.thumbnail_image || null,
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editorRef = useRef<Editor>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        content: initialData.content,
      });
      editorRef.current?.getInstance().setMarkdown(initialData.content);
    }
  }, [initialData, reset]);

  const handleEditorChange = () => {
    const markdown = editorRef.current?.getInstance().getMarkdown() || '';
    setValue('content', markdown);
    trigger('content');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEditorImageUpload = async (
    blob: Blob | File,
    callback: (url: string, altText: string) => void,
  ) => {
    try {
      const imageUrl = await uploadImage(blob as File, 'content');
      callback(imageUrl, 'image_content');
    } catch (error) {
      console.error('Editor Image Upload Error:', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, selectedFile))}
      className="space-y-6 max-w-3xl mx-auto"
    >
      <div className="mb-8">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        {preview ? (
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-hover-black">
            <img
              src={preview}
              alt="Thumbnail preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-3 right-3 p-1.5 bg-black/50 hover:bg-black rounded-full text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full aspect-video rounded-xl border-2 border-dashed border-hover-black flex flex-col items-center justify-center gap-y-3 text-slate-500 hover:bg-[#161616] hover:border-slate-700 transition-all"
          >
            <Image size={40} strokeWidth={1.5} />
            <span className="text-sm">썸네일 이미지 추가</span>
          </button>
        )}
      </div>

      <div>
        <input
          {...register('title')}
          type="text"
          placeholder="제목을 입력하세요"
          className="w-full bg-transparent text-4xl font-bold border-none outline-none --color-base-light-gray placeholder:text-slate-600 "
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-2">{errors.title.message}</p>
        )}
      </div>

      <div className="h-px bg-base-gray mb-8" />

      <div
        className="prose prose-invert max-w-none 
                [&_.toastui-editor-defaultUI]:border-none 
                [&_.toastui-editor-defaultUI]:rounded-xl 
                [&_.toastui-editor-defaultUI]:overflow-hidden
                border border-[#333] rounded-xl overflow-hidden focus-within:border-slate-500 transition-colors"
      >
        <Editor
          ref={editorRef}
          initialValue={initialData?.content || ' '}
          previewStyle="vertical"
          height="calc(100vh - 300px)"
          initialEditType="markdown"
          hideModeSwitch={true}
          useCommandShortcut={true}
          theme="dark"
          onChange={handleEditorChange}
          toolbarItems={[
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'task', 'indent', 'outdent'],
            ['table', 'image', 'link'],
            ['code', 'codeblock'],
          ]}
          hooks={{
            addImageBlobHook: handleEditorImageUpload,
          }}
        />
        {/* react-hook-form의 유효성 검사를 위해 숨겨진 input 등록 (선택사항) */}
        <input type="hidden" {...register('content')} />

        {errors.content && (
          <p className="text-red-500 text-sm mt-4">{errors.content.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-x-3">
        <NavButton
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="px-6 py-2 rounded-full disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? '저장 중...' : initialData ? '수정하기' : '작성하기'}
        </NavButton>
      </div>
    </form>
  );
};

export default PostForm;
