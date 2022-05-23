import gql from 'graphql-tag';
import { useMutation } from '@apollo/client/react';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { input, handleChange, resetForm } = useForm({
    email: '',
  });
  const [createUser, { data, error, loading }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: input,
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createUser().catch(console.log); // catch error.
    resetForm();
  };
  const err =
    data?.authenticateUserWithPassword?.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      <Error error={error} />
      <fieldset>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - Please Go Head and Sign in!
          </p>
        )}
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
        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
}
