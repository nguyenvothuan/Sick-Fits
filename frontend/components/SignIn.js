import gql from 'graphql-tag';
import { useMutation } from '@apollo/client/react';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
        code
      }
    }
  }
`;

export default function SignIn() {
  const { input, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  const [signin, { data, error, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: input,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    const res = await signin();
    console.log(res);
    resetForm();
  };
  const err =
    data?.authenticateUserWithPassword?.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Into Your Account</h2>
      <Error error={err} />
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={input.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={input.password}
            onChange={handleChange}
          />
        </label>
        <input type="submit" />
      </fieldset>
    </Form>
  );
}
