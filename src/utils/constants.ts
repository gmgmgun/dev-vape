export interface ICategory {
  id: number;
  korean: string;
  english: string;
  short: string;
}

export const categories: ICategory[] = [
  {
    id: 1,
    korean: '입호흡 액상',
    english: 'Mouth to Lung',
    short: 'MTL',
  },
  {
    id: 2,
    korean: '폐호흡 액상',
    english: 'Direct to Lung',
    short: 'DTL',
  },
  {
    id: 3,
    korean: '기기',
    english: 'Device',
    short: 'Device',
  },
  {
    id: 4,
    korean: '코일 & 팟',
    english: 'Coil & Pod',
    short: 'CNP',
  },
];
