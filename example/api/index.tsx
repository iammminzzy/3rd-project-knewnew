import axios from 'axios';

const baseURL = 'dev.knewnnew.com/';

interface GetProfileType {
  token: string;
  id?: number;
}

export const getProfile = async ({ token, id }: GetProfileType) => {
  const profile = await axios.get(baseURL + 'user/', {
    headers: {
      // token
    },
  });
  if (profile) {
    return profile.data;
  }
};
interface EditProfile {
  token: string;
  id: number;
  profileImage?: string;
  nickname: string;
}

export const editProfile = async ({
  token,
  id,
  nickname,
  profileImage,
}: EditProfile) => {
  const profile = await axios.post(
    baseURL + 'user/',
    {
      nickname,
      profileImage,
    },
    {
      headers: {
        // token
      },
    }
  );
  if (profile) {
    return profile.data;
  }
};
