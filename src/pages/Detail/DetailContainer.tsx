import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getDetail } from '../../api/fetchDetail';
import { DetailType } from '../../types/detail';

import Loader from '../../components/Loader/Loader';
import DetailPresenter from './DetailPresenter';

const DetailContainer = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery<DetailType>(['getDetail', id], () =>
    getDetail(id)
  );

  if (isLoading || !data) {
    return <Loader />;
  }
  return <DetailPresenter data={data} />;
};

export default DetailContainer;
