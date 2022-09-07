import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getComment } from '../../api/fetchComment';
import { postComment } from '../../api/fetchComment';
import { CommentType } from '../../types/comment';

import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

import CommentPresenter from './CommentPresenter';
import Loading from '../Status/Loading';
import Error from '../Status/Error';

const Comments = () => {
  const { id } = useParams();
  const ACCESS_TOKEN = useSelector(
    (state: RootState) => state.tokenState.value
  );
  const [comments, setComments] = useState<CommentType[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [reComment, setReComment] = useState({
    ninkname: '',
    id: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleCancel = () => {
    setInputValue('');
    setReComment({
      ninkname: '',
      id: 0,
    });
  };
  const handleAddComment = (event: React.FormEvent<HTMLFormElement>) => {
    const update = async () => {
      setComments(
        await postComment(ACCESS_TOKEN, id, reComment.id, inputValue)
      );
    };
    event.preventDefault();
    if (reComment.ninkname.length > 0) {
      setInputValue('');
      setReComment({
        ninkname: '',
        id: 0,
      });
    }
    update();
    setInputValue('');
  };

  const handleReComment = (ninkname: string, id: number) => {
    setReComment({
      ninkname,
      id,
    });
  };

  const { isLoading, isError } = useQuery<CommentType[]>(
    ['getComment', id],
    () => getComment(id),
    {
      onSuccess: data => {
        setComments(data);
      },
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <CommentPresenter
      data={comments}
      inputValue={inputValue}
      reComment={reComment}
      handleChange={handleChange}
      handleCancel={handleCancel}
      handleAddComment={handleAddComment}
      handleReComment={handleReComment}
    />
  );
};

export default Comments;
