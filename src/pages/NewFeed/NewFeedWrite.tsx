import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdPhotoLibrary } from 'react-icons/md';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

const BASE_URL = 'http://192.168.0.248:8000';

const settings = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2.2,
  slidesToScroll: 2,
  autoplay: false,
};

interface RouteState {
  state: {
    score: number;
    foodTag: string[];
    store: string;
  };
}

export default function NewFeedWirte() {
  const accessToken = useSelector((state: RootState) => state.tokenState.value);

  const navigate = useNavigate();
  const { state } = useLocation() as RouteState;

  const [inputValue, setInputValue] = useState('');
  const [inputProduct, setInputProduct] = useState('');

  const [file, setFile] = useState<File[]>([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileUrls: string[] = [];
    const fileInfo: File[] = [];

    if (e.target.files != null && e.target.files.length != 0) {
      for (let i = 0; i < e.target.files.length && i < 5; i++) {
        const reader = new FileReader();
        const files = e.target.files[i];

        reader.onloadend = () => {
          fileUrls[i] = reader.result as string;
          fileInfo[i] = files;
          setFile([...fileInfo]);
          setImagePreviewUrl([...fileUrls]);
        };
        reader.readAsDataURL(files);
      }
    } else {
      //setImagePreviewUrl([]);
      //setFile([]);
      return;
    }
  };

  const onRemove = (idx: number) => {
    const copyfile = file;
    copyfile.splice(idx, 1);
    const copyimgpreview = imagePreviewUrl;
    copyimgpreview.splice(idx, 1);

    setFile([...copyfile]);
    setImagePreviewUrl([...copyimgpreview]);
  };

  const getFormatedToday = () => {
    const today = new Date();
    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString();
    const day = today.getDate().toString();
    const hours = today.getHours().toString();
    const minutes = today.getMinutes().toString();
    const seconds = today.getSeconds().toString();
    const milliseconds = today.getMilliseconds().toString();
    const randomNumber = Math.floor(Math.random() * 100).toString();
    return (
      year +
      month +
      day +
      hours +
      minutes +
      seconds +
      milliseconds +
      randomNumber
    );
  };

  const getPresignedUrl = async (): Promise<
    { preSignedUrl: any; fileName: string } | undefined
  > => {
    try {
      const fileName = `${getFormatedToday()}.png`;
      const response = await axios.post(
        `${BASE_URL}/review/image-presigned-url`,
        { fileName },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return { preSignedUrl: response.data, fileName };
    } catch (error) {
      return;
    }
  };

  const uploadImageToS3 = async (presignedUrl: any, file: File) => {
    const formData = new FormData();
    for (const key in presignedUrl.fields) {
      formData.append(key, presignedUrl.fields[key]);
    }
    //formData.append('Content-Type', file.type);
    formData.append('file', file);

    const response = await axios.post(presignedUrl.url, formData);

    if (response.status !== 204) {
      return;
    }
  };

  const write = async () => {
    const imageUrl = [];

    for (let i = 0; i < file.length; i++) {
      const { preSignedUrl, fileName }: any = await getPresignedUrl();
      Object.defineProperty(file[i], 'name', {
        writable: true,
        value: fileName,
      });

      await uploadImageToS3(preSignedUrl, file[i]);

      imageUrl.push({
        order: i + 1,
        url: `https://knewnew-review-images.s3.amazonaws.com/${file[i].name}`,
      });
    }

    const jsonData = {
      reaction: state.score,
      food_tags: state.foodTag,
      retailer: state.store,
      product: inputProduct,
      description: inputValue,
      images: imageUrl,
    };

    await fetch(`${BASE_URL}/review/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    });
  };

  const handleInputTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 500) {
      alert('최대 500자까지 입력 가능합니다.');
      e.target.value = e.target.value.substring(0, 500);
    }
    setInputValue(e.target.value);
  };

  const handleInputProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputProduct(e.target.value);
  };

  useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, []);

  return (
    <NewFeedWrap>
      <TitleWrap>
        <Title>오늘의 푸드로그 </Title>
        <CountLength>({inputValue.length}/500자)</CountLength>
      </TitleWrap>
      <InputText
        placeholder={`푸드로그를 자유롭게 작성하세요. (필수)\n\nTip. 내 평소 입맛, 나만의 특별한 조리법 등 다른 분들에게 도움이 되는 꿀팀을 함께 나눠주시면 더욱 좋아요!`}
        onChange={handleInputTextChange}
        value={inputValue}
      />
      <TitleWrap>
        <Title>상품명을 알고 있나요?</Title>
      </TitleWrap>
      <InputProduct
        placeholder={`상품명을 입력해주세요. 비워둬도 괜찮아요!`}
        onChange={handleInputProductChange}
        value={inputProduct}
      />
      <TitleWrap>
        <Title>사진이 있다면, 더 좋아요!</Title>
      </TitleWrap>
      <UploadImgWrap>
        <label>
          <UploadImg>
            <div>
              <MdPhotoLibrary />
              <span>{imagePreviewUrl.length}/5</span>
            </div>
          </UploadImg>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </label>
        <StyledSlider {...settings}>
          {imagePreviewUrl.map((img, idx) => {
            return (
              <ImgWrap key={idx}>
                <ImgDeleteBtn
                  onClick={() => {
                    onRemove(idx);
                  }}
                >
                  X
                </ImgDeleteBtn>
                <img src={img} />
              </ImgWrap>
            );
          })}
        </StyledSlider>
      </UploadImgWrap>
      <UploadBtnWrap>
        <UploadBtn
          onClick={() => {
            write();
          }}
          disabled={inputValue ? false : true}
        >
          글쓰기 완료
        </UploadBtn>
      </UploadBtnWrap>
    </NewFeedWrap>
  );
}

const NewFeedWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 60px auto 80px auto;
  font-family: ${({ theme }) => theme.fonts.fontFamily};

  @media (min-width: 768px) {
    width: 748px;
  }

  @media (max-width: 767px) {
  }
`;

const TitleWrap = styled.div`
  margin-top: 50px;
  margin-left: 20px;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const CountLength = styled.span`
  color: #aaa;
  font-size: 16px;
  font-weight: 300;
`;

const InputText = styled.textarea`
  width: 100%;
  height: 350px;
  resize: none;
  white-space: pre-line;
  word-break: break-all;
  border: none;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 20px;
  margin-top: 20px;
  font-size: 16px;
  outline: none;

  &::placeholder {
    color: #aaa;
  }
`;

const InputProduct = styled.input`
  width: 100%;
  border: none;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 20px;
  margin-top: 20px;
  font-size: 16px;

  &::placeholder {
    color: #aaa;
  }
`;

const UploadImgWrap = styled.div`
  display: flex;
  width: 100%;

  label {
    width: 30%;
    aspect-ratio: 1/1;
    margin-top: 20px;
    margin-left: 20px;
    cursor: pointer;

    input[type='file'] {
      display: none;
    }
  }
`;

const UploadImg = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 10px;
  color: #aaa;

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    flex-direction: column;

    svg {
      font-size: 70px;
    }
  }

  @media (max-width: 767px) {
    div {
      svg {
        font-size: 60px;
      }
    }
  }

  @media (max-width: 480px) {
    div {
      svg {
        font-size: 40px;
      }
    }
  }
`;

const StyledSlider = styled(Slider)`
  width: 60%;
  margin-top: 20px;
  margin-left: 5px;

  .slick-track {
    display: flex;
    justify-content: flex-start;
    margin: 0;
  }

  .slick-slide {
    margin: 5px;
  }

  img {
    aspect-ratio: 1/1;
    border-radius: 10px;
  }
`;

const ImgWrap = styled.div`
  position: relative;
`;

const ImgDeleteBtn = styled.button`
  position: absolute;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  border: none;
  font-size: 18px;
  font-weight: 900;
`;

const UploadBtnWrap = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding: 30px 20px 50px;
  align-items: center;
`;

const UploadBtn = styled.button`
  width: 100%;
  padding: 15px 0;
  background-color: ${({ theme }) => theme.colors.red80};
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 18px;
  cursor: pointer;

  :disabled {
    background-color: #f3f3f3;
    border: 1px solid #aaa;
    color: #aaa;
    cursor: default;
  }
`;
