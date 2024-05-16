import mongoose from "mongoose";

// 상품 등록 Shcema
const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // 상품명
  },
  description: {
    type: String,
    required: true, // 상품설명
  },
  manager: {
    type: String,
    required: true, // 담당자
  },
  password: {
    type: String,
    required: true, // 비밀번호
  },
  status: {
    type: String,
    enum: ["FOR_SALE", "SOLD_OUT"],
    default: "FOR_SALE",
  },
  createdAt: {
    type: Date,
    default: Date.now, // 현재 시간으로 설정
  },
  updatedAt: {
    type: Date,
    default: Date.now, // 현재 시간으로 설정
  },
});

export default mongoose.model("Shop", ShopSchema);
