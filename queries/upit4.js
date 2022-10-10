db.restaurants.aggregate([
    {
        $match: {"price_range":{$ne:NaN},"ratings":{$ne:NaN}}
    },
    {
        $group: {_id: {price_range: "$price_range", 
                        zip_code: "$zip_code"},
                        total_ratings: {$sum: "$ratings"}}
    },
    {
        $group: {_id: "$_id.price_range",
                 max_ratings: {$max: "$total_ratings"}}
    },
    {
        $sort: {"max_ratings": -1}
    },
    {
        $project: {_id: 0, price_range: "$_id", max_ratings: 1}
    }
])//najveci broj galsova iz opstine po broju zvezdica