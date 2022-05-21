import Router, { useRouter } from 'next/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

export default function OrderPage() {
  const { query } = useRouter();
  console.log(query);
  return (
    <div>
      <Pagination page={query.page || 1} />
      <Products />
      <Pagination page={query.page || 1} />
    </div>
  );
}
