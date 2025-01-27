/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Get('all')
    getAllUsers(){
        return this.userService.findAll();
    }

    @Get(':id')
    getUser(@Param() param, @Req() req: Request, @Res() res: Response ){
        return this.userService.findOne(param.id, req, res);
    }

    @Post()
    create(@Body() user: User, @Req() request: Request, @Res() response: Response){
        // console.log(user);
        return this.userService.createUser(user, request, response);
        
    }

    @Put(':id')
    ban(@Param() param){
        return this.userService.banUser(param.id);
    }


}

