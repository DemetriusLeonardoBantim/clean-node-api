const LoginRouter = require('./login-router');
const MissingParamError = require('../helpers/missing-param-error');
const UnathorizedError = require('../helpers/unauthorized-error');

const makeSut = () => {
  class AuthUseCaseSpy {
    auth(email, password) {
      this.email = email;
      this.password = password;
      return this.acessToken;
    }
  }
  const authUseCaseSpy = new AuthUseCaseSpy();
  authUseCaseSpy.acessToken = 'valid_token';
  const sut = new LoginRouter(authUseCaseSpy);
  return {
    sut,
    authUseCaseSpy,
  };
};

describe('Login Router', () => {
  test('Should return 400 if no email is provider', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: 'any_password',
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });
  test('Should return 400 if no password is provider', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });
  test('should return 500 if no httpRequest if provided', () => {
    const { sut } = makeSut();
    const httpResponse = sut.route();
    expect(httpResponse.statusCode).toBe(500);
  });
  test('should return 500 if httpRequest no body', () => {
    const { sut } = makeSut();
    const httpRequest = {};
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
  });
  test('Should call AutUsecase with corrent params', () => {
    const { sut, authUseCaseSpy } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
      },
    };
    sut.route(httpRequest);
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password);
  });
  test('Should return 401 when invalid credentials are provided', () => {
    const { sut, authUseCaseSpy } = makeSut();
    authUseCaseSpy.acessToken = null;
    const httpRequest = {
      body: {
        email: 'invalid_email@email.com',
        password: 'invalid_password',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(401);
    expect(httpResponse.body).toEqual(new UnathorizedError());
  });
  test('Should return 200 when valid credentials are provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'valid_email@email.com',
        password: 'valid_password',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
  });
  test('Should return 500 if no AuthUseCase if provided', () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
  });
  test('should return 500 if AuthUseCase has no auth', () => {
    class AuthUseCaseSpy {}

    const authUseCaseSpy = new AuthUseCaseSpy();
    const sut = new LoginRouter(authUseCaseSpy);
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
  });
});
