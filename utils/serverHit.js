let hit = 0;
const hitLog = (req,res,next) =>  {
    hit += 1;
    console.log(`TimesHit: ${hit}`);
    next();
}


module.exports = {hitLog};