import { expect } from 'chai';
import { UserController } from '../../controller/user';
import { UserService } from '../../service/user';

describe('UserController', () => {
  let controller: any;

  beforeEach(() => {
    controller = new UserController(new UserService());
  });

  it('should get back all user', () => {
    expect(controller.getUsers()).to.deep.equal([
      {
        email: 'admin@gmail.com',
        name: 'admin',
      },
      {
        email: 'duynvh@gmail.com',
        name: 'duynvh',
      },
    ]);
  });

  it('should give back the right user', () => {
    expect(
      controller.getUser({
        params: {
          name: 'duynvh',
        },
      })
    ).to.deep.equal({
      email: 'duynvh@gmail.com',
      name: 'duynvh',
    });
  });

  it('should add a new user', () => {
    expect(controller.getUsers()).to.have.length(2);
    expect(
      controller.addUser({
        body: {
          email: 'test@test.com',
          name: 'test',
        },
      })
    ).to.deep.equal({
      email: 'test@test.com',
      name: 'test',
    });
    expect(controller.getUsers()).to.have.length(3);
  });

  it('should update a existing user', () => {
    expect(
      controller.updateUser({
        body: {
          email: 'changed@changed.com',
          name: 'duynvh',
        },
        params: {
          id: 'duynvh',
        },
      })
    ).to.deep.equal({
      email: 'changed@changed.com',
      name: 'duynvh',
    });
  });

  it('should delete a user', () => {
    expect(controller.getUsers()).to.have.length(2);
    expect(
      controller.deleteUser({
        params: {
          name: 'duynvh',
        },
      })
    ).to.equal('duynvh');
    expect(controller.getUsers()).to.have.length(1);
  });
});
