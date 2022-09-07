export interface GetFeedQueryType {
  id: number;
  user: {
    id: number;
    nickname: string;
    profile_image: string | null;
    tag: string;
  };
  reaction: {
    id: number;
    name: string;
  };
  product: {
    id: number;
    name: string;
  };
  description: string;
  images: [{ id: number; order: number; url: string; review: number }];
  view_count: number;
  comment_count: number;
  like_count: number;
  bookmark_count: number;
  is_updated: boolean;

  parent_review: {
    id: number;
    user: {
      id: number;
      nickname: string;
      profile_image: string | null;
      tag: string;
    };
    reaction: {
      id: number;
      name: string;
    };
    product: {
      id: number;
      name: string;
    };
    description: string;
    images: [{ id: number; order: number; url: string; review: number }];
  };
}

export interface GetDetailQueryType extends GetFeedQueryType {
  hashtags: string[];
  timeBefore: number;
  store?: string;
}
