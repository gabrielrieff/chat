import { hash } from "bcryptjs";

export class User {
  readonly name: string;
  readonly phone: string;
  password: string;

  constructor(name: string, phone: string, password: string) {
    this.name = name;
    this.phone = phone;
    this.password = password;
  }

  validateName() {
    const regexp = /\d/; // Expressão regular corrigida

    if (regexp.test(this.name)) {
      throw new Error("Nome de usuário contém caracteres inválidos");
    }

    if (this.name.length < 3) {
      throw new Error("Nome de usuário inválido");
    }
  }

  validatePhone() {
    const regexp = /\(\d{2}\)\s\d{5}-\d{4}/; // Expressão regular corrigida

    if (!regexp.test(this.phone)) {
      throw new Error("Número de telefone inválido");
    }
  }

  async hashPassword() {
    this.password = await hash(this.password, 8);
  }

  async getHashedPassword(): Promise<string> {
    if (!this.password) {
      throw new Error("Senha não definida");
    }

    if (!this.password.startsWith("$2")) {
      await this.hashPassword();
    }

    return this.password;
  }

  createUserValidate() {
    this.validateName();
    this.validatePhone();
  }
}
