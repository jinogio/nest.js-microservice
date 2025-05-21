import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, autoIndex: true, toJSON: { virtuals: true } })
export class Order extends Document {
  @Prop({ index: true })
  // @Expose({ groups: [Role.Admin], toPlainOnly: true })
  // @Exclude({ toPlainOnly: true })
  // _id: string;
  orderID: string;
  // @Expose({ groups: [Role.Admin], toPlainOnly: true })
  // @Exclude({ toPlainOnly: true })
  // _id: string;
  @Prop({ index: true, default: null })
  userID: string;

  @Prop({ default: null })
  name: string;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.plugin(softDeletePlugin);
