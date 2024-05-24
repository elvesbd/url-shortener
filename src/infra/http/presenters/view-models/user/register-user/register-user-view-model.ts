import { UnprocessableEntityException } from '@nestjs/common';
import { User } from '@app/user/domain/user';
import { BaseViewModel } from '../../base.view-model';

type RegisterUserVMResponse = {
  id: string;
  name: string;
  email: string;
};

export class RegisterUserViewModel implements BaseViewModel {
  public static toHTTP(model: User): RegisterUserVMResponse {
    if (model.hasNotifications) {
      throw new UnprocessableEntityException({
        notifications: model.notifications,
      });
    }

    return {
      id: model.id.value,
      name: model.name.value,
      email: model.email.value,
    };
  }
}
