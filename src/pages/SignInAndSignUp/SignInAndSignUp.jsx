import React from 'react';

import { SignInAndSignUp } from './SignInAndSignUp.styles';

import SignIn from '../../components/SignIn/SignIn'
import SignUp from './../../components/SignUp/SignUp';

const SignInAndSignUpPage = () => (
  <SignInAndSignUp>
    <SignIn />
    <SignUp />
  </SignInAndSignUp>
);

export default SignInAndSignUpPage;