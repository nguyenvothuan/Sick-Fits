import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  console.log({ query });
  if (!query?.token)
    return (
      <div>
        <p>You gotta be kidding</p>
        <RequestReset />
      </div>
    );
  return (
    <div>
      <p>Reset your password</p>
      <Reset token={query?.token}/>
    </div>
  );
}
