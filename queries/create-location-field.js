db.getCollection('restaurants').aggregate([
    {
        $project:{"restaurant_id":1,"name":1,"position":1,"score":1,"ratings":1,"category":1,"prica_range":1,"full_address":1,"zip_code":1,"lat":1,"lng":1,
            "location":{"type":"$type",coordinates:"$coordinates"}}
        },
    {
        $out:{db:"Restaurants-project",coll:"restaurants-location"}
        }
])