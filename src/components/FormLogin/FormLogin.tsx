import React, { useState } from 'react';
import "./FormLogin.scss";
import { Input } from '../Input/Input';
import Button from '../Button/Button';

interface FormLoginProps {
  additionalClass?: string;
}

const FormLogin = ({ additionalClass }: FormLoginProps) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form className={`c-login ${additionalClass ? additionalClass : ""}`}>
      <Input label="Usuário" name="user" type="text" placeholder="Informe seu usuário" value={user} callback={setUser} />
      <Input label="Senha" name="password" type="password" placeholder="Informe sua senha" value={password} callback={setPassword} />
      <Button label="Login" />
    </form>
  )
}

export default FormLogin