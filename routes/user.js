const router = require('express').Router();
const Zuriuser = require('../models/user');

//POST API
router.post('/zuri_users', async (req, res) => {
  try {
    let zuri_users = new Zuriuser();
    zuri_users.name = req.body.name;
    zuri_users.email = req.body.email;
    zuri_users.country = req.body.country;

    await zuri_users.save();

    res.json({
      status: true,
      message: 'User Saved...',
    });
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});
// GET API
router.get('/zuri_users', async (req, res) => {
  try {
    let zuri_users = await Zuriuser.find();

    res.json({
      status: true,
      zuri_users: zuri_users,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

router.get('/zuri_users/:id', async (req, res) => {
  try {
    let zuri_users = await Zuriuser.findOne({ _id: req.params.id });

    res.json({
      status: true,
      zuri_users: zuri_users,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

// Update
router.put('/zuri_users/:id', async (req, res) => {
  try {
    let zuri_users = await Zuriuser.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { upsert: true },
    );

    res.json({
      status: true,
      message: 'User Updated...',
      updatedProduct: zuri_users,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

//DELETE
router.delete('/zuri_users/:id', async (req, res) => {
  try {
    let zuri_users = await Zuriuser.findOneAndDelete({ _id: req.params.id });

    res.json({
      status: true,
      deletedProduct: zuri_users,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

module.exports = router;
