import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
} from 'inversify-express-utils';

import { inject } from 'inversify';
import { IUser, UserService } from '../service/user';
import { request, Request, Response } from 'express';

import TYPES from '../constant/types';

@controller('/users')
export class UserController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  @httpGet('/')
  public async getUsers(): Promise<IUser[]> {
    return await this.userService.getUsers();
  }

  @httpGet('/:id')
  public async getUser(request: Request): Promise<IUser | undefined> {
    return this.userService.getUser(request.params.id);
  }

  @httpPost('/')
  public addUser(request: Request): Promise<void> {
    return this.userService.addUser(request.body);
  }

  @httpPut('/:name')
  public updateUser(request: Request): Promise<void> {
    return this.userService.updateUser(request.params.name, request.body);
  }

  @httpDelete('/:name')
  public deleteUser(request: Request): Promise<void> {
    return this.userService.deleteUser(request.params.name);
  }

  @httpPost('/convert-name')
  public convert(request: Request, response: Response): Object {
    const data = this.userService.convertNameOfUser(request.body.name);

    return response.json({
      data,
    });
  }
}
