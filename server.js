
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = require('./config/keys').mongoURI;
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

app.use('/posts', postsRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, './client/build')));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "./client/build/index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});