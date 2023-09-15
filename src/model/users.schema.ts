import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Users extends Document {
  @Prop()
  name: string;

  @Prop({ unique: false })
  email: string;

  @Prop()
  status: string;

  @Prop()
  gender: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
