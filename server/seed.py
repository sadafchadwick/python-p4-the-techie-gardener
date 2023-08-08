#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from models import Greenhouse, Zone, Plant

# Local imports
from app import app
from models import db

p1 = Plant(
    name = 'Carrot',
    diameter = .25,
    height = 4,
    expected_yield = 1,
    temperature_range = 4,
    moisture_range = 2,
    sunlight_range = 4,
    symbiotic_relations = 0
)

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        Plant.query.delete()
        db.session.add(p1)
        db.session.commit()
