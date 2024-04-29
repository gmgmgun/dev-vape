export interface ICategory {
  id: number;
  korean: string;
  english: string;
  url: string;
}

export const categories: ICategory[] = [
  {
    id: 1,
    korean: '입호흡 액상',
    english: 'Mouth to Lung',
    url: 'mtl',
  },
  {
    id: 2,
    korean: '폐호흡 액상',
    english: 'Direct to Lung',
    url: 'dtl',
  },
  {
    id: 3,
    korean: '기기',
    english: 'Device',
    url: 'device',
  },
  {
    id: 4,
    korean: '코일 & 팟',
    english: 'Coil & Pod',
    url: 'coils_pods',
  },
];
