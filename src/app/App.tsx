import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Sidebar } from '@/widgets/Sidebar';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { getUserInited, initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeatures } from '@/shared/lib/features';

import { AppRouter } from './providers/router';
import { MainLayout } from '@/shared/layouts/MainLayout';

const App = () => {
  const { theme } = useTheme();

  const inited = useSelector(getUserInited);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  if (!inited) {
    return <PageLoader />;
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <div className={classNames('app_redesigned', {}, [theme])}>
          <Suspense fallback=''>
            <MainLayout
              header={<Navbar />}
              content={<AppRouter />}
              sidebar={<Sidebar />}
              toolbar={<div>111111</div>}
            />
          </Suspense>
        </div>
      }
      off={
        <div className={classNames('app', {}, [theme])}>
          <Suspense fallback=''>
            <Navbar />
            <div className='content-page'>
              <Sidebar />
              <AppRouter />
            </div>
          </Suspense>
        </div>
      }
    />
  );
};

export default App;
