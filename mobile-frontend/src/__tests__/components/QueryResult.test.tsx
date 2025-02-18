import QueryResult from '@/src/components/QueryResult';
import { render, screen } from '@testing-library/react-native';
import { ApolloError } from '@apollo/client';
import React from 'react';
import { View, Text } from 'react-native';
jest.mock('@react-navigation/native', () => {
  return {
    useTheme: () => ({
      dark: false,
      colors: {
        primary: 'blue',
        background: 'white',
        card: 'gray',
        text: 'black',
        border: 'green',
        error: 'red',
        success: 'green',
      },
    }),
  };
});

jest.mock('@/src/i18n/i18n-react', () => {
  return {
    useI18nContext: () => ({
      LL: {
        ERROR: () => 'Error',
        LOADING: () => 'Loading',
        NOTHING_TO_SHOW: () => 'Nothing to show',
      },
    }),
  };
});

describe('QueryResult Component', () => {
  it('renders error message when error prop is true', async () => {
    const { findByText } = render(
      <QueryResult
        children={<></>}
        data={null}
        loading={false}
        error={{ name: 'Error', message: 'An error occured.' } as ApolloError}
      />
    );
    expect(await findByText('Error: An error occured.')).toBeDefined();
  });

  it('renders loading indicator when loading prop is true', async () => {
    const { findByTestId } = render(
      <QueryResult
        children={<></>}
        data={null}
        loading={true}
        error={undefined}
      />
    );

    expect(await findByTestId('loading-indicator')).toBeDefined();
  });

  it('renders data when data is not null', async () => {
    const { findByText } = render(
      <QueryResult
        data={{ breed: 'cat', name: 'Cherry Pie' }}
        loading={false}
        error={undefined}
      >
        <View>
          <Text>Cat: Cherry Pie</Text>
        </View>
      </QueryResult>
    );

    expect(await findByText('Cat: Cherry Pie')).toBeDefined();
  });

  it('renders "nothing to show" message when data is null, error is undefined and loading is false', async () => {
    const { findByText } = render(
      <QueryResult
        children={<></>}
        data={null}
        loading={false}
        error={undefined}
      />
    );

    expect(await findByText('Nothing to show')).toBeDefined();
    screen.debug();
  });
});
