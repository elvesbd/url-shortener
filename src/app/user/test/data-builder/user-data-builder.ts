import { UserProps } from '@app/user/domain/types/user.props';

export class UserDataBuilder {
  private props: UserProps = {
    name: 'Yasmin Manuela Farias Lima',
    email: 'yasminmanuelafarias@capgemini.com',
    password: '@654#67=',
  };

  public static aUser(): UserDataBuilder {
    return new UserDataBuilder();
  }

  public build(): UserProps {
    return this.props;
  }
}