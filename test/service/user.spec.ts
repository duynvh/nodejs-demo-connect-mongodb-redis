import { expect } from 'chai';
import { UserService } from '../../service/user';

describe('UserService', () => {
  let service: any;
  beforeEach(() => {
    service = new UserService();
  });

  it('should get back all user', () => {
    expect(service.getUsers()).to.deep.equal([
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
    expect(service.getUser('duynvh')).to.deep.equal({
      email: 'duynvh@gmail.com',
      name: 'duynvh',
    });
  });

  it('should add a new user', () => {
    expect(service.getUsers()).to.have.length(2);
    expect(
      service.addUser({
        email: 'test@test.com',
        name: 'test',
      })
    ).to.deep.equal({
      email: 'test@test.com',
      name: 'test',
    });
    expect(service.getUsers()).to.have.length(3);
  });

  it('should update a existing user', () => {
    expect(
      service.updateUser('duynvh', {
        email: 'changed@changed.com',
        name: 'duynvh',
      })
    ).to.deep.equal({
      email: 'changed@changed.com',
      name: 'duynvh',
    });
  });

  it('should delete a user', () => {
    expect(service.getUsers()).to.have.length(2);
    expect(service.deleteUser('duynvh')).to.equal('duynvh');
    expect(service.getUsers()).to.have.length(1);
  });
});
