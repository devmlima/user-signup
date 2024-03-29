import { Request, Response } from "express";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const user = this.showUserProfileUseCase.execute({user_id: request.params.user_id})
      return response.status(201).send(user)
    } catch (error) {
      return response.status(404).json({error})
    }
  }
}

export { ShowUserProfileController };
