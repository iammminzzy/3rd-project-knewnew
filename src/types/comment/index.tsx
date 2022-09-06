export interface CommentType {
  id: number;
  created_at: string;
  like_count: number;
  description: string;
  user: {
    id: number;
    nickname: string;
    profile_image: string;
  };
  child_comments: [
    {
      id: number;
      created_at: string;
      like_count: number;
      description: string;
      user: {
        id: number;
        nickname: string;
        profile_image: string;
      };
    }
  ];
}
