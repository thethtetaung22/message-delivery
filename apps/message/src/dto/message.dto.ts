import { IsNotEmpty, IsString } from "class-validator";

export class CreateMesssgeRequest {
    @IsString()
    @IsNotEmpty()
    message: string;
}