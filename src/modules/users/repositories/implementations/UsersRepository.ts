import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";
import { v4 as uuidV4 } from "uuid";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const id = uuidV4()
    const user: User = { 
      name, 
      email, 
      id,
      admin: false,
      created_at: new Date(),
      updated_at: new Date()
    }

    this.users.push(user)

    return user
  }

  findById(id: string): User | undefined {
    return this.users.find(user => user.id === id)
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email)
  }

  turnAdmin(receivedUser: User): User {
    receivedUser.admin = true
    receivedUser.updated_at = new Date()

    this.users = this.users.map(user => {
      if (user.id === receivedUser.id) {
        user = receivedUser
      }

      return user
    })

    return receivedUser
  }

  list(): User[] {
    return this.users
  }
}

export { UsersRepository };
