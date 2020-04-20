import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import FormInput from '../FormInput/FormInput';
import CustomButton from './../CustomButton/CustomButton';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import { SignUpContainer, SignUpTitle } from './SignUp.styles';

const SignUp = ({ history }) => {

  const [userCredentials, setCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });
      await setCredentials({
        ...userCredentials,
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      history.push('/');
    } catch (error) {
      alert(error);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  }

  return (
    <SignUpContainer>
      <SignUpTitle>I do not have a account</SignUpTitle>
      <span>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          onChange={handleChange}
          label='Display Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
          label='Confirm Password'
          required
        />
        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>
    </SignUpContainer>
  )
};

export default withRouter(SignUp);