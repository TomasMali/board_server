

const PushNotification = require('./pushnotificationModel')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')





// First route, get all token
/**Da chiamare
 * http://localhost:3008/pushnotification/
 * 
 */
// First route, get all Menu
router.get('/', (req, res, next) => {
    
    PushNotification.find()
        .exec().
        then(doc => {
           
            if (doc.length) {
                   console.log(doc)
                res.status(200).json({
                    message: doc
                })
            }
            else
                res.status(200).json({
                    message: false
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'err:: ' + err })
        })
})



/**
 *  POST REQUEST Inserisce un token per push notification. 
 * // Da chimare  
{
	"token": "MLATMS92P09Z100C"
}

 */
router.post('/insert', (req, res, next) => {
    const token_ = req.body.token;

    PushNotification.find({ token: token_ }, function (err, docs) {

        if (docs.length) {
            // sto inserendo uno che esiste già
            console.log("dentro esiste gia")
            res.status(200)
                .json({ message: false });
        }
        else {
            // Lo creo nuovo
            const tokenObj = new PushNotification({
                _id: new mongoose.Types.ObjectId(),
                token: token_
            });

            console.log("Nuovo, sto inserendo : " + tokenObj)

            tokenObj.save()
                .then(result => {
                    console.log(result)

                    if (result._id)
                        res.status(200)
                            .json({ message: true });
                    else
                        res.status(200)
                            .json({ message: false });
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ error: err })
                });

        }
    });

})




module.exports = router;