import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react-native';
import Form from '@/src/components/Form';
import { renderHook } from '@testing-library/react-native';
import { useForm, Controller } from 'react-hook-form';
jest.useFakeTimers();



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
      },
    }),
  };
});

describe('Form Component', () => {
  const { result } = renderHook(() => useForm());
  const methods = result.current;

  const fields = [
    { name: 'username', label: 'Username' },
    { name: 'password', label: 'Password', isPassword: true },
  ];
  it('renders all input fields', async () => {
    render(<Form {...methods} errors={{}} fields={fields} />);
    //screen.debug();
    await waitFor(() => {
      fields.forEach((field) => {
        expect(screen.getByLabelText(field.label)).toBeDefined();
      });
    });
  });

  it('updates input values when user types', async () => {
    render(<Form {...methods} errors={{}} fields={fields} />);

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'password123');

    expect(usernameInput.props.value).toBe('testuser');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('displays validation errors', async () => {
    render(
      <Form
        {...methods}
        errors={{
          password: {
            message: 'Password is required',
            ref: { name: 'password' },
            type: 'invalid_type',
          },
          username: {
            message: 'Username is required',
            ref: { name: 'username' },
            type: 'invalid_type',
          },
        }}
        fields={fields}
      />
    );

    const passwordErrorText = screen.getByText('Password is required');
    const usernameErrorText = screen.getByText('Username is required');
    expect(passwordErrorText).toBeDefined();
    expect(usernameErrorText).toBeDefined();
  });
});
