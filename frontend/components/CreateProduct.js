import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Router from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    #variable passed to
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      # fields to be returned by the mutation
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  const { input, handleChange, resetForm, clearForm } = useForm({
    name: 'Hong Anh',
    price: 9,
    description: 'youre the sunflower',
    image: '',
  });
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: input,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }], // refetch these queries after this mutation is made.
    }
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createProduct();
    clearForm();
    // Go to that product page.
    Router.push({
      pathname: `/product/${res.data.createProduct.id}`,
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <ErrorMessage error={error} />
      <fieldset aria-busy={loading} disabled={loading}>
        <label htmlFor="image">
          Name
          <input type="file" id="image" name="image" onChange={handleChange} />
        </label>
        <label htmlFor="name">
          Name
          <input
            required
            type="text"
            id="name"
            placeholder="Name"
            name="name"
            value={input.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            placeholder="price"
            name="price"
            value={input.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={input.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}
