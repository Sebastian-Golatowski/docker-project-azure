import { PrismaClient } from '@prisma/client'
import jwt from "jsonwebtoken";

const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET

const getUserId = (authHeader) => {
    if (!authHeader) {
        return { error: "No token provided", status: 401 }
    }

    const parts = authHeader.split(' ')
    const token = parts.length === 2 ? parts[1] : authHeader

    if (!token) {
        return { error: "Invalid token format", status: 401 }
    }

    if (!JWT_SECRET) {
        console.error("JWT_SECRET is not set")
        return { error: "Server configuration error", status: 500 }
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        if (!decoded || !decoded.id) {
            return { error: "Invalid token payload", status: 401 }
        }

        return { userId: decoded.id, error: null, status: 200 }
    } catch (err) {
        console.error("JWT verification error:", err)
        return { error: "Invalid or expired token", status: 401 }
    }
}

const get = async (userId) => {
    const tasks = await prisma.task.findMany({
        where: {
            userId: Number(userId)
        }
    })
    return tasks
}

export const getTasks = async (req, res) => {
    const { userId, error, status } = getUserId(req.headers['authorization'])
    if (error) {
        return res.status(status).send({ message: error })
    }

    try {
        const tasks = await get(userId)
        res.status(200).send(tasks)
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: "Error fetching tasks" })
    }
}

export const creTasks = async (req, res) => {
    const { userId, error, status } = getUserId(req.headers['authorization'])
    if (error) {
        return res.status(status).send({ message: error })
    }

    try {
        let { text, day, reminder } = req.body

        if (!text || !day) {
            return res.status(400).send({ message: "Text and Day are required" })
        }

        await prisma.task.create({
            data: {
                text: String(text),
                userId: Number(userId),
                day: String(day),
                reminder: Boolean(reminder)
            }
        })

        const tasks = await get(userId)
        res.status(201).send(tasks)
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: "Error creating task" })
    }
}

export const delTasks = async (req, res) => {
    const { userId, error, status } = getUserId(req.headers['authorization'])
    if (error) {
        return res.status(status).send({ message: error })
    }

    try {
        const { id } = req.params

        const del = await prisma.task.deleteMany({
            where: {
                id: Number(id),
                userId: Number(userId)
            }
        })

        if (del.count === 0) {
            return res.status(404).send({ message: "Task not found or unauthorized" })
        }

        res.status(200).send({ message: "Deleted" })
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: "Server Error" })
    }
}

export const toggleRem = async (req, res) => {
    const { userId, error, status } = getUserId(req.headers['authorization'])
    if (error) {
        return res.status(status).send({ message: error })
    }

    try {
        const { id } = req.params

        const task = await prisma.task.findFirst({
            where: {
                id: Number(id),
                userId: Number(userId)
            },
        })

        if (!task) {
            return res.status(404).send({ message: "Task not found or unauthorized" })
        }

        const updatedTask = await prisma.task.update({
            where: {
                id: Number(id) 
            },
            data: {
                reminder: !task.reminder
            },
        })

        res.status(200).send(updatedTask)
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: "Server Error" })
    }
}