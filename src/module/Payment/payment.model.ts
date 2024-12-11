import { model, Schema } from 'mongoose';
import { PaymentModal, TPayment } from './payment.interface';
import { string } from 'zod';

const TPaymentSchema = new Schema<TPayment, PaymentModal>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Subscription Model Id is Required'],
      ref: 'users',
    },
    name: { type: String, required: [true, 'name is required'] },
    email: { type: String, required: [true, 'email is required'] },
    address: { type: String, required: [true, 'address is required'] },
    amount:{type:Number,required:[true,'amount is required']},
    contractNumber: {
      type: String,
      required: [true, 'contract number is required'],
    },
    transactionId: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// midlewere
TPaymentSchema.pre('find', function (next) {
  this.find({ isDelete: { $ne: true } });
  next();
});
TPaymentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
  next();
});
TPaymentSchema.pre('findOne', function (next) {
  this.find({ isDelete: { $ne: true } });

  next();
});

TPaymentSchema.statics.isCompanyApplyExist = async function (id: string) {
  return await payments.findById(id);
};



export const payments = model<TPayment, PaymentModal>(
  'payments',
  TPaymentSchema,
);
