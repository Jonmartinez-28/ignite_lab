import { CancelNotification } from "@app/useCases/cancel-notification";
import { CountRecipientNotification } from "@app/useCases/count-recipient-notifications";
import { GetRecipientNotification } from "@app/useCases/get-recipient-notifications";
import { ReadNotification } from "@app/useCases/read-notification";
import { UnreadNotification } from "@app/useCases/unread-notification";
import { Module } from "@nestjs/common";
import { SendNotification } from "../../app/useCases/send-notification";
import { DatabaseModule } from "../database/database.module";
import { NotificationsController } from "./controllers/notifications.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotification,
    GetRecipientNotification,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
