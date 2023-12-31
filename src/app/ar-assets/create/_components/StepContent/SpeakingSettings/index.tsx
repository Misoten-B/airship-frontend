import { useRequestBodiesValue } from '../../RequestBodiesProvider';
import { SpeakingAssetsSettings } from './SpeakingAssetsSettings';
import { Button } from '@/shared/components/common/Button';
import { Container } from '@/shared/components/common/Container';
import { Group } from '@/shared/components/common/Layout';
import { Title } from '@/shared/components/common/Title';
import { IconChevronLeft, IconChevronRight } from '@/shared/components/icons';

type Props = {
  nextStep: () => void;
  prevStep: () => void;
};

export const SpeakingSettings = ({ nextStep, prevStep }: Props) => {
  const requestBodies = useRequestBodiesValue();

  const isInvalidRequestBodies = () => {
    const speakingSettingsValues = requestBodies['1'];

    if (!speakingSettingsValues) {
      return true;
    }

    const { text } = speakingSettingsValues;
    return !text;
  };

  return (
    <>
      <Container>
        <Title order={3} mb={16}>
          音声データの設定
        </Title>
        <SpeakingAssetsSettings />
      </Container>

      <Group my="xl" p={0} justify={'space-between'}>
        <Button
          variant="outline"
          size="xs"
          leftSection={<IconChevronLeft size={14} />}
          onClick={prevStep}
        >
          前のステップ
        </Button>
        <Button
          size="xs"
          rightSection={<IconChevronRight size={14} />}
          onClick={nextStep}
          disabled={isInvalidRequestBodies()}
        >
          次のステップへ
        </Button>
      </Group>
    </>
  );
};
