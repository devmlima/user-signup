import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const user = this.createUserUseCase.execute({ email: request.body.email, name: request.body.name })
      return response.status(201).json(user)
    } catch (error) {
      return response.status(400).json({error})
    }
  }
}

export { CreateUserController };
