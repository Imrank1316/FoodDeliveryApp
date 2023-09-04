const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://imrank39:J8cVGjrqFbLe9yj6@cluster0.r5oglvb.mongodb.net/gofoodmern?retryWrites=true&w=majority'

const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, res) => {
        if (err) console.log(err)

        else {
            console.log('connected');

            const fetch_data = await mongoose.connection.db.collection('food_item')

            fetch_data.find({}).toArray(async function (err, data) {
                const catData = await mongoose.connection.db.collection('foodCategory')
                catData.find({}).toArray(function (err, food_Catdata) {
                    if (err) console.log(err)
                    else {
                        global.food_item = data
                        global.foodCategory = food_Catdata

                    }
                })


                // if (err) console.log(err);
                // else {
                //     global.food_item = data
                //     // console.log(global.food_item)

                // }

            })
        }


    });






}

module.exports = mongoDB;