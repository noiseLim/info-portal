import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { ReducersMapObject } from '@reduxjs/toolkit';

import i18nForTest from '@/shared/config/i18n/i18nForTest';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';

export interface componentRenderProps {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export function componentRender(
  component: ReactNode,
  options: componentRenderProps = {}
) {
  const { route = '/', initialState, asyncReducers } = options;
  return render(
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider initialState={initialState} asyncReducers={asyncReducers}>
        <I18nextProvider i18n={i18nForTest}>{component}</I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  );
}
