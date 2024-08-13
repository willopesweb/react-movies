import React from 'react'
import FormLogin from '../components/FormLogin/FormLogin';

const LoginPage = () => {
  return (
    <main>
      <header className="l-page__header">
        <h1 className="l-page__title">Faça Login para continuar</h1>
      </header>

      <FormLogin />
    </main>
  );
}

export default LoginPage