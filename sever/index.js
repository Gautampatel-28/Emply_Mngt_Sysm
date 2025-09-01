import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import authRouter from "./routes/auth.js"
import connectToDatabase from "./db/db.js"
import departmentRouter from "./routes/department.js"
import employeeRouter from "./routes/employee.js"
import salaryRouter from "./routes/salary.js"

const app = express()
connectToDatabase()
dotenv.config();
app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("/uploads"));
app.use("/api/auth", authRouter)
app.use("/api/department", departmentRouter)
app.use("/api/employee", employeeRouter)
app.use("/api/salary", salaryRouter)

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})