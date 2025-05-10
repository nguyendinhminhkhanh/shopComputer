require('dotenv').config();
const express = require('express')
// const session = require('express-session')
// const {protect} = require('./app/middleware/authMiddleware');
const path = require('path')
const db = require('./config/db');
const router = require('./routers');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');// upload file

const { create } = require('express-handlebars');


const app = express()
app.use(fileUpload({//Dùng để upload file
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));
db.connect();

app.use(cors({
  origin: 'http://localhost:3000', // Đổi thành URL frontend của bạn
  credentials: true, // Cho phép gửi cookie
}));

app.use(express.json()); // Hỗ trợ JSON request
app.use(methodOverride('_method')); //Middleware Xử Lý _method=DELETE(UPDATE) khi dùng form

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Xử lý cookie
const morgan = require('morgan')
const port = 3000


 
app.use(morgan('combined'))
// app.use(protect);


const hbs = create({
  defaultLayout: 'main',
  extname: '.hbs',
  // Tạo helper 'eq' cho Handlebars
  helpers: {
    sum: (a, b) => a + b,
    eq: (a, b) => a === b,
    or: (a, b) => a || b
  }
});


app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));




router(app);
// app.get('/', (req, res) => {
//   res.render('home');
// });

app.listen(port, () => {
  // console.log("🔗 MONGO_URI:", process.env.MONGO_URI);
  // console.log("🌐 PORT:", process.env.PORT);
  console.log(`Example app listening on port ${port}`)
})


//chưa chuyền được thông tin đăng nhập vào handlebars 