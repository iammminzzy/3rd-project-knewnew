import React from 'react';
import { useQuery } from 'react-query';
import { getDetail } from '../../api/fetchDetail';
import { DetailType } from '../../types/detail';

import Loader from '../../components/Loader/Loader';
import DetailPresenter from './DetailPresenter';

const DetailContainer = () => {
  const { isLoading, data } = useQuery<DetailType>('getDetail', getDetail);

  if (isLoading || !data) {
    return <Loader />;
  }
  return <DetailPresenter data={data} />;
};

export default DetailContainer;
