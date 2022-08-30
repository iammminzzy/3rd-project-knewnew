import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useQuery } from 'react-query';
import { getDetail } from '../../api';
import { GetDetailQueryType } from '../../types/feed';
import { FiMoreHorizontal, FiThumbsUp, FiBookmark } from 'react-icons/fi';
import { BiStore } from 'react-icons/bi';
import { IoIosArrowBack } from 'react-icons/io';
import { BsArrow90DegRight } from 'react-icons/bs';
import { HiOutlineShare, HiTag } from 'react-icons/hi';

function Detail() {
  const [detail, setDetail] = useState<GetDetailQueryType>();
  const getDetailQuery = useQuery<GetDetailQueryType, Error>(
    'getDetail',
    () => getDetail(),
    {
      onSuccess: data => {
        setDetail(data);
      },
    }
  );

  if (getDetailQuery.isLoading) {
    return <span>loading...</span>;
  }

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <DetailWrap>
      <Header>
        <ToBack>
          <IoIosArrowBack />
        </ToBack>
        <div>게시글 상세</div>
      </Header>
      <ContentsWrap>
        <UserWrap>
          <UserProfileWrap>
            <ProfileImg src={detail?.profileImage} alt="" />
            <ProfileInfo>
              <Nickname>{detail?.nickname}</Nickname>
              <ProfileTag>{detail?.writertag}</ProfileTag>
            </ProfileInfo>
          </UserProfileWrap>
          <MoreWrap>
            <FiMoreHorizontal />
            <CreatedTime>{detail?.timeBefore}시간 전</CreatedTime>
          </MoreWrap>
        </UserWrap>
        <Article>
          <ArticleHeader>
            {detail?.score === 1 ? (
              <Best>♥ 최고예요</Best>
            ) : detail?.score === 2 ? (
              <Soso>● 괜찮아요</Soso>
            ) : (
              <Bad>X 별로예요</Bad>
            )}
            <Store>
              <BiStore />
              {detail?.store}
            </Store>
          </ArticleHeader>
          <ProductLink>제품 링크 ﹥</ProductLink>
          <MainTextWrap>
            <MainText>{detail?.content}</MainText>
          </MainTextWrap>
          <SliderWrap {...settings}>
            {detail?.img.map(image => {
              return (
                <ImgWrap key={image.id}>
                  <ContentImg src={image.url} />
                </ImgWrap>
              );
            })}
          </SliderWrap>
          <HashTagWrap>
            <HiTag />
            <HashTags>
              {detail?.hashtags.map((hashtag, idx) => {
                return <div key={idx}>{hashtag}</div>;
              })}
            </HashTags>
          </HashTagWrap>
          <IconWrap>
            <div>
              <BsArrow90DegRight />
              <span>300</span>
            </div>
            <div>
              <FiThumbsUp />
              <span>500</span>
            </div>
            <div>
              <FiBookmark />
              <span>100</span>
            </div>
            <div>
              <HiOutlineShare />
              <span>50</span>
            </div>
          </IconWrap>
        </Article>
        <HorizontalLine />
        <CommentWrap>
          <CommentTotal>작성된 댓글 0개</CommentTotal>
          <CommentList></CommentList>
        </CommentWrap>
      </ContentsWrap>
      <CommentInputWrap>
        <CommentInput
          type="text"
          placeholder="댓글을 남겨보세요."
        ></CommentInput>
        <CommentBtn disabled>작성</CommentBtn>
      </CommentInputWrap>
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

export const Header = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 34px 0;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  font-size: 20px;
  z-index: 10;

  svg {
    font-size: 30px;
  }

  @media (min-width: 768px) {
    width: 748px;
  }

  @media (max-width: 767px) {
    left: 10px;
    right: 10px;
    padding: 29px 0;
    font-size: 16px;

    svg {
      font-size: 20px;
    }
  }
`;

export const ToBack = styled.div`
  position: absolute;
  left: 5px;

  svg:hover {
    cursor: pointer;
  }
`;

const ContentsWrap = styled.div`
  margin-top: 90px;
  padding: 25px 25px 0;
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
  flex-direction: column;
  gap: 9px;
  margin-left: 20px;
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
  color: #aaa;

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
  color: #aaa;

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
  color: #aaa;

  @media (max-width: 767px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const Article = styled.div`
  position: relative;
  margin: 30px 0px 10px 0px;
  /* display: flex;
  flex-direction: column; */
  /* gap: 10px; */
  color: #555;
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

const Store = styled.div`
  display: flex;
  align-items: center;
  color: #aaa;

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
  font-weight: 500;
  background-color: #eee;
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

const HorizontalLine = styled.hr`
  border: 0.5px solid #ddd;
`;

const CommentWrap = styled.div`
  margin-bottom: 130px;
`;

const CommentTotal = styled.div`
  margin: 35px 0;
  color: #787777;
  font-weight: 600;
  font-size: 18px;

  @media (max-width: 767px) {
    margin: 30px 0;
    font-size: 15px;
  }

  @media (max-width: 480px) {
    margin: 25px 0;
    font-size: 13px;
  }
`;

const CommentList = styled.div``;

const CommentInputWrap = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 90px;
  padding: 20px;
  background-color: #fff;
  border-top: 1px solid #ddd;

  @media (min-width: 768px) {
    width: 748px;
  }
`;

const CommentInput = styled.input`
  color: #555;
  font-size: 20px;

  @media (max-width: 767px) {
    font-size: 19px;
  }

  @media (max-width: 480px) {
    font-size: 17px;
  }

  &::placeholder {
    color: #cccaca;
    font-size: 20px;
    font-weight: 200;

    @media (max-width: 767px) {
      font-size: 19px;
    }

    @media (max-width: 480px) {
      font-size: 17px;
    }
  }
`;

const CommentBtn = styled.button`
  min-width: 35px;
  background: none;
  border: none;
  color: #ff4b4b;
  font-size: 20px;

  @media (max-width: 767px) {
    font-size: 19px;
  }

  @media (max-width: 480px) {
    font-size: 17px;
  }

  &:disabled {
    color: #bbb;
  }
`;
