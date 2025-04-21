export const REFRESH_TOKEN = `
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token) {
      accessToken
    }
  }
`;