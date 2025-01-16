import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import DropDownHeaderBarLayout from './components/layout/DropDownHeaderBarLayout';
import HomeHeaderBarLayout from './components/layout/HomeHeaderBarLayout';
import { ToastProvider } from './components/Modal/ToastProvider';
import { useUserActions } from './context/userStore';
import HomePage from './pages/HomePage';
import ItemDetailPage from './pages/ItemDetailPage';
import LoginPage from './pages/LoginPage';
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
        path: 'item-detail/:itemId',
        element: <ItemDetailPage />,
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
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </>
  );
};

export default App;
