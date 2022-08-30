import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Component/Item';
import styled from 'styled-components';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { getFeed } from '../../api';
import { GetFeedQueryType } from '../../types/feed';

const fetchPostList = async (pageParam: number) => {
  const res = await axios.get(
    `http://192.168.0.18:8000/review/?page=${pageParam}`
  );
  const posts = res.data.results;
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
      (item: {
        id: number;
        user: {
          id: number;
          nickname: string;
          profile_image: string | null;
          tag: string;
        };
        reaction: {
          id: number;
          name: string;
        };
        product: {
          id: number;
          name: string;
        };
        description: string;
        images: string[];
        view_count: number;
        comment_count: number;
        like_count: number;
        bookmark_count: number;
        is_updated: boolean;
      }) => {
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
