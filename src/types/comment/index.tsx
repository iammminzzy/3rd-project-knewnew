export interface CommentType {
  comment_id: number;
  comment_user_id: number;
  comment_user_name: string;
  comment_created_at: string;
  comment_like_count: number;
  comment_description: string;
  in_comment: [
    {
      in_comment_id: number;
      in_comment_user_id: number;
      in_comment_user_name: string;
      in_comment_created_at: string;
      in_comment_like_count: number;
      in_comment_description: string;
    }
  ];
}
