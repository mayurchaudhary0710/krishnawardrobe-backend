import { ICurrentUser, MathmakingQueryParamsDTO } from "@dtos";
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { handleError } from "@utils";
import { UsersService } from "./users.service";
import { CurrentUser } from "@decorators";
import { Messages } from "@constants";
import { AuthGuard } from "@guards";
import { Response } from "express";

@Controller("users")
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) { }

}
