import React from 'react';
import styled from 'styled-components';

import {
  FiThumbsUp,
  FiBookmark,
  BsArrow90DegRight,
  HiOutlineShare,
} from '../../utils/common/icons';

interface Props {
  icons: {
    quotation_count: number;
    like_count: number;
    bookmark_count: number;
    share_count: number;
  };
}

const TagIcon = ({ icons }: Props) => {
  const ICON_DATA = [
    {
      name: <BsArrow90DegRight />,
      count: icons.quotation_count,
    },
    { name: <FiThumbsUp />, count: icons.like_count },
    { name: <FiBookmark />, count: icons.bookmark_count },
    { name: <HiOutlineShare />, count: icons.share_count },
  ];
  return (
    <IconWrap>
      {ICON_DATA.map((icon, index) => (
        <div key={index}>
          {icon.name}
          {icon.count}
        </div>
      ))}
    </IconWrap>
  );
};

export default TagIcon;

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
