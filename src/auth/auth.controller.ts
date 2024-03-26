import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {JwtService} from "@Nestjs/jwt";
import { User } from "src/user/entities/user.entity";

@Controller('auth')
export class AuthController {
    constructor(private jwtService: JwtService) {}
    @Post('/login')
    @UseGuards(AuthGuard("local"))
    login(@Req() req){
        const user: User = req.user;
        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };
        return { token: this.jwtService.sign(payload)};
    }
}
