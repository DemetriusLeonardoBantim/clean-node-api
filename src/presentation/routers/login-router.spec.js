class LoginRouter {
  route(httpRequest) {
    if (!httpRequest.body.email || !httpRequest.body.passoword) {
      return {
        statusCode: 400,
      };
    }
  }
}

describe('Login Router', () => {
  test('Should return 400 if no email is provider', async () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        password: 'any_password',
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
  test('Should return 400 if no password is provider', async () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});
