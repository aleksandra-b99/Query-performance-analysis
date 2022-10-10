db.getCollection('restaurant_menus').aggregate([
    {
        $match:{"price":{$ne:0.0}}
    },
    {
        $group:{"_id":{"restaurant_id":"$restaurant_id"},"num_of_item":{$sum:1}, "total_price":{$sum:"$price"},"categories":{$addToSet:"$category"},
        "restaurant_details":{$addToSet:"$restaurant_id"}
        }
    },
    {
        $project:{"categories":1,"num_of_item":1,"restaurant_details":1,"total_price":1,"average_price_USD":{$divide:["$total_price","$num_of_item"]}}
    },
    {
     $lookup:
       {
         from: "restaurants",
         localField: "restaurant_details",
         foreignField: "restaurant_id",
         as: "restaurant_details"
       }
    },
    {
        $project:{"categories":1,"num_of_item":1,
            "restaurant_details.name":1,"restaurant_details.score":1,"restaurant_details.ratings":1,"restaurant_details.price_range":1,
            "total_price":1,"average_price_USD":1}
    },
    {
        $sort:{"num_of_item":1}
    },
    {
        $limit: 15
    },
    ])