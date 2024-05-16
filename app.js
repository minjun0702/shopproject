import express from "express";
import connect from "./src/schemas/index.js";
import productsRouter from "./src/routes/products.router.js";

const app = express();
const PORT = 3001;

connect();

app.use(express.json()); //json 형태로 서버에 body 데이터를 전달하면, req.body에 데이터를 변환하여 넣어준다.
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ message: "HI!" });
});

app.use("/api", [router, productsRouter]);

// //에러처리 미들웨어
// app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요");
});
