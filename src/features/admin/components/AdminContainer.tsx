import { usePosts } from '@/hooks/usePost';
import { Link, useNavigate } from 'react-router-dom';
import { formatDateLong } from '@/utils';
import { SquarePen, Trash } from 'lucide-react';
import { useDeletePost } from '@/hooks/usePost';

const AdminContainer = () => {
  const { mutate } = useDeletePost();
  const { data: posts } = usePosts();
  const navigate = useNavigate();

  const handleEdit = (id: string | number) => {
    navigate(`/admin/blog/edit/${id}`);
  };

  const handleDelete = (id: string | number, title: string) => {
    if (window.confirm(`"${title}" 포스트를 정말 삭제하시겠습니까?`)) {
      mutate(id);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">게시물 관리</h1>

      <div className="border border-hover-black rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-low text-gray-400 uppercase">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hover-black">
            {posts?.map((post) => (
              <tr key={post.id} className="hover:bg-hover-black cursor-pointer">
                <td className="px-6 py-4 font-medium">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {formatDateLong(post.created_at)}
                </td>
                <td className="flex px-6 py-4 text-right space-x-3">
                  <SquarePen
                    onClick={() => handleEdit(post.id!)}
                    className="hover:text-primary cursor-pointer"
                  />
                  <Trash
                    onClick={() => handleDelete(post.id!, post.title)}
                    className="hover:text-error cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminContainer;
