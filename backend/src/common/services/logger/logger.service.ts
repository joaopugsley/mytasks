import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from './schemas/log.schema';

@Injectable()
export class LoggerService {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

  async log(
    userId: number,
    taskId: number,
    action: 'created' | 'updated' | 'deleted',
    message?: string,
    updatedFields?: {
      title?: string;
      description?: string;
      status?: string;
    },
  ) {
    // create a new log document using the logModel
    const logEntry = new this.logModel({
      userId,
      taskId,
      action,
      message,
      updatedFields,
    });
    // save the new log to the database
    try {
      await logEntry.save();
    } catch (error) {
      console.error('Error saving log:', error);
    }
  }
}
