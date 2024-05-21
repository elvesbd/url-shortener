import { BaseViewModel } from './base.view-model';
import { RegisterUserOutput } from '@app/user/use-cases/register/types/register-user.output';

export type UserVMResponse = {
  data: {
    id: string;
    name: string;
    email: string;
  } | null;
  notifications?: string[];
};

export class UserViewModel implements BaseViewModel {
  public static toHTTP(output: RegisterUserOutput): UserVMResponse {
    const user = output.data;

    if (user) {
      return {
        data: {
          id: user.id.value,
          name: user.name.value,
          email: user.email.value,
        },
        notifications: [],
      };
    } else {
      return {
        data: null,
        notifications: output.notifications,
      };
    }
  }
}
