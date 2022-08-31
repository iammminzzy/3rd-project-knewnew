import React from 'react';
import { GetProfileQueryType } from '../types/user';

interface DetailProps {
  profile: GetProfileQueryType;
  setProfile: (editedProfile: GetProfileQueryType) => void;
}

function Detail({ profile, setProfile }: DetailProps) {
  const handle = () => {
    setProfile({
      profileImage: 'a',
      nickname: 'zz',
      satisfaction: 'question',
      id: 0,
    });
  };

  return <div></div>;
}

export default Detail;
