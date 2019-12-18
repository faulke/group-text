import React from "react";

import { Menu} from "grommet";

import Avatar from './Avatar'
import { useAuth0 } from "../react-auth0-spa"

const UserMenu = ({ user = {}, ...rest }) => {
  const { logout } = useAuth0();
  const logoutWithRedirect = () => logout({ returnTo: `${window.location.origin}/login` })

  return (
    <Menu
      dropAlign={{ bottom: "top" }}
      icon={false}
      justifyContent="center"
      items={[
        {
          label: 'Log Out',
          onClick: () => logoutWithRedirect()
        }
      ]}
      label={<Avatar name={user.name} url={user.picture} />}
      {...rest}
    />
  )
}

export default UserMenu
