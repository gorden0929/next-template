import styles from './template.module.scss';
import { useTranslation } from 'next-i18next';

const Template = ({ children }: { children: React.ReactNode }) => {
  // const { t, i18n, ready } = useTranslation('common');
  return <div>{children}</div>;
};
export default Template;
