'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  CompletedArAsset,
  Select3dModel,
  SpeakingSettings,
  UploadQRCodeInsideImage,
} from './StepContent';
import { Step } from './types';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Space } from '@/shared/components/common/Layout';
import { Loader } from '@/shared/components/common/Loader';
import { Stepper } from '@/shared/components/common/Stepper';
import { Text } from '@/shared/components/common/Text';
import { ROUTES } from '@/shared/constants';
import { useGetUser } from '@/shared/hooks/restapi/v1/User';

type State = {
  active: Step;
};

const initialState: State = {
  active: 0,
};

export const CreateArAssetStepper = () => {
  const { data, error, isLoading } = useGetUser(false);
  const router = useRouter();

  const [active, setActive] = useState(initialState.active);

  const nextStep = () =>
    setActive((prev) => (prev < 3 ? ((prev + 1) as Step) : prev));
  const prevStep = () =>
    setActive((prev) => (prev > 0 ? ((prev - 1) as Step) : prev));

  if (isLoading) return <Loader />;
  if (error) return <div>falied to load user</div>;

  if (!data) return null;

  if (data.status == -1) {
    return (
      <Container>
        <Text>先に生成する必要あり</Text>
        <Button
          variant="filled"
          size="md"
          radius="xl"
          w="100%"
          component={Link}
          href={ROUTES.record.base}
        >
          <Text>声を登録する</Text>
        </Button>
      </Container>
    );
  }

  if (data.status == 0) {
    return (
      <div>
        <Text>現在生成中</Text>
        <Text>手動で更新する場合はこちらから</Text>
        <Button onClick={() => router.refresh()}>リロード</Button>
      </div>
    );
  }

  return (
    <Container>
      <Stepper
        active={active}
        radius="sm"
        size="xs"
        iconSize={20}
        allowNextStepsSelect={false}
        styles={{
          separator: { margin: '2px' },
          stepLabel: { fontSize: '9px' },
          stepDescription: { fontSize: '7px' },
          stepBody: { margin: '3px' },
        }}
      >
        <Stepper.Step label="3Dモデルの選択" description="アップロードと選択">
          <Select3dModel nextStep={nextStep} />
        </Stepper.Step>

        <Stepper.Step
          label="音声データの設定"
          description="録音と話させる文章の登録"
        >
          <SpeakingSettings nextStep={nextStep} prevStep={prevStep} />
        </Stepper.Step>

        <Stepper.Step label="QRコード内画像" description="画像をアップロード">
          <UploadQRCodeInsideImage prevStep={prevStep} />
        </Stepper.Step>

        <Stepper.Completed>
          <CompletedArAsset />
        </Stepper.Completed>
      </Stepper>

      <Space h="md" />
    </Container>
  );
};
