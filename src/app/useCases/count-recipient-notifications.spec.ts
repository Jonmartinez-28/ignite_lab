import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository";
import { CountRecipientNotification } from "./count-recipient-notifications";

describe("Count Notification", () => {
  it("should be able to count recipient notifications", async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: "recipient1" }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: "recipient1" }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: "recipient2" }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: "recipient1",
    });

    expect(count).toEqual(2);
  });
});
