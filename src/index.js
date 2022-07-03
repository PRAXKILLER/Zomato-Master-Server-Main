require('dotenv').config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';

// Database Connection
import ConnectDB from './database/connection'

// google auth config
import googleAuthConfig from './config/google.config';

// private route authentication config
import privateRouteConfig from './config/route.config'

// API
import Auth from './API/Auth'
import Restaurant from './API/Restaurants'
import Food from './API/Food'
import Menu from './API/Menu'
import Image from './API/Image'
import Orders from './API/Orders'
import Reviews from './API/Reviews'
import User from './API/User'

googleAuthConfig(passport);
privateRouteConfig(passport);

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(passport.initialize());

// Application Routes
app.use('/auth', Auth);
app.use('/restaurants', Restaurant);
app.use('/food', Food);
app.use('/menu', Menu);
app.use('/image', Image);
app.use('/order', Orders);
app.use('/review', Reviews);
app.use('/user', User);

app.listen(4000, () => {
    ConnectDB().then(() => {
        console.log("Server is running !!!")
    }).catch((error) => {
        console.log("Server is running but Database connection failed");
        console.log(error)
    })
})