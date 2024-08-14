import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.tsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Auth0Provider
    domain="dev-xvabw6x4gwjo0fum.us.auth0.com"
    clientId="q07cBiC7mWN64N8wx3gQ6v1gx5OYRtGW"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
)
