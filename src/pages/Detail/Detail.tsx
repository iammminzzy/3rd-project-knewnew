import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getDetail } from '../../api';
import { GetDetailQueryType } from '../../types/feed';
import Slider from 'react-slick';
import { FiMoreHorizontal, FiThumbsUp, FiBookmark } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';
import { BsArrow90DegRight } from 'react-icons/bs';
import { HiOutlineShare } from 'react-icons/hi';

interface DetailProps {
  id: number;
}

function Detail({ id }: DetailProps) {
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

  console.log(detail);
  if (getDetailQuery.isLoading) {
    return <span>loading...</span>;
  }

  const settings = {
    arrows: false,
    dots: true,
    infinite: false,
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
          </MoreWrap>
        </UserWrap>
        <Article>
          {detail?.score === 1 ? (
            <Best>♥ 최고예요</Best>
          ) : detail?.score === 2 ? (
            <Soso>● 괜찮아요</Soso>
          ) : (
            <Bad>Ⅹ 별로예요</Bad>
          )}
          <ProductLink>제품 링크 〉</ProductLink>
          <MainTextWrap>
            <MainText>{detail?.content}</MainText>
          </MainTextWrap>
          <SliderWrap>
            <Slider {...settings}>
              {detail?.img.map(image => {
                console.log(image);
                return (
                  <ImgWrap key={image.id}>
                    <ContentImg src={image.url} />
                  </ImgWrap>
                );
              })}
            </Slider>
          </SliderWrap>
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
      </ContentsWrap>
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

const Header = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  padding: 20px 0;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
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
    padding: 10px 0;
    font-size: 14px;

    svg {
      font-size: 20px;
    }
  }
`;

const ToBack = styled.div`
  position: absolute;
  left: 5px;
`;

const ContentsWrap = styled.div`
  margin-top: 60px;
  padding: 20px;
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
  gap: 5px;
`;

const Nickname = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-left: 10px;

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
  margin-left: 10px;

  @media (max-width: 767px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
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
    width: 40px;
    height: 40px;
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
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

const SliderWrap = styled.div`
  /* display: flex; */
`;

const ImgWrap = styled.div`
  width: 100%;
  height: 638px;
  margin: 2px;
`;

const ContentImg = styled.img`
  width: 100%;
  border-radius: 15px;
  object-fit: cover;
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
