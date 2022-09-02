import React, { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import styled from 'styled-components';
import { OptionProps } from '../../../types/feed/index';

// export default function OptionBox({
//   id,
//   title,
//   name,
//   option,
//   inputValue,
//   setInputValue,
// }: {
//   id: number;
//   title: string;
//   name: string;
//   option: string[];
//   inputValue: OptionProps;
//   setInputValue: React.Dispatch<React.SetStateAction<OptionProps>>;
// }) {
//   const [checked, setChecked] = useState(false);

//   const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     setInputValue({
//       ...inputValue,
//       [name]: value,
//     });
//   };

//   return (
//     <OptionBoxWrap>
//       <StepNum>Step.{id}</StepNum>
//       <div>
//         <Title>{title}</Title>
//         <OptionWrap>
//           {option.map((choice, idx) => {
//             return (
//               <>
//                 <RadioInputWrap key={idx}>
//                   {choice !== '기타' ? (
//                     <>
//                       <RadioInput
//                         type="radio"
//                         name={name}
//                         value={choice}
//                         onChange={handleInput}
//                         onFocus={() => setChecked(false)}
//                       />
//                       <label>{choice}</label>
//                     </>
//                   ) : (
//                     <>
//                       <RadioInput
//                         type="radio"
//                         name="occupation"
//                         onFocus={() => setChecked(true)}
//                       />
//                       <label>기타</label>
//                       <EtcInput
//                         type="text"
//                         name="occupation"
//                         placeholder="직접 입력해주세요"
//                         onChange={handleInput}
//                         disabled={!checked}
//                       />
//                     </>
//                   )}
//                 </RadioInputWrap>
//               </>
//             );
//           })}
//         </OptionWrap>
//       </div>
//       {inputValue.`${name}` === undefined && (
//         <Complete>
//           <AiOutlineCheck />
//           완료
//         </Complete>
//       )}
//     </OptionBoxWrap>
//   );
// }

// const OptionBoxWrap = styled.div`
//   position: relative;
//   display: flex;
//   gap: 30px;
//   padding: 30px;
//   border: 1px solid ${({ theme }) => theme.colors.white50};
//   border-radius: 15px;
// `;

// const StepNum = styled.div`
//   font-weight: 600;
// `;

// const Title = styled.div`
//   margin-bottom: 20px;
//   font-size: 19px;
//   font-weight: 600;
// `;

// const OptionWrap = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
// `;

// const RadioInputWrap = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   padding: 1px 0;
// `;

// const RadioInput = styled.input`
//   width: 15px;
//   height: 15px;
//   accent-color: ${({ theme }) => theme.colors.red};
//   cursor: pointer;
// `;

// const EtcInput = styled.input`
//   height: 100%;
//   padding-top: 1px;
//   border-bottom: 1px solid ${({ theme }) => theme.colors.white50};
//   font-size: 15px;
// `;

// const Complete = styled.div`
//   position: absolute;
//   right: 37px;
//   display: flex;
//   gap: 5px;
//   color: ${({ theme }) => theme.colors.red};
// `;
