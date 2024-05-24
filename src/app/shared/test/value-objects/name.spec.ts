import { Name } from '@app/shared/value-objects/name';
import { Notification } from '@app/shared/notification';

describe('Name Value Object', () => {
  let notification: Notification;

  beforeEach(() => {
    notification = new Notification();
  });

  describe('validate()', () => {
    it('should add notification for empty name', () => {
      new Name('', notification);
      expect(notification.getNotifications()).toContain(
        'Name should not be empty',
      );
    });

    it('should add notification for name with special characters', () => {
      new Name('John Doe!', notification);
      expect(notification.getNotifications()).toContain(
        'Name cannot contain special characters or numbers',
      );
    });

    it('should add notification for name with numbers', () => {
      new Name('John123 Doe', notification);
      expect(notification.getNotifications()).toContain(
        'Name cannot contain special characters or numbers',
      );
    });

    it('should add notification for name with only one part', () => {
      new Name('John', notification);
      expect(notification.getNotifications()).toContain(
        'Name must contain at least a first name and a last name',
      );
    });

    it('should add notification for first name with less than 3 characters', () => {
      new Name('Jo Doe', notification);
      expect(notification.getNotifications()).toContain(
        'First name must be at least 3 characters long',
      );
    });

    it('should not add notification for valid name', () => {
      const name = new Name('John Doe', notification);
      expect(notification.getNotifications()).toHaveLength(0);
      expect(name.value).toBe('John Doe');
    });
  });
});
