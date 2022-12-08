import { useState } from 'react';

export default function useInputs(initialValue) {
  const [values, setValues] = useState(initialValue);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return [values, handleChangeInput];
}
