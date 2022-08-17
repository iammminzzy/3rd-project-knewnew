export interface GetProfileQueryType {
  id: number;
  nickname: string;
  profileImage: string;
  satisfaction: 'best' | 'good' | 'bad' | 'question';
}
