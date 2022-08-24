export interface GetFeedQueryType {
  id: number;
  nickname: string;
  writertag: string;
  profileImage: string;
  img: [{ id: number; url: string }];
  content: string;
  modified: boolean;
  score: number;
}
