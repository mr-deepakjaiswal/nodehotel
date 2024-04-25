const express = require("express");
const router = express.Router();
const menuList = require("./../modules/MenuList");

//menu post method
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuList = new menuList(data);
    const response = await newMenuList.save();
    console.log("menuList data saved successfuly");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

//menu list get method
router.get("/", async (req, res) => {
  try {
    const response = await menuList.find();
    console.log("data fetched");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

//menulist taste  get method
router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (tasteType == "sour" || tasteType == "sweet" || tasteType == "spicy") {
      const response = await menuList.find({ taste: tasteType });
      console.log("data fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "invalid taste type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

// menulist update
router.put("/:id", async (req, res) => {
  try {
    const menuListId = req.params.id;
    const updateMenuList = req.body;
    const response = await menuList.findByIdAndUpdate(
      menuListId,
      updateMenuList,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Item not found" });
    }
    console.log("Data updated");
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete the menu list data
router.delete("/:id", async (req, res) => {
  try {
    const menuListID = req.params.id;
    const response = await menuList.findByIdAndDelete(menuListID);
    if (!response) {
      return res.status(404).json({ error: "Item not found" });
    }
    console.log("Data deleted");
    res.status(200).json({ message: "item deleted successfuly" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
