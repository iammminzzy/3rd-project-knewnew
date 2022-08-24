import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Component/Item';
import styled from 'styled-components';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { getFeed } from '../../api';
import { GetFeedQueryType } from '../../types/feed';

import { FaHome, FaUserAlt } from 'react-icons/fa';
import { HiPencil } from 'react-icons/hi';
import { BiSearchAlt2 } from 'react-icons/bi';
import Post from '../../Post';

const fetchPostList = async (pageParam: number) => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}`
  );
  const posts = res.data;
  return { posts, nextPage: pageParam + 1 };
};

function ItemList() {
  // const [feed, setFeed] = useState<ListType>([]);
  // const getFeedQuery = useQuery<ListType, Error>('getFeed', () => getFeed(), {
  //   onSuccess: data => {
  //     setFeed(data);
  //   },
  // });

  // if (getFeedQuery.isLoading) {
  //   return <span>loading...</span>;
  // }

  const { ref, inView } = useInView();
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery('posts', ({ pageParam = 1 }) => fetchPostList(pageParam), {
      getNextPageParam: lastPage => {
        return lastPage.posts.length ? lastPage.nextPage : undefined;
      },
    });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage]);

  if (status === 'loading') return <p>Loading..</p>;
  if (status === 'error') return <p>error..</p>;

  const content = data?.pages.map(pg => {
    return pg.posts.map(
      (item: { body: string; id: number; title: string; userId: number }) => {
        return <Item key={item.id} item={item} />;
      }
    );
  });

  return (
    <ItemListWrap>
      <ListWrap>
        <List>
          {content}
          {/* {feed.map((item: GetFeedQueryType) => {
            return <Item key={item.id} item={item} />;
          })} */}
          {isFetchingNextPage ? <span>loading...</span> : <div ref={ref}></div>}
        </List>
      </ListWrap>
      {/* <Footer>
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
      </Footer> */}
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
