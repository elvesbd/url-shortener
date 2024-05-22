import { Notification } from '@app/shared/notification/notification';
import { Email } from '@app/shared/value-objects/email';

describe('Email Value Object', () => {
  let notification: Notification;

  beforeEach(() => {
    notification = new Notification();
  });

  describe('validate()', () => {
    it('should add notification for empty email', () => {
      new Email('', notification);
      expect(notification.getNotifications()).toContain(
        'Email should not be empty',
      );
    });

    it('should add notification for email exceeding 320 characters', () => {
      const longEmail = 'a'.repeat(310) + '@example.com';
      new Email(longEmail, notification);
      expect(notification.getNotifications()).toContain(
        'Email should not exceed 320 characters',
      );
    });

    it('should add notification for missing @', () => {
      new Email('example.com', notification);
      expect(notification.getNotifications()).toContain('Invalid email format');
    });

    it('should add notification for missing domain', () => {
      new Email('user@.com', notification);
      expect(notification.getNotifications()).toContain('Invalid email format');
    });

    it('should add notification for missing name', () => {
      new Email('@example.com', notification);
      expect(notification.getNotifications()).toContain('Invalid email format');
    });

    it('should add notification for space in email', () => {
      new Email('user @example.com', notification);
      expect(notification.getNotifications()).toContain('Invalid email format');
    });

    it('should add notification for double @', () => {
      new Email('user@ex@ample.com', notification);
      expect(notification.getNotifications()).toContain('Invalid email format');
    });

    it('should add notification for incomplete domain', () => {
      new Email('user@example', notification);
      expect(notification.getNotifications()).toContain('Invalid email format');
    });

    it('should not add notification for valid email', () => {
      const email = new Email('test@example.com', notification);
      expect(notification.getNotifications()).toHaveLength(0);
      expect(email.value).toBe('test@example.com');
    });
  });
});
