import { UserDataBuilder } from './user-data-builder';

export class UserObjectMother {
  static user() {
    return UserDataBuilder.aUser().build();
  }

  static withInvalidIdLength() {
    const smallId = '1234567';
    return UserDataBuilder.aUser().withInvalidId(smallId).build();
  }
}
