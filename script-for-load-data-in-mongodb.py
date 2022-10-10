#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Jun 10 21:23:29 2022

@author: aleksandra
"""
# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""
#%%v1
from dateutil import parser
import pymongo
import csv
import pandas as pd
import numpy as np
#%%     
def get_restaurant(row) :
    coordinates=[]
    coordinates.append(row[1].lng)
    coordinates.append(row[1].lat)
    return{
        'id': row[1].id,
        'position':row[1].position,
        'name':row[1][2],
        'score':row[1].score,
        'ratings':row[1].ratings,
        'category':row[1][5].split(","),
        'price_range':row[1][6],
        'full_address':row[1][7],
        'zip_code':row[1].zip_code,
        'lat':row[1].lat,
        'lng':row[1].lng,
        'coordinates':coordinates,
        'type': 'Point'
    }
#%%
def get_restaurant_menu(row) :
    lista=row[1][4].split(" ")
    return{
        'restaurant_id':row[1][0],
        'category':row[1][1],
        'name':row[1][2],
        'description':row[1][3],
        'price':float(lista[0])
    }
#%%
class RestaurantParser:
    def __init__(self, file1,file2):
        self._file1 = file1
        self._file2 = file2

    def add_restaurants_to_db(self, url, db_name):
        client = pymongo.MongoClient(url)
        db = client[db_name]
        df_restaurant = pd.read_csv('restaurants.csv')
        df_restaurant = df_restaurant[df_restaurant['category'].notnull()]
        df_restaurant_menus=pd.read_csv('restaurant-menus.csv')
        restaurants = []
        restaurants_menus = []
        self._restaurants = {}
        self._restaurants_menus={}
        for row in df_restaurant.iterrows():
            restaurant = get_restaurant(row)
            restaurants.append(restaurant)
        for row in df_restaurant_menus.iterrows():
            restaurant_menu = get_restaurant_menu(row)
            restaurants_menus.append(restaurant_menu)
            
        db['restaurant_menus'].insert_many(restaurants_menus)
        db['restaurants'].insert_many(restaurants)

#%%

if __name__ == '__main__':
    print("Restaurant!")
    restaurant_parser = RestaurantParser('restaurants.csv','restaurant-menus.csv')
    restaurant_parser.add_restaurants_to_db(url = 'mongodb://localhost:27017/', db_name = 'Restaurants-project123')

#%%

df_restaurant.info()
