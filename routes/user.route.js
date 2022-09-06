const express = require('express');
const { randomUser, allUser, saveUser, updateUser, deleteUser } = require('../controllers/user.controller');
const userRouter = express.Router();
const { limiter } = require('../middleware/limiter');

userRouter.get('/random', limiter, randomUser);
userRouter.get('/all', limiter, allUser);
userRouter.post('/save', limiter, saveUser);
userRouter.patch('/update', updateUser);
userRouter.delete('/delete', deleteUser);

module.exports = userRouter;

