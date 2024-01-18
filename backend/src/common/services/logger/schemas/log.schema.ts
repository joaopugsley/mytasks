import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Log extends Document {
  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  taskId: number;

  @Prop({ required: true })
  action: 'created' | 'updated' | 'deleted';

  @Prop({ required: false })
  message: string;

  @Prop({
    required: false,
    type: {
      title: String,
      description: String,
      status: String,
    },
  })
  updatedFields?: {
    title?: string;
    description?: string;
    status?: string;
  };
}

export const LogSchema = SchemaFactory.createForClass(Log);
