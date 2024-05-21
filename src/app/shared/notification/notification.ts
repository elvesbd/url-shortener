export class Notification {
  private notifications: string[] = [];

  addNotification(message: string): void {
    this.notifications.push(message);
  }

  hasNotifications(): boolean {
    return this.notifications.length > 0;
  }

  getNotifications(): string[] {
    return this.notifications;
  }

  clearNotifications(): void {
    this.notifications = [];
  }
}
