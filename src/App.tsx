import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import HeaderBarLayout from './components/layout/HeaderBarLayout';
import ItemDetailPage from './pages/ItemDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HeaderBarLayout />,
    children: [
      {
        path: '/',
        element: null,
      },
      {
        path: '/item-detail/:itemId',
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
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
