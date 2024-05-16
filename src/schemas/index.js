//mongoose 연결 파일
import mongoose from "mongoose";

const connect = () => {
  mongoose
    .connect(
      "mongodb+srv://sprata-user:aaaa4321@express-mongo.rvbxgup.mongodb.net/?retryWrites=true&w=majority&appName=express-mongo",
      process.env.MONGODB_URL,
      {
        dbName: process.env.MONGODB_NAME,
      },
    )
    .then(() => console.log("서버 연결에 성공하였습니다."))
    .catch((err) => console.log(`서버 연결에 실패하였습니다. ${err}`));
};

mongoose.connection.on("error", (err) => {
  console.error("서버 연결 에러", err);
});

export default connect;
