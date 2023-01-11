import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";

export interface CountRecipientNotificationRequest {
  recipientId: string;
}

interface CountRecipientNotificationResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    req: CountRecipientNotificationRequest,
  ): Promise<CountRecipientNotificationResponse> {
    const { recipientId } = req;

    const count = await this.notificationRepository.countManyByRecipientId(
      recipientId,
    );

    return { count };
  }
}
