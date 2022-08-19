import React from 'react';
import styled from 'styled-components';
import { GetFeedQueryType } from '../../../types/feed';

import {
  FiMoreHorizontal,
  FiEye,
  FiThumbsUp,
  FiBookmark,
} from 'react-icons/fi';
import { BiComment } from 'react-icons/bi';

function Item({ item }: { item: GetFeedQueryType }) {
  return (
    <ItemWrap>
      <UserWrap>
        <UserProfileWrap>
          <ProfileImg
            src="https://images.unsplash.com/photo-1660678473509-120139e9317b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80"
            alt=""
          />
          <Nickname>{item.nickname}</Nickname>
          <ProfileTag>· {item.writertag}</ProfileTag>
        </UserProfileWrap>
        <MoreWrap>
          <FiMoreHorizontal />
          {item.modified ? <span>수정됨</span> : null}
        </MoreWrap>
      </UserWrap>
      <Article>
        {item.score === 1 ? (
          <Best>♥ 최고예요</Best>
        ) : item.score === 2 ? (
          <Soso>● 괜찮아요</Soso>
        ) : (
          <Bad>Ⅹ 별로예요</Bad>
        )}

        <ProductLink>제품 링크 〉</ProductLink>
        <MainTextWrap>
          <MainText>{item.content}</MainText>
        </MainTextWrap>
        <ImgListWrap>
          {item.img
            .concat({ id: -1, url: '' }, { id: -2, url: '' })
            .slice(0, 3)
            .map(image => {
              return (
                <ImgWrap key={image.id} isMorePicture={item.img.length}>
                  <div>
                    <FiMoreHorizontal />
                  </div>
                  {image.url && <UserUploadImg src={image.url} alt="" />}
                </ImgWrap>
              );
            })}
        </ImgListWrap>
        <IconWrap>
          <div>
            <FiEye />
            <span>9999</span>
          </div>
          <div>
            <BiComment />
            <span>999</span>
          </div>
          <div>
            <FiThumbsUp />
            <span>99</span>
          </div>
          <div>
            <FiBookmark />
            <span>999</span>
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
`;

const Nickname = styled.span`
  font-size: 20px;
  font-weight: 700;
  margin-left: 10px;
`;

const ProfileTag = styled.span`
  font-size: 20px;
  color: #aaa;
  margin-left: 10px;
`;

const MoreWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 17px;
  color: #aaa;

  svg {
    font-size: 30px;
  }
`;

const Article = styled.div`
  position: relative;
  margin: 10px 10px 10px 60px;

  font-size: 20px;
  line-height: 140%;

  font-size: 20px;
  font-weight: 700;

  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

const Best = styled.p`
  color: #ff4b4b;
`;

const Soso = styled.p`
  color: #ffc646;
`;

const Bad = styled.p`
  color: #000000;
`;

const ProductLink = styled.span`
  display: inline-block;
  margin-top: 15px;
  padding: 0 10px;
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
  font-weight: 100;

  @media (max-width: 767px) {
    font-size: 16px;
    max-height: 120px;
    line-height: 24px;
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
    margin: 20px 30px 20px 0;

    div {
      position: relative;
      margin: 0;

      span {
        position: relative;
        top: -4px;
      }

      svg {
        font-size: 20px;
      }
    }
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin: 20px 0;
    svg {
      font-size: 16px;
    }
  }
`;
