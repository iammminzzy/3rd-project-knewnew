import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Component/Item';
import styled from 'styled-components';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { getFeed } from '../../api';
import { GetFeedQueryType } from '../../types/feed';

const BASE_URL = 'http://192.168.0.248:8000';

const fetchPostList = async (pageParam: number) => {
  const res = await axios.get(`${BASE_URL}/review/?page=${pageParam}`);
  const posts = res.data;
  return { posts, nextPage: pageParam + 1 };
};

function ItemList() {
  const { ref, inView } = useInView();

  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    'posts',
    ({ pageParam = 1 }) => fetchPostList(pageParam),
    {
      getNextPageParam: lastPage => {
        return lastPage.posts?.results.length ? lastPage.nextPage : undefined;
      },
    }
  );

  useEffect(() => {
    if (inView && data?.pages[data.pages.length - 1].posts.next)
      fetchNextPage();
  }, [inView]);

  if (status === 'loading') return <p>Loading..</p>;
  if (status === 'error') return <p>error..</p>;

  const content = data?.pages.map(pg => {
    return pg.posts.results.map((item: GetFeedQueryType) => {
      return <Item key={item.id} item={item} />;
    });
  });

  return (
    <ItemListWrap>
      <ListWrap>
        <List>
          {content}
          {isFetchingNextPage ? <span>loading...</span> : <Ref ref={ref}></Ref>}
        </List>
      </ListWrap>
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

const Ref = styled.div`
  position: absolute;
  bottom: 200px;
`;
