import { FC } from 'react';
import Topbar from '../topbar/topbar';
import styles from './page-wrapper.module.scss';

type Props = {
  logo: string;
  navigation: Record<string, string>;
  children: React.ReactNode;
};

const PageWrapper: FC<Props> = ({ children, logo, navigation }) => {
  return (
    <>
      <Topbar logo={logo} navigation={navigation} />
      <main className="md:container">{children}</main>
    </>
  );
};
export default PageWrapper;
