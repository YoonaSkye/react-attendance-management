import { Breadcrumb } from 'antd';
import styles from '../Home.module.scss';

export default function HomeBreadcrumb() {
  return (
    <Breadcrumb className={styles['home-breadcrumb']}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>An Application</Breadcrumb.Item>
    </Breadcrumb>
  );
}
