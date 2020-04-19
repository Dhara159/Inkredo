import React, { useState } from 'react';

import { SignInContainer, SignInTitle, ButtonsBarContainer } from './SignIn.styles';

import FormInput from '../FormInput/FormInput';
import CustomButton from './../CustomButton/CustomButton';

import { auth } from '../../firebase/firebase.utils';

const SignIn = () => {

  const [userCredentials, setCredentials] = useState({ email: '', password: '' });

  const { email, password } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setCredentials({ ...userCredentials, displayName: '', email: '', password: '' });
    } catch (error) {
      alert(error.message);
    }
  }

  const handleChange = event => {
    const { value, name } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  }

  return (
    <SignInContainer>
      <SignInTitle>I already have an account</SignInTitle>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          handleChange={handleChange}
          value={email}
          label='email'
          required
        />
        <FormInput
          name='password'
          type='password'
          handleChange={handleChange}
          value={password}
          label='password'
          required
        />
        <ButtonsBarContainer>
          <CustomButton type='submit'> Sign in </CustomButton>
        </ButtonsBarContainer>
      </form>
    </SignInContainer>
  );
};

export default SignIn;