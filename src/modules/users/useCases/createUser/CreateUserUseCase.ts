import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const userByEmail = this.usersRepository.findByEmail(email)

    if (userByEmail) {
      throw new Error("Usuário já existe");
    }

    const user = this.usersRepository.create({email, name})
    return user
  }
}

export { CreateUserUseCase };
