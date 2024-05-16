import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";

@Schema({ versionKey: false })
export class Message extends AbstractDocument {
    @Prop()
    message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message); 