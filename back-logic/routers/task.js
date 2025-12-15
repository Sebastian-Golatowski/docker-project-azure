import express from "express";
import * as taskController from "../controllers/taskController.js";

const router = express.Router()

router.get('/', taskController.getTasks);

router.post('/', taskController.creTasks);

router.delete('/:id', taskController.delTasks);

router.put('/:id', taskController.toggleRem)

export default router;