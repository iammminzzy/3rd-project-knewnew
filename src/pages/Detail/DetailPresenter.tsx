import React, { useState } from 'react';
import styled from 'styled-components';
import { FiMoreHorizontal, BiStore } from '../../utils/common/icons';

import { DetailType } from '../../types/detail';

import User from '../../components/User/User';
import Reaction from '../../components/Reaction/Reaction';
import Product from '../../components/Product/Product';

import getDifference from '../../utils/common/getDifference';
import TagIcon from '../../components/TagIcon/TagIcon';
import ModalSlider from '../../components/ModalSlider/ModalSlider';

interface Props {
  data: DetailType;
}

const DetailPresenter = ({ data }: Props) => {
  const [openDetail, setOpenDetail] = useState(false);

  const user = data.user;
  const description = data.description;
  const images = data.images;
  const icons = {
    quotation_count: data.quotation_count,
    like_count: data.like_count,
    bookmark_count: data.bookmark_count,
    share_count: data.share_count,
  };
  const foodTags = data.food_tags;
  const reaction = data.reaction;
  const difference = getDifference(data.created_at);

  return (
    <DetailWrap>
      <ContentsWrap>
        <UserWrap>
          <User user={user} />
          <MoreWrap>
            <FiMoreHorizontal />
            <CreatedTime>{difference}</CreatedTime>
          </MoreWrap>
        </UserWrap>
        <Article>
          <ArticleHeader>
            <Reaction reaction={reaction} />
            <Store>
              <BiStore />
              {data?.retailer}
            </Store>
          </ArticleHeader>
          <Product
            description={description}
            images={images}
            foodTags={foodTags}
            modal={setOpenDetail}
          />
          <TagIcon icons={icons} />
        </Article>
      </ContentsWrap>
      <HorizontalLine />
      {openDetail && (
        <ModalSlider img={images} close={() => setOpenDetail(false)} />
      )}
    </DetailWrap>
  );
};

export default DetailPresenter;

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
  min-width: 50px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black50};

  @media (max-width: 767px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Article = styled.div`
  position: relative;
  margin: 30px 0px 5px 0px;
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

const HorizontalLine = styled.hr`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.white50};
`;
