db.getCollection('restaurants-and-restaurant-menus').aggregate([
    {
        $match:{ menu: { $elemMatch: { price: { $ne: 0.0 } } } }
    },
    {
        $project:{"total_price":{$sum:"$menu.price"},
                  "num_of_item":{$size:"$menu"},
                  "restaurant_id":1,
                  "name":1,"score":1,"ratings":1,"price_range":1,
                  "average_price_USD":{$divide:[{$sum:"$menu.price"},{$size:"$menu"}]},
                  
              }
    },
    
    {
        $sort:{"num_of_item":1}
    },
    {
        $limit: 15
    }
    ])