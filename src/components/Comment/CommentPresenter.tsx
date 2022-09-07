import React from 'react';
import styled from 'styled-components';

import { CommentType } from '../../types/comment';
import getDate from '../../utils/common/getDate';

interface Props {
  data: CommentType[];
  reComment: { ninkname: string; id: number };
  inputValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleAddComment: (event: React.FormEvent<HTMLFormElement>) => void;
  handleReComment: (ninkname: string, id: number) => void;
}

const CommentPresenter = ({
  data,
  reComment,
  inputValue,
  handleChange,
  handleCancel,
  handleAddComment,
  handleReComment,
}: Props) => {
  return (
    <Containar>
      <CommentWrap>
        <CommentTotal>작성된 댓글 개</CommentTotal>
        <CommentList>
          {data &&
            data.map(comment => (
              <div key={comment.id + comment.created_at}>
                <CommentWapper>
                  <ProfileImg src={comment.user.profile_image} alt="" />
                  <ProfileInfo>
                    <ProfileBox>
                      <Nickname>{comment.user.nickname}</Nickname>
                      <div>{getDate(comment.created_at)}</div>
                    </ProfileBox>
                    <Comment>{comment.description}</Comment>
                    <CommentButton>
                      <ReComment
                        onClick={() =>
                          handleReComment(comment.user.nickname, comment.id)
                        }
                      >
                        답글달기
                      </ReComment>
                      <LikeButton>좋아요</LikeButton>
                    </CommentButton>
                  </ProfileInfo>
                </CommentWapper>
                {comment.child_comments.map(reComment => (
                  <div key={reComment.id + reComment.created_at}>
                    <ReCommentWapper>
                      <ProfileImg src={reComment.user.profile_image} alt="" />
                      <ProfileInfo>
                        <ProfileBox>
                          <Nickname>{reComment.user.nickname}</Nickname>
                          <div>{getDate(reComment.created_at)}</div>
                        </ProfileBox>
                        <Comment>
                          <span>@{comment.user.nickname} </span>
                          {reComment.description}
                        </Comment>
                        <CommentButton>
                          <LikeButton>좋아요</LikeButton>
                        </CommentButton>
                      </ProfileInfo>
                    </ReCommentWapper>
                  </div>
                ))}
              </div>
            ))}
        </CommentList>
      </CommentWrap>
      <CommentInputWrap>
        {data && reComment.ninkname.length > 0 && (
          <ReCommentBox>
            <ReCommentText>
              {reComment.ninkname}님에게 답글을 남기는 중
            </ReCommentText>
            <ReCommentButton type="button" onClick={handleCancel}>
              취소
            </ReCommentButton>
          </ReCommentBox>
        )}
        <form onSubmit={handleAddComment}>
          <CommentInput
            type="text"
            placeholder="댓글을 남겨보세요."
            onChange={handleChange}
            value={inputValue}
          ></CommentInput>
          <div>
            <CommentBtn type="submit" disabled={!inputValue}>
              작성
            </CommentBtn>
            {inputValue.length > 0 && (
              <CommentBtn type="button" onClick={handleCancel}>
                취소
              </CommentBtn>
            )}
          </div>
        </form>
      </CommentInputWrap>
    </Containar>
  );
};

export default CommentPresenter;

const Containar = styled.div``;

const CommentWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 748px;
  }

  @media (max-width: 767px) {
  }
`;

const CommentTotal = styled.div`
  margin: 10px 0px 10px 15px;
  color: ${({ theme }) => theme.colors.black50};
  font-weight: 400;
  font-size: 18px;

  @media (max-width: 767px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const CommentList = styled.div`
  margin: 10px 0px 10px 15px;
`;

const CommentInputWrap = styled.div`
  position: sticky;
  bottom: 0;
  margin: 0 auto;
  max-height: 40px;

  background-color: #fff;
  border-top: 1px solid #ddd;

  form {
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: 768px) {
    width: 748px;
  }
  form {
    padding: 10px;
  }
`;

const CommentInput = styled.input`
  color: ${({ theme }) => theme.colors.black80};
  font-size: 17px;
  font-weight: 300;

  @media (max-width: 767px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }

  &::placeholder {
    color: #cccaca;
    font-size: 20px;
    font-weight: 200;

    @media (max-width: 767px) {
      font-size: 16px;
    }

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
`;

const CommentBtn = styled.button`
  min-width: 35px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.red80};
  font-size: 20px;
  font-weight: 500;

  @media (max-width: 767px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }

  &:disabled {
    color: #bbb;
  }
`;

const CommentWapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px;
`;

const ReCommentWapper = styled(CommentWapper)`
  margin-left: 30px;
`;

const Comment = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black80};
  opacity: 0.8;
  span {
    color: ${({ theme }) => theme.colors.red};
    font-weight: 600;
  }
`;

const CommentButton = styled.div`
  display: flex;
  gap: 10px;
  span {
    color: ${({ theme }) => theme.colors.black50};
  }
`;

const ReComment = styled(Comment)`
  font-size: 13px;
`;

const LikeButton = styled(ReComment)``;

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100%;

  @media (max-width: 767px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;

const Nickname = styled.span`
  font-size: 20px;
  font-weight: 600;

  @media (max-width: 767px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 9px;
  margin-left: 18px;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  div {
    font-size: 13px;
    opacity: 0.6;
  }
`;

const ReCommentBox = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: -37px;
  padding: 10px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white80};
  border-bottom: 1px solid #ddd;
`;

const ReCommentText = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black50};
  opacity: 0.9;
`;

const ReCommentButton = styled(CommentBtn)`
  color: ${({ theme }) => theme.colors.black50};
  opacity: 0.9;
`;
