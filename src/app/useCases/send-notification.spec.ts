import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository";
import { SendNotification } from "./send-notification";

describe("Send Notification", () => {
  it("should be able to send notification", async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      content: "This is a notification",
      category: "Social",
      recipientId: "recipient-id",
      canceledAt: new Date(),
    });

    expect(notificationsRepository.notifactions).toHaveLength(1);
    expect(notificationsRepository.notifactions[0]).toEqual(notification);
  });
});
