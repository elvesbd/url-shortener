import { UserDataBuilder } from './user-data-builder';

export class UserObjectMother {
  static user() {
    return UserDataBuilder.aUser().build();
  }

  static withInvalidIdLength() {
    const smallId = 'A23&4E=';
    return UserDataBuilder.aUser().withInvalidId(smallId).build();
  }
}
