
// const express = require("express");
// const router = express.Router();
// const BrandController = require("../controllers/brandController");

// router.get("/get-brands", BrandController.getBrands);
// router.get("/get-brand/:id", BrandController.getBrand); 
// router.post("/add-brand", BrandController.addBrand);
// router.put("/update-brand/:id", BrandController.updateBrand);
// router.delete("/delete-brand/:id", BrandController.deleteBrand);

// module.exports = router;



const express = require("express");
const { addBrandController, getBrandsController, getBrandByIdController, updateBrandController, deleteBrandController } = require("../controllers/brandController");

const router = express.Router();

router.post("/add-brand", addBrandController);
router.get("/get-brands", getBrandsController);
router.get("/get-brand/:id", getBrandByIdController);
router.put("/update-brand/:id", updateBrandController);
router.delete("/delete-brand/:id", deleteBrandController);

module.exports = router;


