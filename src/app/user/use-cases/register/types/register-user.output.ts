import { User } from '@app/user/domain/user';

export type RegisterUserOutput = {
  data: User;
  notifications?: string[];
};
