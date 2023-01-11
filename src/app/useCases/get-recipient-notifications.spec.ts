import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notifications-repository";
import { GetRecipientNotification } from "./get-recipient-notifications";

describe("Get Notification", () => {
  it("should be able to get recipient notifications", async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const getRecipientNotification = new GetRecipientNotification(
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

    const { notifications } = await getRecipientNotification.execute({
      recipientId: "recipient1",
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: "recipient1" }),
        expect.objectContaining({ recipientId: "recipient1" }),
      ]),
    );
  });
});
