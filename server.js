const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));



/*
mongoose.set('debug', true);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-api', {
        // useFindAndModify: false,
         useNewUrlParser: true,
         useUnifiedTopology: true
});

console.log(mongoose.connection)
*/
     
     // Use this to log mongo queries being executed!
   // app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
   const start = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-api', {
        // useFindAndModify: false,
         useNewUrlParser: true,
         useUnifiedTopology: true
        });
      app.listen(3000, () => console.log("Server started on port 3000"));
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  start();