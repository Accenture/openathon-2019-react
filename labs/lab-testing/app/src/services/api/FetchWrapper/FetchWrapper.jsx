import React from 'react';
import Request from '../Fetch/Fetch';

const FetchWrapper = (method) => {
  return (props) => (
    <Request {...props} method={method}>
        {props.children}
    </Request>
  )
}

export default FetchWrapper;
