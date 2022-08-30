import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { GetFeedQueryType } from '../../../types/feed';

import {
  FiMoreHorizontal,
  FiEye,
  FiThumbsUp,
  FiBookmark,
} from 'react-icons/fi';
import { BiComment } from 'react-icons/bi';

function Item({ item }: { item: any }) {
  const navigate = useNavigate();
  return (
    <ItemWrap
      onClick={() => {
        navigate('/detail/1');
      }}
    >
      <UserWrap>
        <UserProfileWrap>
          <ProfileImg
            src={
              item.user.profile_image != (undefined || null)
                ? item.user.profile_image
                : 'https://images.unsplash.com/photo-1660678473509-120139e9317b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80'
            }
            alt=""
          />
          <Nickname>{item.user.nickname}</Nickname>
          <ProfileTag>· {item.user.tag}</ProfileTag>
        </UserProfileWrap>
        <MoreWrap>
          <FiMoreHorizontal />
          {item.is_updated ? <span>수정됨</span> : null}
        </MoreWrap>
      </UserWrap>
      <Article>
        {item.reaction.id === 1 ? (
          <Best>♥ 최고예요</Best>
        ) : item.reaction.id === 2 ? (
          <Soso>● 괜찮아요</Soso>
        ) : item.reaction.id === 3 ? (
          <Bad>Ⅹ 별로예요</Bad>
        ) : (
          <Question>? 궁금해요</Question>
        )}
        {item.product.name && <ProductLink>{item.product.name} 〉</ProductLink>}
        <MainTextWrap>
          <MainText>{item.description}</MainText>
        </MainTextWrap>
        <ImgListWrap>
          {item.images
            ? item.images
                .concat({ id: -1, url: '' }, { id: -2, url: '' })
                .slice(0, 3)
                .map((image: any) => {
                  return (
                    <ImgWrap key={image.id} isMorePicture={item.images.length}>
                      <div>
                        <FiMoreHorizontal />
                      </div>
                      {image.url && <UserUploadImg src={image.url} alt="" />}
                    </ImgWrap>
                  );
                })
            : null}
        </ImgListWrap>
        <IconWrap>
          <div>
            <FiEye />
            <span>{item.view_count}</span>
          </div>
          <div>
            <BiComment />
            <span>{item.comment_count}</span>
          </div>
          <div>
            <FiThumbsUp />
            <span>{item.like_count}</span>
          </div>
          <div>
            <FiBookmark />
            <span>{item.bookmark_count}</span>
          </div>
        </IconWrap>
      </Article>
    </ItemWrap>
  );
}

export default Item;

const ItemWrap = styled.li`
  margin: 20px 0;
  padding: 25px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background-color: #fff;

  @media (max-width: 767px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const UserWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserProfileWrap = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;

  @media (max-width: 767px) {
    width: 35px;
    height: 35px;
  }

  @media (max-width: 480px) {
    width: 25px;
    height: 25px;
  }
`;

const Nickname = styled.span`
  font-size: 20px;
  font-weight: 700;
  margin-left: 10px;

  @media (max-width: 767px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const ProfileTag = styled.span`
  font-size: 20px;
  color: #aaa;
  margin-left: 10px;

  @media (max-width: 767px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const MoreWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #aaa;

  svg {
    font-size: 30px;
  }

  @media (max-width: 767px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const Article = styled.div`
  position: relative;
  margin: 10px 10px 10px 60px;

  font-size: 20px;
  color: #555;

  @media (max-width: 767px) {
    font-size: 16px;
    margin: 10px 10px 10px 40px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    margin: 10px 10px 10px 20px;
  }
`;

const Best = styled.p`
  color: #ff4b4b;
  font-weight: 700;
`;

const Soso = styled.p`
  color: #ffc646;
  font-weight: 700;
`;

const Bad = styled.p`
  color: #000000;
  font-weight: 700;
`;

const Question = styled.p`
  color: #000000;
  font-weight: 700;
`;

const ProductLink = styled.span`
  display: inline-block;
  margin-top: 15px;
  padding: 2px 5px;
  font-weight: 500;
  background-color: #eee;
`;

const MainTextWrap = styled.div``;

const MainText = styled.p`
  margin: 10px 0;
  display: -webkit-box;
  max-height: 150px;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 30px;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: 300;

  @media (max-width: 767px) {
    max-height: 120px;
    line-height: 24px;
  }

  @media (max-width: 480px) {
    max-height: 100px;
    line-height: 20px;
  }
`;

const ImgListWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
`;

const ImgWrap = styled.div<{ isMorePicture: number }>`
  position: relative;
  width: 100%;
  max-width: 205px;
  aspect-ratio: 1/1;
  margin: 2px;

  border-radius: 15px;
  overflow: hidden;

  div {
    font-size: 0;
    width: 0;
    height: 0;
  }

  ${({ isMorePicture }) => {
    if (isMorePicture > 3) {
      return `&:last-child {
        div {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.75);
          z-index: 2;
          text-align: center;

          svg {
            position: relative;
            font-size: 70px;
            color: #fff;
            top: 50%;
            transform: translateY(-50%);
          }

          @media (max-width: 480px) {
            svg {
              font-size: 40px;
            }
          }
        }
      }`;
    }
  }}
`;

const UserUploadImg = styled.img`
  display: flex;
  width: 100%;
`;

const IconWrap = styled.div`
  margin: 20px 30px 20px 0;

  display: flex;
  justify-content: space-between;

  font-size: 20px;
  font-weight: 500;
  color: #aaa;

  div {
    position: relative;
    margin: 0 10px;

    span {
      position: relative;
      top: -7px;
      padding-left: 5px;
    }

    svg {
      font-size: 30px;
    }
  }

  @media (max-width: 767px) {
    font-size: 16px;

    div {
      margin: 0;

      span {
        top: -5px;
      }

      svg {
        font-size: 20px;
      }
    }
  }

  @media (max-width: 480px) {
    font-size: 13px;
    margin: 20px 0 0 0;
    svg {
      font-size: 16px;
    }
  }
`;
