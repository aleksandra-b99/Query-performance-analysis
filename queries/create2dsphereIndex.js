db.getCollection('restaurants').createIndex({location:"2dsphere"})