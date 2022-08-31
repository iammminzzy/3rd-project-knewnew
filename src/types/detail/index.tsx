export interface DetailType {
  id: number;
  parent_review_id: number;
  reaction: string;
  product: string;
  retailer: string;
  description: string;
  view_count: number;
  quotation_count: number;
  like_count: number;
  bookmark_count: number;
  share_count: number;
  is_updated: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  images: [{ order: number; url: string }];
  food_tags: [string];
  user: {
    id: number;
    profile_image: string;
    nickname: string;
    tags: string;
    introduction_tags: [string];
  };
}
