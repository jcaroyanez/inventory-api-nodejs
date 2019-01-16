const expresss = require('express');
const morgan = require('morgan');
const app = expresss();

const { moongose } = require('./database');
//seting
const port = process.env.PORT || 3000;

//middlewares
app.use(morgan('dev'));
app.use(expresss.json())

//routes
const userRouter = require('./routes/user.routes');
const categoryRouter = require('./routes/category.routes');
const productRouter = require('./routes/product.routes')
app.use('/api',[userRouter,categoryRouter,productRouter])

app.listen(port , () => {
    console.log('server run on port 3000')
})