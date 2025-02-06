import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import DropDownHeaderBarLayout from './components/layout/DropDownHeaderBarLayout';
import HomeHeaderBarLayout from './components/layout/HomeHeaderBarLayout';
import PopupProvider from './components/Modal/PopupProvider';
import { ToastProvider } from './components/Modal/ToastProvider';
import { useUserActions } from './context/userStore';
import AccountDeletePage from './pages/AccountDeletePage';
import EmailVerifyPage from './pages/EmailVerifyPage';
import HomePage from './pages/HomePage';
import ItemDetailPage from './pages/ItemDetailPage';
import ItemEditPage from './pages/ItemEditPage';
import ItemRegisterPage from './pages/ItemRegisterPage';
import LoginPage from './pages/LoginPage';
import Mypage from './pages/Mypage';
import ProfileEditPage from './pages/ProfileEditPage';
import RecoveryIdPage from './pages/RecoveryIdPage';
import RecoveryPasswordPage from './pages/RecoveryPasswordPage';
import RegisterPage from './pages/RegisterPage';
import SendEmailPage from './pages/SendEmailPage';

const router = createBrowserRouter([
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <HomeHeaderBarLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/',
    element: <DropDownHeaderBarLayout />,
    children: [
      {
        path: 'register',
        element: null,
        children: [
          { path: '', element: <RegisterPage /> },
          { path: 'send-email', element: <SendEmailPage /> },
          { path: 'email-verify/:code', element: <EmailVerifyPage /> },
        ],
      },
      {
        path: 'recovery',
        element: null,
        children: [
          {
            path: 'id',
            element: <RecoveryIdPage />,
          },
          {
            path: 'password',
            element: <RecoveryPasswordPage />,
          },
        ],
      },
      {
        path: 'mypage',
        element: null,
        children: [
          {
            path: '',
            element: <Mypage />,
          },
          {
            path: 'edit',
            element: null,
            children: [
              { path: 'nickname', element: <ProfileEditPage /> },
              { path: 'password', element: <ProfileEditPage /> },
            ],
          },
          {
            path: 'delete',
            element: <AccountDeletePage />,
          },
        ],
      },
      {
        path: 'auction',
        element: null,
        children: [
          {
            path: 'register',
            element: <ItemRegisterPage />,
          },
          {
            path: 'detail/:itemId',
            element: null,
            children: [
              {
                path: '',
                element: <ItemDetailPage />,
              },
              {
                path: 'edit',
                element: <ItemEditPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <div>잘못된 경로입니다</div>,
  },
]);

const App = () => {
  const { loadUser } = useUserActions();
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <>
      <PopupProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </PopupProvider>
    </>
  );
};

export default App;
