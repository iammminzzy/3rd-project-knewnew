import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { editProfile, getProfile } from '../api';
import { GetProfileQueryType } from '../types/user';
import Detail from './Detail';

function App() {
  const [profile, setProfile] = useState<GetProfileQueryType>();

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

  if (getProfileQuery.isLoading) {
    return <span>loading...</span>;
  }

  return (
    <div>
      {profile?.nickname}
      <button onClick={() => editProfileMutation.mutate({ nickname: 'zxcv' })}>
        수정
      </button>
      <Detail id={1} />
    </div>
  );
}

export default App;
