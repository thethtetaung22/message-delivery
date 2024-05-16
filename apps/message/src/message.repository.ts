import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "@app/common";
import { Message } from "./schemas/message.schema";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";

@Injectable()
export class MessageRepository extends AbstractRepository<Message> {
    protected readonly logger: Logger;

    constructor(
        @InjectModel(Message.name) messageModel: Model<Message>,
        @InjectConnection() connection: Connection
    ) {
        super(messageModel, connection)
    }
}