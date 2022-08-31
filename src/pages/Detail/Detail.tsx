import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Slider from 'react-slick';

import {
  FiMoreHorizontal,
  FiThumbsUp,
  FiBookmark,
  BiStore,
  BsArrow90DegRight,
  HiOutlineShare,
  HiTag,
} from '../../utils/common/icons';

import { getDetail } from '../../api/fetchDetail';
import { DetailType } from '../../types/detail';

import ImageDetail from './ImageDetail';
import getDifference from '../../utils/common/getDifference';

function Detail() {
  const id = useParams();
  const [comment, setComment] = useState<string[]>([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const { data } = useQuery<DetailType>('getDetail', getDetail);
  const difference = getDifference(data?.created_at);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event?.target.value);
  };

  const addComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setComment(prev => [...prev, inputValue]);
    setInputValue('');
  };

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <DetailWrap>
      <ContentsWrap>
        <UserWrap>
          <UserProfileWrap>
            <ProfileImg src={data?.user.profile_image} alt="" />
            <ProfileInfo>
              <Nickname>{data?.user.nickname}</Nickname>
              <ProfileTag>{data?.user.tags}</ProfileTag>
            </ProfileInfo>
          </UserProfileWrap>
          <MoreWrap>
            <FiMoreHorizontal />
            <CreatedTime>{difference}</CreatedTime>
          </MoreWrap>
        </UserWrap>
        <Article>
          <ArticleHeader>
            {data?.reaction === '최고예요' ? (
              <Best>♥ 최고예요</Best>
            ) : data?.reaction === '괜찮아요' ? (
              <Soso>● 괜찮아요</Soso>
            ) : (
              <Bad>X 별로예요</Bad>
            )}
            <Store>
              <BiStore />
              {data?.retailer}
            </Store>
          </ArticleHeader>
          <ProductLink>제품 링크 ﹥</ProductLink>
          <MainTextWrap>
            <MainText>{data?.description}</MainText>
          </MainTextWrap>
          <SliderWrap {...settings}>
            {data?.images.map(image => {
              return (
                <ImgWrap key={image.url} onClick={() => setOpenDetail(true)}>
                  <ContentImg src={image.url} />
                </ImgWrap>
              );
            })}
          </SliderWrap>
          <HashTagWrap>
            <HiTag />
            <HashTags>
              {data?.food_tags.map((hashtag, idx) => {
                return <div key={idx}>{hashtag}</div>;
              })}
            </HashTags>
          </HashTagWrap>
          <IconWrap>
            <div>
              <BsArrow90DegRight />
              {data?.quotation_count}
            </div>
            <div>
              <FiThumbsUp />
              {data?.like_count}
            </div>
            <div>
              <FiBookmark />
              {data?.bookmark_count}
            </div>
            <div>
              <HiOutlineShare />
              {data?.share_count}
            </div>
          </IconWrap>
        </Article>
      </ContentsWrap>
      <HorizontalLine />
      <CommentWrap>
        <CommentTotal>작성된 댓글 {comment?.length}개</CommentTotal>
        <CommentList>
          {comment.map(item => (
            <CommentWapper key={item}>
              <ProfileImg src={data?.user.profile_image} alt="" />
              <ProfileInfo>
                <Nickname>{data?.user.nickname}</Nickname>
                <Comment key={item}>{item}</Comment>
                <CommentButton>
                  <ReComment>답글달기</ReComment>
                  <LikeButton>좋아요</LikeButton>
                </CommentButton>
              </ProfileInfo>
            </CommentWapper>
          ))}
        </CommentList>
      </CommentWrap>
      <CommentInputWrap>
        <form onSubmit={addComment}>
          <CommentInput
            onChange={onChange}
            value={inputValue}
            type="text"
            placeholder="댓글을 남겨보세요."
          ></CommentInput>
          <CommentBtn type="submit" disabled={!inputValue}>
            작성
          </CommentBtn>
        </form>
      </CommentInputWrap>
      {openDetail && (
        <ImageDetail img={data?.images} close={() => setOpenDetail(false)} />
      )}
    </DetailWrap>
  );
}

export default Detail;

const DetailWrap = styled.div`
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

const ContentsWrap = styled.div`
  margin-top: 90px;
  padding: 0px 15px;
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

const ProfileInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 9px;
  margin-left: 18px;
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

const ProfileTag = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.black50};

  @media (max-width: 767px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const MoreWrap = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.black50};

  svg {
    font-size: 30px;
  }

  @media (max-width: 767px) {
    width: 40px;
    height: 40px;
  }
`;

const CreatedTime = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.black50};

  @media (max-width: 767px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const Article = styled.div`
  position: relative;
  margin: 30px 0px 5px 0px;
  /* display: flex;
  flex-direction: column; */
  /* gap: 10px; */
  color: ${({ theme }) => theme.colors.black80};
  font-size: 20px;

  @media (max-width: 767px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const ArticleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Best = styled.p`
  color: ${({ theme }) => theme.colors.red80};
  font-weight: 700;
`;

const Soso = styled.p`
  color: #ffc646;
  font-weight: 700;
`;

const Bad = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 700;
`;

const Store = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.black50};

  svg {
    margin-right: 5px;
    font-size: 20px;
  }

  @media (max-width: 767px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const ProductLink = styled.span`
  display: inline-block;
  padding: 2px 5px;
  margin-top: 10px;
  border-radius: 5px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.white50};
  opacity: 0.7;
`;

const MainTextWrap = styled.div``;

const MainText = styled.p`
  margin: 20px 0;
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

const SliderWrap = styled(Slider)`
  margin-bottom: 16px;
  .slick-track {
    display: flex;
    gap: 10px;
  }
  .slick-slide {
    outline: none;
  }
  .slick-dots {
    bottom: 13px;
  }
`;

const ImgWrap = styled.div`
  aspect-ratio: 1/1;
`;

const ContentImg = styled.img`
  width: 100%;
  border-radius: 25px;
  object-fit: cover;
`;

const HashTagWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  color: #aaa;
  font-size: 20px;

  @media (max-width: 767px) {
    font-size: 16px;
    gap: 5px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    gap: 3px;
  }
`;

const HashTags = styled(HashTagWrap)`
  font-size: 17px;

  @media (max-width: 767px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const IconWrap = styled.div`
  margin: 30px;

  display: flex;
  justify-content: space-around;

  font-size: 20px;
  font-weight: 500;
  color: #aaa;

  div {
    position: relative;
    margin: 0 10px;

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

const HorizontalLine = styled.hr`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.white50};
`;

const CommentWrap = styled.div`
  margin-bottom: 80px;
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
  position: fixed;
  bottom: 0;
  width: 100%;

  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ddd;

  form {
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: 768px) {
    width: 748px;
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

const CommentWapper = styled(UserProfileWrap)`
  margin: 10px 0px;
`;

const Comment = styled.span`
  color: ${({ theme }) => theme.colors.black80};
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
