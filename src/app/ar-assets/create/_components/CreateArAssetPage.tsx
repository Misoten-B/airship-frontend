'use client';

import {
  CreateArAssetStepper,
  StatusNoneScreen,
  StatusProgressScreen,
} from './Screens';
import { Loader } from '@/shared/components/common/Loader';
import { STATUS } from '@/shared/constants';
import { useGetUser } from '@/shared/hooks/restapi/v1/User';

export const CreateArAssetPage = () => {
  const { data, error, isLoading } = useGetUser(false);

  if (isLoading) return <Loader />;
  if (error) return <div>falied to load user</div>;

  if (!data) return null;

  if (data.status == STATUS.completed) return <CreateArAssetStepper />;
  if (data.status == STATUS.inProgress) return <StatusProgressScreen />;
  return <StatusNoneScreen />;
};
