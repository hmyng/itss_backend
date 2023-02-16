import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly CommentRepository: Repository<Comment>,
  ) {}

  async createComment(comment: Comment, req: Request, res: Response) {
    this.CommentRepository.insert(comment);
    res.status(201).send(comment);
  }

  async verifyCommnent(id: number, res: Response) {
    const cmt = this.CommentRepository.update(id, {
      status: 1,
    });
    res.status(201).send(cmt);
  }
}
