/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { ILike, Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly QuestionRepository: Repository<Question>,
  ) {}

  // findAll(): Observable<Question[]>{
  //     return from(this.QuestionRepository.find());
  // }
  async findAllNum(title: string) {
    const All = await this.QuestionRepository.find({
      relations: {
        author: true,
        comments: true,
        likes: true
      },
      where: {
        title: title
      }
    });
    if (All !== null) return All.length;
  }

  async findperPage(page_num: number, num_per_page: number, res: Response, sort, filter) {
    // const sortBy = JSON.parse(sort);
    const pagination = await this.QuestionRepository.find({
      where: {
          // title: ILike('%'+ filter.title + '%'),
      },
      order:{
        // createdAt: sortBy.createdAt,
        // cần fix
        // likes: sortBy.likes, 
      },
      relations: {
        author: true,
        comments: true,
        likes: true
      }
    });
    if (pagination !== null) {
      if (page_num * num_per_page > pagination.length) {
        const List = pagination.slice(
          (page_num - 1) * num_per_page,
          pagination.length,
        );
        res.status(200).send(List);
      } else {
        const List = pagination.slice(
          (page_num - 1) * num_per_page,
          page_num * num_per_page,
        );
        res.status(200).send(List);
      }
    } else res.status(400);
  }
  // findOneById(id: number, req: Request, res: Response): Promise<User> {
  // async findOne(subject_code: string, req: Request, res: Response) {
  //     const find = await this.QuestionRepository.findOne({
  //         where:{
  //             subject_code: subject_code,
  //         }
  //     });
  //     if(find != null){
  //         res.status(200).send(find);
  //     }
  //     else res.status(400).send("Môn học không tồn tại");
  // }
  async createQuestion(question: Question, req: Request, res: Response) {
    this.QuestionRepository.insert(question);
    res.status(201).send(question);
  }

  async updateQuestion(id: number, question: Question, req: Request, res: Response) {
    this.QuestionRepository.update(id, question);
    res.status(201).send(question);
  }

  async verifyQuestion(id: number, author_id: number, user_id: number, res: Response) {
    if(author_id === user_id) {
      const question = this.QuestionRepository.update(id, {
        rating: 1
      });
      res.status(201).send(question);
    }else {
      res.status(403).send('not authorized')
    }
    }

  async reportQuestion(id: number, res: Response) {
    const question = this.QuestionRepository.update(id, {
      RatingNum: 3
    })
  }
  async getAllComments(id: number, req: Request, res: Response) {
    const find = await this.QuestionRepository.find({
        where:{
            id: id,
        },
        relations:{
          author: true,
          comments:{
            user: true
          }
        }
    });
    if(find != null){
        res.status(200).send(find[0].comments);
    }
    else res.status(400).send("Review không tồn tại");
}
}
