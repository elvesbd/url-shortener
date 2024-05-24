import { Notification } from '@app/shared/notification';
import { Url } from '@app/shared/value-objects/url';

describe('Url', () => {
  let notification: Notification;

  beforeEach(() => {
    notification = new Notification();
  });

  it('should create a valid Url instance', () => {
    const validUrl = 'https://example.com';
    new Url(validUrl, notification);
    expect(notification.getNotifications()).toEqual([]);
  });

  it('should throw error if url is not a string', () => {
    const invalidUrl: any = 123;
    new Url(invalidUrl, notification);
    expect(notification.getNotifications()).toEqual(['URL should be a string']);
  });

  it('should throw error if url is empty', () => {
    const emptyUrl = '';
    new Url(emptyUrl, notification);
    expect(notification.getNotifications()).toEqual([
      'URL should not be empty',
    ]);
  });

  it('should throw error if url has invalid format', () => {
    const invalidFormatUrl = 'invalid-url';
    new Url(invalidFormatUrl, notification);
    expect(notification.getNotifications()).toEqual(['Invalid URL format']);
  });
});
