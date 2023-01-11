import { Notification } from "@app/entities/notification";
import { NotificationsRepository } from "@app/repositories/notifications-repository";

export class InMemoryNotificationRepository implements NotificationsRepository {
  public notifactions: Notification[] = [];

  async findById(notificationId: string): Promise<Notification | null> {
    const notifaction = this.notifactions.find(
      (item) => item.id === notificationId,
    );

    if (!notifaction) {
      return null;
    }

    return notifaction;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifactions.filter(
      (notification) => notification.recipientId === recipientId,
    );
  }

  async countManyByRecipientId(recipientId: string) {
    return this.notifactions.filter(
      (notification) => notification.recipientId === recipientId,
    ).length;
  }

  async create(notification: Notification) {
    this.notifactions.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifactions.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifactions[notificationIndex] = notification;
    }
  }
}
