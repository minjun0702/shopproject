//mongoose 연결 파일
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      dbName: process.env.MONGODB_NAME,
    })
    .then(() => console.log("서버 연결에 성공하였습니다."))
    .catch((err) => console.log(`서버 연결에 실패하였습니다. ${err}`));
};

mongoose.connection.on("error", (err) => {
  console.error("서버 연결 에러", err);
});

export default connect;
