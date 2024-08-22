import mongoose, { Schema, Document } from 'mongoose';

interface CounterI extends Document {
  name: string;
  seq: number;
}

const counterSchema = new Schema<CounterI>({
  name: { type: String, required: true },
  seq: { type: Number, required: true },
});

export const counterModel = mongoose.model<CounterI>('Counter', counterSchema);