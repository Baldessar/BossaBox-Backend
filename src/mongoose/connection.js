/* eslint-disable no-console */
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/bossabox', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.on("error", () => { console.error("Database connection failure") })
connection.once("open", () => {
    console.log("Connection Sucessefull")
})
