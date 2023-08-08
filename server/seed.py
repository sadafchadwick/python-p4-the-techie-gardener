#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from models import Greenhouse, Zone, Plant

# Local imports
from app import app
from models import db

greenhouses = []

g1 = Greenhouse(
    air_temp = 85,
    humidity = 56
)
greenhouses.append(g1)

g2 = Greenhouse(
    air_temp = 90,
    humidity = 65
)
greenhouses.append(g2)

g3 = Greenhouse(
    air_temp = 75,
    humidity = 30
)
greenhouses.append(g3)




plants = []

p1 = Plant(
    name = 'Carrot',
    diameter = 3,
    #inches between plants/disregard rows
    height = 18,
    #inches
    expected_yield = 1,
    #amount from one plant
    temperature_range = 4,
    moisture_range = 2,
    sunlight_range = 1,
    symbiotic_relations = 0,
    growth_time = 65
    #average in days
)
plants.append(p1)

p2 = Plant(
    name = 'Potato',
    diameter = 10,
    height = 40,
    expected_yield = 9,
    temperature_range = 2,
    moisture_range = 2,
    sunlight_range = 1,
    symbiotic_relations = 0,
    growth_time = 90
)
plants.append(p2)

p3 = Plant(
    name = 'Tomato',
    diameter = 20,
    height = 48,
    expected_yield = 25,
    temperature_range = 1,
    moisture_range = 2,
    sunlight_range = 1,
    symbiotic_relations = 0,
    growth_time = 80
)
plants.append(p3)

p4 = Plant(
    name = 'Lettuce',
    diameter = 8,
    height = 20,
    expected_yield = 3,
    temperature_range = 4,
    moisture_range = 2,
    sunlight_range = 2,
    symbiotic_relations = 0,
    growth_time = 50
)
plants.append(p4)

p5 = Plant(
    name = 'Cucumber',
    diameter = 24,
    height = 48,
    expected_yield = 10,
    temperature_range = 1,
    moisture_range = 2,
    sunlight_range = 1,
    symbiotic_relations = 0,
    growth_time = 60
)
plants.append(p5)

p6 = Plant(
    name = 'Onion',
    diameter = 14,
    height = 18,
    expected_yield = 1,
    temperature_range = 1,
    moisture_range = 2,
    sunlight_range = 1,
    symbiotic_relations = 0,
    growth_time = 125
)
plants.append(p6)

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        Plant.query.delete()
        db.session.add_all(plants)
        db.session.add_all(greenhouses)
        db.session.commit()
