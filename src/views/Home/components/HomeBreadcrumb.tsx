import { Breadcrumb } from 'antd';
import styles from '../Home.module.scss';
import { useLocation, matchRoutes } from 'react-router-dom';
import { routes } from '../../../router';

export default function HomeBreadcrumb() {
  const location = useLocation();
  const matchs = matchRoutes(routes, location);

  return (
    <Breadcrumb className={styles['home-breadcrumb']}>
      {matchs?.map((item) => (
        <Breadcrumb.Item key={item.pathnameBase}>
          {item.route.meta?.title}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}
