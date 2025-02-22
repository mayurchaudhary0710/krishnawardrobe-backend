import { Injectable } from "@nestjs/common";
import { FileService } from "src/controllers/v1/file/file.service";

@Injectable()
export class CommonService {
  constructor(private fileService: FileService) {}
}
