import { Notification } from '@app/shared/notification';
import { Password } from '@app/shared/value-objects/password';

describe('Password Value Object', () => {
  let notification: Notification;

  beforeEach(() => {
    notification = new Notification();
  });

  describe('validate()', () => {
    it('should add notification for password shorter than 8 characters', () => {
      new Password('short1!', notification);
      expect(notification.getNotifications()).toContain(
        'Password must be at least 8 characters long',
      );
    });

    it('should add notification for password without letters', () => {
      new Password('12345678!', notification);
      expect(notification.getNotifications()).toContain(
        'Password must contain at least one letter',
      );
    });

    it('should add notification for password without numbers', () => {
      new Password('password!', notification);
      expect(notification.getNotifications()).toContain(
        'Password must contain at least one number',
      );
    });

    it('should add notification for password without special characters', () => {
      new Password('password1', notification);
      expect(notification.getNotifications()).toContain(
        'Password must contain at least one special character',
      );
    });

    it('should not add notification for valid password', () => {
      const password = new Password('Password1!', notification);
      expect(notification.getNotifications()).toHaveLength(0);
      expect(password.value).toBe('Password1!');
    });
  });
});
