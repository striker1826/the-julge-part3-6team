import Input from '@/shared/components/Input/Input';
import * as S from './InputContent.styled';
import { Textarea } from '@/shared/components/Textarea/Textarea';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  NOTICE_FORM_ERRORS_INITIAL_VALUE,
  NOTICE_FORM_INITIAL_VALUE,
} from '@/constant/notice';
import { onSubmit } from '@/models/notice/noticeSubmit';
import PrimaryButton from '@/shared/components/Button/RedButton/RedButton';
import { useGetNotice } from '@/models/notice/useGetNotice';
import { useSearchParams } from 'next/navigation';

interface Props {
  mutate: any;
}

export const InputContent = ({ mutate }: Props) => {
  const [notice, setNotice] = useState<CreateNotice>(NOTICE_FORM_INITIAL_VALUE);
  const [errors, setErrors] = useState(NOTICE_FORM_ERRORS_INITIAL_VALUE);
  const useParams = useSearchParams();
  const shop_id = useParams.get('shop_id');
  const notice_id = useParams.get('notice_id');

  const { data } = useGetNotice(shop_id!, notice_id!);

  useEffect(() => {
    if (data) {
      setNotice(prev => {
        return {
          ...prev,
          hourlyPay: data?.data.item.hourlyPay,
          startsAt: data?.data.item.startsAt,
          workhour: data?.data.item.workhour,
          description: data?.data.item.description,
        };
      });
    }
  }, [data?.data]);

  return (
    <>
      <S.Layout>
        <Input
          label="시급*"
          id="hourlyPay"
          type="hourlyWage"
          error={errors.hourlyPay}
          value={String(notice.hourlyPay)}
          placeholder="0"
          inputType="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNotice((prev: CreateNotice) => {
              return {
                ...prev,
                ['hourlyPay']: Number(e.target.value),
              };
            })
          }
        />
        <Input
          label="시작 일시*"
          id="startsAt"
          type="basic"
          error={errors.startsAt}
          value={notice.startsAt}
          placeholder="2024-01-05 15:00"
          inputType="datetime-local"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNotice((prev: CreateNotice) => {
              return {
                ...prev,
                ['startsAt']: e.target.value,
              };
            })
          }
        />
        <Input
          label="업무 시간*"
          id="workHour"
          type="basic"
          error={errors.workhour}
          value={String(notice.workhour)}
          placeholder="0"
          inputType="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNotice((prev: CreateNotice) => {
              return {
                ...prev,
                ['workhour']: Number(e.target.value),
              };
            })
          }
        />
        <S.Description>
          <Textarea
            id="description"
            name="description"
            placeholder="입력"
            label="공고 설명"
            value={notice.description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setNotice((prev: CreateNotice) => {
                return {
                  ...prev,
                  ['description']: e.target.value,
                };
              })
            }
          />
        </S.Description>
      </S.Layout>
      <S.ButtonCotainer>
        <S.ButtonWrap>
          <PrimaryButton
            text="등록하기"
            onClick={() => onSubmit(notice, setErrors, mutate)}
          />
        </S.ButtonWrap>
      </S.ButtonCotainer>
    </>
  );
};
