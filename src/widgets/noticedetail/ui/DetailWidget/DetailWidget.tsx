import React from 'react';
import * as S from './DetailWidget.styled';

interface DetailWidgetProps {
  noticeData?: any;
}

export const DetailWidget = ({ noticeData }: DetailWidgetProps) => {
  const description = noticeData?.data?.item?.description;
  return (
    <>
      <S.DescripContainer>
        <S.SmallText isBlack>공고 설명</S.SmallText>
        <p>{/* 공백 */}</p>
        <p>{description}</p>
      </S.DescripContainer>
    </>
  );
};
