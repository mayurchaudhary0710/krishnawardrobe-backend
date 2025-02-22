import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { FileService } from "../../file/file.service";
@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, FileService],
})
export class UsersModule { }
