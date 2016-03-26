import React from 'react';

export default ({onSetToken}) => (
    <input
        type="password"
        name="authenticator-token"
        placeholder="Authenticator token"
        onChange={e => onSetToken(e.target.value)} />
);
