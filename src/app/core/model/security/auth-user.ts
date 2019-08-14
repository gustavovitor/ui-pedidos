export class AuthUserForm {
  email: string;
  senha: string;
}

export class User extends AuthUserForm {
  id: number;
}
