const express = require('express');
const app = express();
const port = 3000;
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


// middlwares
let hit = 0;
const hitLog = (req,res,next) =>  {
    hit += 1;
    console.log(`TimesHit: ${hit}`);
    next();
}
app.use(hitLog);




// Routings
app.use('', userRoutes);
app.use('/auth', authRoutes);



app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})