import React, { useState } from 'react';
import Item from './Component/Item';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getFeed } from '../../api';
import { GetFeedQueryType } from '../../types/feed';

import { FaHome, FaUserAlt } from 'react-icons/fa';
import { HiPencil } from 'react-icons/hi';
import { BiSearchAlt2 } from 'react-icons/bi';

function ItemList() {
  const [feed, setFeed] = useState<GetFeedQueryType>();
  const getFeedQuery = useQuery<GetFeedQueryType, Error>(
    'getFeed',
    () => getFeed(),
    {
      onSuccess: data => {
        setFeed(data);
      },
    }
  );

  if (getFeedQuery.isLoading) {
    return <span>loading...</span>;
  }

  return (
    <ItemListWrap>
      <ListWrap>
        <List>
          {feed?.map((item: GetFeedQueryType) => {
            return <Item key={item.id} item={item} />;
          })}
        </List>
      </ListWrap>
      <Footer>
        <IconWrap>
          <FaHome />
          <IconTitle>홈</IconTitle>
        </IconWrap>
        <IconWrap>
          <HiPencil />
          <IconTitle>글쓰기</IconTitle>
        </IconWrap>
        <IconWrap>
          <BiSearchAlt2 />
          <IconTitle>검색</IconTitle>
        </IconWrap>
        <IconWrap>
          <FaUserAlt />
          <IconTitle>마이뉴뉴</IconTitle>
        </IconWrap>
      </Footer>
    </ItemListWrap>
  );
}

export default ItemList;

const ItemListWrap = styled.div`
  position: relative;
  margin: 120px auto;

  font-family: ${({ theme }) => theme.fonts.fontFamily};
  white-space: pre-wrap;

  @media (min-width: 768px) {
    width: 748px;
  }

  @media (max-width: 767px) {
    margin: 120px 10px;
  }
`;

const ListWrap = styled.div``;

const List = styled.ul``;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  padding-top: 20px;
  padding-bottom: 30px;
  background-color: #fff;

  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  display: flex;

  color: #aaa;
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

const IconWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const IconTitle = styled.span`
  margin-top: 5px;
`;
