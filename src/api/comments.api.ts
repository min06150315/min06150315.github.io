import supabase from "@/lib/supabase";
import type { Comment } from "@/types";

export const getCommentById = async (commentId: number): Promise<Comment> => {
    const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("id", commentId)
        .maybeSingle();

    if (error) throw new Error(error.message);
    return data as Comment;
}

export const getCommentsByPostId = async (postId: number): Promise<Comment[]> => {
    const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: true });
        
    if (error) throw new Error(error.message);
    return data as Comment[];
}

export const createComment = async (postId: number, content: string): Promise<Comment> => {
    const {data: {user} } = await supabase.auth.getUser();
    if (!user) throw new Error("로그인이 필요합니다.");
    
    const { data, error } = await supabase
        .from("comments")
        .insert({ 
            post_id: postId,
            user_id: user.id,
            author_name: user.user_metadata.full_name || user.email?.split('@')[0],
            author_avatar: user.user_metadata.avatar_url,
            github_id: user.user_metadata.user_name || undefined,
            content, 
        })
        .select("*")
        .maybeSingle();

    if (error) throw new Error(error.message);
    return data as Comment;
};

export const updateComment = async (commentId: number, content: string): Promise<void> => {
    const { error } = await supabase
        .from("comments")
        .update({ content })
        .eq("id", commentId);

    if (error) throw new Error(error.message);
};

export const deleteComment = async (commentId: number): Promise<void> => {
    const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);

    if (error) throw new Error(error.message);
};