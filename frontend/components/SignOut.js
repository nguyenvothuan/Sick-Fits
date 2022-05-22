import { gql, useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';

const END_SESSION = gql`
  mutation END_SESSION {
    endSession
  }
`;
export default function SignOut() {
  const [signout] = useMutation(END_SESSION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button onClick={signout} type="button">
      Sign Out
    </button>
  );
}
