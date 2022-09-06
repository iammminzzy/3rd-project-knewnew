export interface UserInfoProps {
  userInfo: {
    social_id: number;
    social_type: socialType;
    nickname: string;
    is_new: boolean;
    access_token: string;
    refresh_token: string;
  };
}

enum socialType {
  'kakao',
  'naver',
}

export interface OptionProps {
  style?: string;
  family?: string;
  occupation?: string;
}
