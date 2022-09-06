import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getComment } from '../../api/fetchComment';
import { postComment } from '../../api/fetchComment';
import { CommentType } from '../../types/comment';

import Loader from '../Loader/Loader';
import CommentPresenter from './CommentPresenter';

const Comments = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleCancel = () => {
    setInputValue('');
  };
  const handleAddComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postComment();
  };
  const { isLoading } = useQuery<CommentType[]>('getComment', getComment, {
    onSuccess: data => {
      setComments(data);
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <CommentPresenter
      data={comments}
      inputValue={inputValue}
      handleChange={handleChange}
      handleCancel={handleCancel}
      handleAddComment={handleAddComment}
    />
  );
};

export default Comments;
