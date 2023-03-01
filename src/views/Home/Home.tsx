import styles from './Home.module.scss';
import { Layout } from 'antd';
import HomeHeader from './components/HomeHeader';
import HomeBreadcrumb from './components/HomeBreadcrumb';
import HomeAside from './components/HomeAside';
import HomeMain from './components/HomeMain';

const { Header, Content, Sider } = Layout;

export default function Home() {
  return (
    <div>
      <Layout>
        <Header>
          <HomeHeader />
        </Header>
        <Layout>
          <Sider width={200} theme="light">
            <HomeAside />
          </Sider>
          <Layout style={{ padding: '20px' }}>
            <HomeBreadcrumb />
            <Content className={styles['home-main']}>
              <HomeMain />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}
