import React, { useState } from 'react';
import "./FormLogin.scss";
import { Input } from '../Input/Input';
import Notification from '../Notification/Notification';
import Button from '../Button/Button';
import { getRequestToken, validateWithLogin, createSession, fetchAccountData } from '../../api/authApi';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';

interface FormLoginProps {
  additionalClass?: string;
}

const FormLogin = ({ additionalClass }: FormLoginProps) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const requestToken = await getRequestToken();
      const validatedToken = await validateWithLogin(user, password, requestToken);
      const sessionId = await createSession(validatedToken);
      const userData: User = await fetchAccountData(sessionId);

      localStorage.setItem('session_id', sessionId);
      dispatch(login({ username: userData.username, userId: userData.id, sessionId }));

      setSuccess('Login bem-sucedido! Redirecionando...');
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      setError('Usuário ou senha inválidos. Por favor, tente novamente.');
    }
  };

  return (
    <form className={`c-login ${additionalClass ? additionalClass : ""}`} onSubmit={handleSubmit}>
      <Input label="Usuário" name="user" type="text" placeholder="Informe seu usuário" value={user} callback={setUser} />
      <Input label="Senha" name="password" type="password" placeholder="Informe sua senha" value={password} callback={setPassword} />
      {error && <Notification message={error} float={true} type="error" />}
      {success && <Notification message={success} float={true} type="success" />}
      <Button label="Login" />
    </form>
  )
}

export default FormLogin