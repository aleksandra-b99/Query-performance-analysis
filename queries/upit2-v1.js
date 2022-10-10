db.getCollection('restaurant_menus').aggregate([
    {
        $match:{"price":{$ne:NaN}}
    },
    {
        $group:{"_id":{"category":"$category"},
                "num_of_item":{$sum:1},
                "total_price":{$sum:"$price"},
                "restaurants":{$addToSet:"$restaurant_id"}}
    },
    {
        $project:{"restaurants":1,"total_price":1,"num_of_item":1,
                  "average_price_USD":{$divide:["$total_price","$num_of_item"]}}
    },
    {
        $sort:{"average_price_USD":-1}
    },
    {
     $lookup:
       {
         from: "restaurants",
         localField: "restaurants",
         foreignField: "restaurant_id",
         as: "restaurants"
       }
    },
    {
        $project:{"restaurants.name":1,
                  "restaurants.score":1,
                  "restaurants.price_range":1,
                  "total_price":1,"num_of_item":1,
                  "average_price_USD":{$divide:["$total_price","$num_of_item"]}}
    },
    {
        $limit:10
    },
    
    ])