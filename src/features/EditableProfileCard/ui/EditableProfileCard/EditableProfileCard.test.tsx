import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Profile } from 'entities/Profile';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { $api } from 'shared/api/api';

import { EditableProfileCard } from './EditableProfileCard';
import { profileReducer } from '../../model/slice/profileSlice';

const profile: Profile = {
  id: '1',
  first: 'Сергей',
  lastname: 'Иванов',
  age: 22,
  currency: Currency.RUB,
  country: Country.Russia,
  city: 'Moscow',
  username: 'admin',
  avatar:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSygd7Gx4_9YJJUZA_a9YTlODyJihC-6M9OWLm61MAOHvU8Kr39DXIQuzKlZIXZJiU7joc&usqp=CAU',
};

const option = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: {
        id: '1',
        username: 'admin',
      },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
};

describe('EditableProfileCard', () => {
  test('Readonly mode should switch', async () => {
    componentRender(<EditableProfileCard id='1' />, option);
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton')
    );
    expect(
      screen.getByTestId('EditableProfileCardHeader.CancelButton')
    ).toBeInTheDocument();
  });

  test('When canceled, the original state is returned', async () => {
    componentRender(<EditableProfileCard id='1' />, option);
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton')
    );

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
    await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
    await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user');

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user');
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user');

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.CancelButton')
    );

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('Сергей');
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('Иванов');
  });

  test('An error should appear', async () => {
    componentRender(<EditableProfileCard id='1' />, option);
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton')
    );

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.SaveButton')
    );

    expect(
      screen.getByTestId('EditableProfileCard.Error.Paragraph')
    ).toBeInTheDocument();
  });

  test('If there are no validation errors, then the put request to the server goes away', async () => {
    const mockPutReq = jest.spyOn($api, 'put');
    componentRender(<EditableProfileCard id='1' />, option);
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton')
    );

    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.SaveButton')
    );

    expect(mockPutReq).toHaveBeenCalled();
  });
});
