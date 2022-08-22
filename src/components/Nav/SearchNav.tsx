import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';

// import { useSearch } from '../../hooks/useSearch';
// const search = useSearch('')

const SearchNav = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHistory(prev => [...prev, value]);
  };

  useEffect(() => {
    window.localStorage.setItem('keyword', JSON.stringify(history));
  }, [history]);

  return (
    <Container>
      <Content>
        <Arrow onClick={() => navigate(-1)} />
        <SearchForm onSubmit={submit}>
          <SearchBar
            type="text"
            placeholder="검색어를 입력하세요"
            onChange={onChange}
            value={value}
          ></SearchBar>
          <SubmitButton type="submit">
            <AiOutlineSearch />
          </SubmitButton>
        </SearchForm>
      </Content>
    </Container>
  );
};

export default SearchNav;

const Container = styled.div`
  display: flex;
  align-items: center;

  position: fixed;
  max-width: 480px;

  width: 100%;
  min-height: 64px;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.white50};
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  position: relative;
`;

const Arrow = styled(IoIosArrowBack)`
  position: absolute;
  left: 5%;
  font-size: 20px;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;

  position: relative;
`;

const SearchBar = styled.input`
  width: 100%;

  padding: 5px 30px;

  border: 1px solid ${({ theme }) => theme.colors.white50};
  border-radius: 15px;

  font-size: 16px;

  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
    color: ${({ theme }) => theme.colors.black50};
  }
`;

const SubmitButton = styled.button`
  position: absolute;
  right: 0;
  border: none;

  background-color: inherit;
  color: ${({ theme }) => theme.colors.black};
  font-size: 20px;
`;
