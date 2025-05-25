import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js'
import attendanceRouter from './routes/attendance.js'
import settingRouter from './routes/setting.js'
import dashboardRouter from './routes/dashboard.js'
import connectToDatabase from './db/db.js'

connectToDatabase()
const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://ems-frontend-liard-psi.vercel.app",
  credentials: true
}));
app.use(express.static('public/uploads'))
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary' , salaryRouter);
app.use('/api/leave' , leaveRouter);
app.use('/api/attendance' , attendanceRouter);
app.use('/api/setting' , settingRouter);
app.use('/api/dashboard' , dashboardRouter);



app.get("/", (req, res) => {
    res.send("Welcome to the Employee Management System!");
  });



app.listen(process.env.PORT, () => {
    console.log(` Server running on port ${process.env.PORT}`)
});



