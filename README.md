# SMS Notifier for Groups

![](https://github.com/faulke/group-text/workflows/Node%20CI/badge.svg)

## Project setup

Use `npm` to install the project dependencies:

```bash
npm install
```

### Configuration

This project requires an Auth0 client app and API for the authentication flow,
and a Stripe account for subscriptions.

Create a `.env` file at the project root with:

```bash
REACT_APP_STRIPE_KEY={your Stripe test key}
REACT_APP_AUTH0_DOMAIN={your Auth0 client app domain}
REACT_APP_AUTH0_CLIENT_ID={your Auth0 client app ID}
REACT_APP_AUTH0_AUDIENCE={your Auth0 API audience/identifier}

```

### Compiles and hot-reloads for development

```bash
npm run start
```

## Deployment

### Compiles and minifies for production

```bash
npm run build
```

### Run your tests

```bash
npm test
```
