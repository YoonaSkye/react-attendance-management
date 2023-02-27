import React, { useState } from 'react';
import styles from './Login.module.scss';
import loginLeft from '../../assets/images/login_left.png';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../store';
import { loginAction, updateToken } from '../../store/modules/users';
import LoginForm from './LoginForm';

export default function Login() {
  const token = useAppSelector((state) => state.users.token);
  const dispatch = useAppDispatch();

  // const handleLogin = () => {
  //   dispatch(
  //     loginAction({ email: 'huangrong@imooc.com', pass: 'huangrong' })
  //   ).then((action) => {
  //     console.log(action);
  //     const { errcode, token } = (
  //       action.payload as { [index: string]: unknown }
  //     ).data as { [index: string]: unknown };
  //     if (errcode === 0 && typeof token === 'string') {
  //       dispatch(updateToken(token));
  //       message.success('登录成功');
  //     } else {
  //       message.error('登录失败');
  //     }
  //   });
  // };

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
