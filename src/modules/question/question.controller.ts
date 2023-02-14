/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { Param, Put } from '@nestjs/common/decorators';
import { Request, Response } from 'express';
import { title } from 'process';
import { Question } from './question.entity';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
    constructor(private questionService: QuestionService) {}
    @Post()
    create(@Body() question: Question, @Req() req: Request, @Res() res: Response){
        return this.questionService.createQuestion(question, req, res);
        
    }

    @Put('/:id')
    update(@Param() param, @Body() question: Question, @Req() req: Request, @Res() res: Response){
        return this.questionService.updateQuestion(parseInt(param.id), question, req, res);
    }

    @Get('/all')
    getAllQuestion(@Param('title') title: string){
        return this.questionService.findAllNum(title);
    }

    @Get('')
    getQuestions(@Query() queryList, @Req() req: Request, @Res() res: Response ){
        return this.questionService.findperPage(queryList.page_num, queryList.max_items_per_page, res, queryList.sortBy, queryList.filter);
    }

    @Get('/:id')
    getComments(@Param() param, @Req() req: Request, @Res() res: Response ){
        return this.questionService.getAllComments(parseInt(param.id), req, res);
    }

}
