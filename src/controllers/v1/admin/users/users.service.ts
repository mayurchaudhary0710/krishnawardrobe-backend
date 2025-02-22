import { HttpStatus, Injectable } from "@nestjs/common";
import {
  User,
} from "@models";
@Injectable()
export class UsersService {
  constructor() { }


  async profileDetail(userId: string) {
    const profileDetail = await User.findOne({
      where: { id: userId },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "userId",
        "age",
        "gender",
        "profilePicture",
      ],
    });
    return profileDetail;
  }
}
