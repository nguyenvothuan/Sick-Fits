import { useState } from 'react';
import useForm from '../lib/useForm';

export default function CreateProduct() {
  const { input, handleChange, resetForm, clearForm } = useForm({
    name: 'Hong Anh',
    price: 9,
    description: 'my future wife',
  });
  return (
    <form>
      <label htmlFor="name">
        Name
        <input
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
    </form>
  );
}
