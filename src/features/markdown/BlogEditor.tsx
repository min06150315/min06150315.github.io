import { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css'; // 기본 스타일
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'; // 다크 모드 테마

const BlogEditor = () => {
  const editorRef = useRef<Editor>(null);

  const handleSave = () => {
    // 에디터에 입력된 내용을 마크다운 형식으로 가져오기
    const content = editorRef.current?.getInstance().getMarkdown();
    console.log('저장할 내용:', content);

    // 이후 Supabase DB에 저장하는 로직(insert)을 여기에 연결하면 됩니다.
  };

  return (
    <div className="p-4 bg-surface-container-lowest min-h-screen">
      <h2 className="text-on-surface text-2xl font-bold mb-6">
        새 글 작성하기
      </h2>

      <Editor
        ref={editorRef}
        initialValue="내용을 입력하세요."
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        theme="dark"
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          ['code', 'codeblock'],
        ]}
      />

      <button
        onClick={handleSave}
        className="mt-6 px-8 py-3 bg-primary text-on-surface rounded-lg hover:bg-primary-hover transition-all font-bold"
      >
        포스트 등록
      </button>
    </div>
  );
};

export default BlogEditor;
