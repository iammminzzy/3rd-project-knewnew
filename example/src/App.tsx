/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { editProfile, getProfile } from '../api';
import { GetProfileQueryType } from '../types/user';
import Detail from './Detail';

interface UserInfoType {
  nickname: string;
  image: string;
  age: number;
}

function App() {
  const [profile, setProfile] = useState<GetProfileQueryType>({
    id: 0,
    nickname: 'string;',
    profileImage: 'string;',
    satisfaction: 'best',
  });
  const [userInput, setUserInput] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfoType>();

  const getProfileQuery = useQuery<GetProfileQueryType, Error>(
    'getProfile',
    () => getProfile({ token: 'abcToken', id: 1 }),
    {
      onSuccess: data => {
        setProfile(data);
      },
    }
  );

  const editProfileMutation = useMutation(
    'editProfile',
    async ({ nickname }: { nickname: string }) => {
      const res = await editProfile({ token: 'abcToken', id: 1, nickname });
      return res;
    },
    {
      onSuccess: data => {
        setProfile(data);
      },
    }
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  if (getProfileQuery.isLoading) {
    return <span>loading...</span>;
  }

  return (
    <>
      <div>
        {profile?.nickname}
        <button
          onClick={() => editProfileMutation.mutate({ nickname: 'zxcv' })}
        >
          수정
        </button>
        <div>{userInfo?.nickname}</div>
        <input onChange={handleInput} />
        <Detail
          profile={profile}
          setProfile={(editedProfile: GetProfileQueryType) =>
            setProfile(editedProfile)
          }
        />
      </div>
    </>
  );
}

export default App;
