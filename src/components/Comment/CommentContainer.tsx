import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getComment } from '../../api/fetchComment';
import { postComment } from '../../api/fetchComment';
import { CommentType } from '../../types/comment';

import CommentPresenter from './CommentPresenter';
import Loading from '../Status/Loading';

const Comments = () => {
  const { id } = useParams();
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
      setComments(await postComment(id, reComment.id, inputValue));
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

  const { isLoading } = useQuery<CommentType[]>(
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
