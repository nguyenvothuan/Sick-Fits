import gql from 'graphql-tag';
import { useMutation } from '@apollo/client/react';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

// evict function from apollo. So there is a cache in the client side. You evict this deletion to that cache.
function update(cache, payload) {
  console.log(payload);
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: {
        id,
      },
      // refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
      update,
    }
  );
  return (
    <button
      type="button"
      onClick={() => {
        if (confirm('Sure, bitch?')) {
          deleteProduct().catch((error) => alert(error.message));
          console.log('deleted');
        }
      }}
    >
      {children}
    </button>
  );
}
