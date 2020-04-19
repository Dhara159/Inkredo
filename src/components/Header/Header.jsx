import React, { useContext } from 'react';

import CurrentUserContext from '../../contexts/CurrentUser/CurrentUser';

import { auth } from '../../firebase/firebase.utils';

import { HeaderContainer, OptionsContainer, OptionLink } from './Header.styles';

const Header = () => {
  const currentUser = useContext(CurrentUserContext);
  return (<HeaderContainer>
    <OptionsContainer>
      <OptionLink to='/'>COMPANIES</OptionLink>
      {currentUser ? (
        <OptionLink to='/' onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionLink>
      ) : (
          <OptionLink to='/signin'>
            SIGN IN
          </OptionLink>
        )}
    </OptionsContainer>
  </HeaderContainer>)
};

export default Header;