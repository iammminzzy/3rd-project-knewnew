import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getDetail } from '../../api/fetchDetail';
import { DetailType } from '../../types/detail';

import Loading from '../../components/Status/Loading';
import DetailPresenter from './DetailPresenter';
import Error from '../../components/Status/Error';

const DetailContainer = () => {
  const { id } = useParams();
  console.log(id);
  const { isLoading, isError, data } = useQuery<DetailType>(
    ['getDetail', id],
    () => getDetail(id)
  );

  if (isLoading || !data) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return <DetailPresenter data={data} />;
};

export default DetailContainer;
