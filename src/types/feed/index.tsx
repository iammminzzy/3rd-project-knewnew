export interface GetFeedQueryType {
  id: number;
  nickname: string;
  writertag: string;
  profileImage: string;
  img: [{ id: number; url: string }];
  content: string;
  modified: boolean;
  score: number;
  map: any;
}

export interface GetDetailQueryType extends GetFeedQueryType {
  hashtags: string[];
  timeBefore: number;
  store?: string;
}
