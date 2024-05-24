import { Notification } from '@app/shared/notification';

describe('Notification', () => {
  let notification: Notification;

  beforeEach(() => {
    notification = new Notification();
  });

  it('should add a notification', () => {
    notification.addNotification('Test notification');
    expect(notification.getNotifications()).toContain('Test notification');
  });

  it('should return true if there are notifications', () => {
    notification.addNotification('Test notification');
    expect(notification.hasNotifications()).toBe(true);
  });

  it('should return false if there are no notifications', () => {
    expect(notification.hasNotifications()).toBe(false);
  });

  it('should return all notifications', () => {
    notification.addNotification('Test notification 1');
    notification.addNotification('Test notification 2');
    expect(notification.getNotifications()).toEqual([
      'Test notification 1',
      'Test notification 2',
    ]);
  });

  it('should clear all notifications', () => {
    notification.addNotification('Test notification');
    notification.clearNotifications();
    expect(notification.getNotifications()).toHaveLength(0);
  });
});
