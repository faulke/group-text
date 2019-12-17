import React from "react";

import { Box } from "grommet";

const Avatar = ({ name, url, ...rest }) => (
  <Box
    a11yTitle={`${name} avatar`}
    height="46px"
    width="46px"
    round="full"
    background={`url(${url})`}
    {...rest}
  />
)

export default Avatar
