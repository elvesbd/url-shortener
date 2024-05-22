import { UserObjectMother } from '../__mocks__/data-builder/user-object.mother';
import { User } from './user';

describe('User', () => {
  jest.clearAllMocks();
  const validProps = UserObjectMother.user();
  const invalidProps = UserObjectMother.withInvalidIdLength();

  it('should create a user instance', () => {
    const user = User.create(validProps);

    expect(user).toBeInstanceOf(User);
  });

  it('should set password with hash', () => {
    const user = User.create(validProps);
    const hashedPassword =
      '$2a$12$nsE/R/UozqXEQjn22pRTr.KZCwacqvGiN91Rh/o/SNmSzYc12ZowG';
    user.setPasswordWithHash(hashedPassword);

    expect(user.password.value).toBe(hashedPassword);
  });

  it('should return true if user has notifications', () => {
    const user = User.create(invalidProps);

    expect(user.hasNotifications).toBeTruthy();
  });

  it('should return list of notifications', () => {
    const user = User.create(invalidProps);

    expect(user.notifications).toHaveLength(1);
    expect(user.notifications).toEqual([
      'Password must be at least 8 characters long',
    ]);
  });

  it('should get name prop', () => {
    const user = User.create(validProps);

    expect(user.name.value).toBe(validProps.name);
  });

  it('should get email prop', () => {
    const user = User.create(validProps);

    expect(user.email.value).toBe(validProps.email);
  });

  it('should get password prop', () => {
    const user = User.create(validProps);

    expect(user.password.value).toBe(validProps.password);
  });

  it('should create a user on success', () => {
    const user = User.create(validProps);

    expect(user.id).toBeDefined();
    expect(user.name.value).toBe(validProps.name);
    expect(user.email.value).toBe(validProps.email);
    expect(user.password.value).toBe(validProps.password);
  });
});
