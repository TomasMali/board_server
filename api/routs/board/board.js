

const Board = require('./boardModel')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


// First route, get all visiting
/**Da chiamare
 * http://localhost:3000/visiting/
 * 
 */
// First route, get all Menu
router.get('/', (req, res, next) => {
    
    Board.find()
        .sort({ color: 1 })
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


// 
/**
 * http://localhost:3000/board/getBoard/33453
 */
router.get('/getBoard/:wi', (req, res, next) => {
    const wi_ = req.params.wi;
    console.log("il valore è: " + wi_)
    Board.find({ wi: wi_ })
        .exec().
        then(doc => {
            if (doc.length) {
                res.status(200)
                    .json({ message: doc });
            }
            else
                res.status(200)
                    .json({ message: "Nessun risultato trovao" });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
})


/**
 *  POST REQUEST Inserisce un menu solo se non esiste. 
 * // Da chimare  
{
	"piva": "MLATMS92P09Z100C",
	"docname" : "tomas.C20"
}

 */
router.post('/insert', (req, res, next) => {
    const wi_ = req.body.wi;
    const storyPoint_ = req.body.storyPoint;
    const sprint_ = req.body.sprint;
    const description_ = req.body.description;
    const state_ = req.body.state;
    const color_ = req.body.color;

    // console.log(req.body)


    Board.find({ wi: wi_, sprint : sprint_ }, function (err, docs) {

        console.log("dentro 44454545:   " + sprint_)

        if (docs.length) {



            // se non modifico il colore, modifico lo stato
            if (color_ == null) {
                console.log("valore_colore:: " + color_)
                console.log("valore_state:: " + state_)

                Board.updateOne(
                    { wi: wi_ , sprint: sprint_},
                    { $set: { "state": state_ } }
                ).exec()
                    .then(result => {
                        if (result.nModified != 0)
                            res.status(200)
                                .json({ message: true });
                        else
                            res.status(200)
                                .json({ message: false });

                    })
            } else if (state_ == null) {
                console.log("valore_colore22222:: " + color_)
                console.log("valore_state2222:: " + state_)

                Board.updateOne(
                    { wi: wi_ , sprint: sprint_},
                    { $set: { "color": color_ } }
                ).exec()
                    .then(result => {
                        if (result.nModified != 0)
                            res.status(200)
                                .json({ message: true });
                        else
                            res.status(200)
                                .json({ message: false });

                    })
            }
            // sto inserendo uno che esiste già
            else {
                console.log("dentro esiste gia")
                res.status(200)
                    .json({ message: false });
            }



        } else {
            // Lo creo nuovo
            const workItem = new Board({
                _id: new mongoose.Types.ObjectId(),
                wi: wi_,
                storyPoint: storyPoint_,
                sprint: sprint_,
                description: description_,
                state: state_,
                color: color_
            });

            console.log("Nuovo : " + workItem)


            workItem.save()
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




// DELETE  the single user 
router.delete('/delete_one', (req, res, next) => {
    const wi_ = req.body.wi;
const sprint_ = req.body.sprint
    Board.remove({ wi: wi_, sprint: sprint_})
        .exec()
        .then(result => {
            res.status(200).json({
                message: " rimosso correttamente!"
            })
        })
        .catch(err => {
            // console.log(err)
            res.status(500).json({
                error: err
            })
        })
});


/*

// DELETE ALL the user 
router.delete('/delete_all', (req, res, next) => {
    Board.deleteMany({})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            // console.log(err)
            res.status(500).json({
                error: err
            })
        })
});



*/
























module.exports = router;