import { IStatusLoading } from '@src/@types/statusLoading';

interface IHistoric {
  id: string;
  winner: string;
  length: number;
  onPress: () => void;
}

interface IHistoricList {
  items: IHistoric[];
  status: IStatusLoading;
  title?: string;
}

export { IHistoricList, IHistoric };
