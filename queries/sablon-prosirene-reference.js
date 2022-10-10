db.restaurants.aggregate( [
   {
     $lookup:
       {
         from: "restaurant_menus",
         localField: "restaurant_id",
         foreignField: "restaurant_id",
         as: "menu"
       }
  },
  {
      $out:{db:"Restaurants-project-v2",coll:"restaurants-and-restaurant-menus"}
  }
] )