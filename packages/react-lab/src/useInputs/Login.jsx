import React from 'react';
import useInputs from './useInputs';

const Login = () => {
  const [{ email, password }, handleChangeInput] = useInputs({
    email: '',
    password: '',
  });

  return (
    <div>
      <input name="email" value={email} onChange={handleChangeInput} />
      <input name="password" value={password} onChange={handleChangeInput} />
    </div>
  );
};

export default Login;
