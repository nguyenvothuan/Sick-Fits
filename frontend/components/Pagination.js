import Head from 'next/head';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { data, error, loading } = useQuery(PAGINATION_QUERY);
  if (loading) return null;
  if (error) return <DisplayError error={error} />;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);
  return (
    <PaginationStyles>
      <Head>
        <title>
          Stuff - Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${parseInt(page) - 1}`}>
        <a aria-disabled={page <= 1} data-cool="true">
          {/* If we want attributes other than href, use a nested anchorlink instead */}
          Prev
        </a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${parseInt(page) + 1}`}>
        <a aria-disabled={page >= count}>Next</a>
      </Link>
    </PaginationStyles>
  );
}
