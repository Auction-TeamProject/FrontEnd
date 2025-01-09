import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import DropDownHeaderBarLayout from './components/layout/DropDownHeaderBarLayout';
import { ToastProvider } from './components/Modal/ToastProvider';
import { useUserActions } from './context/userStore';
import ItemDetailPage from './pages/ItemDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/',
        element: <DropDownHeaderBarLayout headerTitle={'홈'} />,
        children: [
          {
            path: '/',
            element: null,
          },
        ],
      },
      {
        path: '/item-detail',
        element: <DropDownHeaderBarLayout />,
        children: [
          {
            path: ':itemId',
            element: <ItemDetailPage />,
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
  const { loadUser, setUser } = useUserActions();
  useEffect(() => {
    setUser('작성자'); //원래 로그인시 사용해야하지만 테스트를 위해 사용
    loadUser();
  }, [loadUser, setUser]);

  return (
    <>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </>
  );
};

export default App;
