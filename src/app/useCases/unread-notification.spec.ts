import { Notification } from "@app/entities/notification";
import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";
import { UnreadNotification } from "./unread-notification";

describe("Read Notification", () => {
  it("should be able to unread notification", async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = new Notification(
      makeNotification({
        readAt: new Date(),
      }),
    );

    await notificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifactions[0].readAt).toBeNull();
  });

  it("should not be able to unread a non existing notification", async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: "fake notification id",
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
