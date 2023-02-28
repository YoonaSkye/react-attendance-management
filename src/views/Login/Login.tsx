import styles from './Login.module.scss';
import loginLeft from '../../assets/images/login_left.png';
import classNames from 'classnames';

import LoginForm from './LoginForm';

export default function Login() {
  return (
    <div className={styles.login}>
      <div className={styles['login-box']}>
        <div className={styles['login-left']}>
          <img src={loginLeft} alt="login" />
        </div>
        <div className={styles['login-form']}>
          <div className={styles['login-logo']}>
            <i
              className={classNames(
                'iconfont icon-React',
                styles['icon-React']
              )}
            ></i>
            <i
              className={classNames(
                'iconfont icon-typescript',
                styles['icon-typescript']
              )}
            ></i>
            <span className={styles['logo-text']}>Hooks-Admin</span>
          </div>
          {/* <LoginForm /> */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
