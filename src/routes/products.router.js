import express from "express";
import Shop from "../schemas/product.schema.js";
// import joi from "joi";

const router = express.Router();

// 상품 생성 api //
router.post("/products", async (req, res, next) => {
  const { name, description, manager, password } = req.body;
  const namecheck = await Shop.findOne({ name: name });

  if (!name || !description || !manager || !password) {
    return res
      .status(400)
      .json({ errorMessge: "상품 정보를 모두 입력해주세요." });
  }

  if (namecheck) {
    return res
      .status(400)
      .json({ errorMessge: "이미 등록 된 상품입니다." });
  }

  const shop = new Shop({
    name,
    description,
    manager,
    password,
  });

  await shop.save();
  return res.status(201).json({
    status: 201,
    message: "상품 생성에 성공했습니다.",
    shop: {
      _id: shop._id,
      name: shop.name,
      description: shop.description,
      manager: shop.manager,
      status: shop.status,
      createdAt: shop.createdAt,
      updatedAt: shop.updatedAt,
    },
  });
});

//상품 조회 api
router.get("/products", async (req, res, next) => {
  const ShopAll = await Shop.find().exec(); //Shop 객체의 전체
  const products = []; // 새 배열
  for (const product of ShopAll) {
    // product에 ShopAll을 반복
    const productobj = {
      _id: product._id,
      name: product.name,
      description: product.description,
      manager: product.manager,
      status: product.status,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
    products.push(productobj);
  }

  return res.status(200).json({
    status: 200,
    message: "상품 목록 조회에 성공했습니다.",
    data: products,
  });
});

//상품 상세 조회 api
router.get("/products/:_id", async (req, res, next) => {
  const { _id } = req.params;
  const idCheck = await Shop.findById(_id).exec();
  if (!_id) {
    return res
      .status(404)
      .json({ errorMessge: "존재하지 않습니다." });
  }
  return res.status(200).json({
    status: 200,
    message: "상품 상세 조회에 성공했습니다.",
    data: {
      _id: idCheck._id,
      name: idCheck.name,
      description: idCheck.description,
      manager: idCheck.manager,
      status: idCheck.status,
      createdAt: idCheck.createdAt,
      updatedAt: idCheck.updatedAt,
    },
  });
});

//상품 수정 api
router.put("/products/:_id", async (req, res, next) => {
  const { _id } = req.params;
  const { name, description, manager, status, password } = req.body;

  const idCheck = await Shop.findById(_id).exec();

  if (!_id) {
    return res
      .status(404)
      .json({ errorMessge: "존재하지 않습니다." });
  }

  if (idCheck.password === password) {
    idCheck.name = name;
    idCheck.description = description;
    idCheck.manager = manager;
    idCheck.status = status;
    idCheck.updatedAt = new Date();
    await idCheck.save();

    return res.status(200).json({
      status: 200,
      message: "상품 수정에 성공했습니다.",
      data: {
        _id: idCheck._id,
        name,
        description,
        manager,
        status,
        createdAt: idCheck.createdAt,
        updatedAt: idCheck.updatedAt,
      },
    });
  } else {
    return res
      .status(404)
      .json({ errorMessge: "비밀번호가 일치하지 않습니다." });
  }
});

//상품 삭제 api
router.delete("/products/:_id", async (req, res, next) => {
  const { _id } = req.params;
  const idCheck = await Shop.findById(_id).exec();
  if (!idCheck) {
    return res
      .status(404)
      .json({ errorMessage: "존재하지 않는 id입니다." });
  }

  await Shop.deleteOne({ _id: _id });
  return res.status(200).json({
    status: 200,
    message: "상품 삭제에 성공했습니다.",
    data: {
      id: _id,
    },
  });
});

export default router;
