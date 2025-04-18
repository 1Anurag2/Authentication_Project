const { Router } = require("express");
const router = Router();
const Apps = require("../models/userSchema");

router.get("/", async (req, res) => {
 res.render("home");
});
router.get("/signup", async (req, res) => {
 res.render("sign_up");
});
router.get("/login", async (req, res) => {
 res.render("login");
});

router.post("/submitform", async (req, res) => {
  try {
    let apps = new Apps({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    apps = await apps.save();
   res.redirect("/login");
  } catch (error) {
   res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const apps = await Apps.findById(req.params.id);
   res.send(apps);
  } catch (error) {
   res.status(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const apps = await Apps.findByIdAndUpdate(
      req.params.id,
      {
        key: value,
      },
      { new: true }
    );
   res.send(apps);
  } catch (error) {
   res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const apps = await Apps.findByIdAndDelete(req.params.id);
   res.send(apps);
  } catch (error) {
   res.status(500).send(error.message);
  }
});

module.exports = router;
