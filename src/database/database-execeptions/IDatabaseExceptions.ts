import { ForbiddenException } from "@nestjs/common"
import { throws } from "node:assert/strict";


export interface IDatabaseExeptions {
    checkError(error) :void;
}