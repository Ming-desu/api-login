# api-login

Simple token based authentication using NodeJS and ExpressJS

## Dependencies

- [Mongoose](https://mongoosejs.com)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Express](https://expressjs.com)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)

## Get Started

```bash
npm install
```

## Run Server

```bash
npm run dev
```

## API Routes

- :white_check_mark: :unlock: POST /auth/login
  - Request Body
    - username (String, **Required**)
    - password (String, **Required**)
- :white_check_mark: :unlock: POST /auth/refresh-token
  - Request Body
    - accessToken (String, **Required**)
    - refreshToken (String, **Required**)
- :white_check_mark: :unlock: POST /register
  - Request Body
    - first_name (String, **Required**)
    - last_name (String, **Required**)
    - username (String, **Required**)
    - password (String, **Required**)
- :white_check_mark: :lock: GET /profile
  - Request Header
    - AccessToken (String, **Required**)

## Bugs and Feature Requests

Encountered a bug? [Report bug](https://github.com/Ming-desu/api-login/issues/new?template=bug.md)
Have feature request? [Request feature](https://github.com/Ming-desu/api-login/issues/new?template=feature.md&labels=feature)

## Copyright and License

The source code and documentation copyright 2019-2020 the authors. Code released under the [MIT License](https://github.com/Ming-desu/api-login/blob/master/LICENSE)
Have a nice day and enjoy! :metal:
