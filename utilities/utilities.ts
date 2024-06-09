import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const languages = [
  {
    shortLabel: 'EN',
    label: 'English',
    isoCode: 'en',
  },
  {
    shortLabel: '中',
    label: '中文',
    isoCode: 'zh-CN',
  },
];

export function debugPrint(...args: any) {
  if (isDebug()) {
    console.log(...args);
  }
}

export function isDebug() {
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
}
