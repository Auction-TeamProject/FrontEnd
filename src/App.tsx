import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import DropDownHeaderBarLayout from './components/layout/DropDownHeaderBarLayout';
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
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
