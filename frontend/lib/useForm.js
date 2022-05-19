import { func } from 'prop-types';
import { useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object fror our inputs
  const [input, setInputs] = useState(initial);
  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      value[0] = e.target.file;
    }
    setInputs({
      ...input,
      [name]: value,
    });
  }
  function resetForm() {
    setInputs(initial);
  }
  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(input).map(([key, value]) => [key, null])
    );
    setInputs(blankState);
  }
  return {
    input,
    handleChange,
    resetForm,
    clearForm,
  };
}
