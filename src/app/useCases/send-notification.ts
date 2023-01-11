import { Injectable } from "@nestjs/common";
import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
  canceledAt?: Date;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    req: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, content, category, canceledAt } = req;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
      canceledAt,
    });

    await this.notificationRepository.create(notification);

    return {
      notification,
    };
  }
}
