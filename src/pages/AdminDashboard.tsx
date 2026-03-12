// src/pages/admin/AdminDashboard.tsx
import { usePosts } from '@/hooks/usePost';
import { useNavigate } from 'react-router-dom';
import { formatDateLong } from '@/utils';

export const AdminDashboard = () => {
  const { data: posts } = usePosts();
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Post Management</h1>
        <button
          onClick={() => navigate('/blog/write')}
          className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
        >
          New Post
        </button>
      </div>

      <div className="bg-[#111] border border-[#222] rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1a1a1a] text-gray-400 uppercase">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#222]">
            {posts?.map((post) => (
              <tr key={post.id} className="hover:bg-[#161616]">
                <td className="px-6 py-4 font-medium">{post.title}</td>
                <td className="px-6 py-4 text-gray-500">
                  {formatDateLong(post.created_at)}
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button
                    onClick={() => navigate(`/blog/edit/${post.id}`)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
