# SMS Notifier for Groups

https://github.com/faulke/group-text/workflows/Node%20CI/badge.svg

## Project setup

Use `npm` to install the project dependencies:

```bash
npm install
```

### Configuration

The project needs to be configured with your Auth0 domain, client ID, and API identifier in order for the authentication flow to work.

To do this, first copy `src/auth_config.example.json` into a new file in the same folder called `src/auth_config.json`, and replace the values with your own Auth0 application credentials:

```json
{
  "domain": "{YOUR AUTH0 DOMAIN}",
  "clientId": "{YOUR AUTH0 CLIENT ID}",
  "audience": "{YOUR AUTH0 API ISSUER/IDENTIFIER}"
}
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
npm run test
```
