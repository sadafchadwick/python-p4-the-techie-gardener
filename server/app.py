#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Greenhouse, Zone, Plant, PlantBed


# Views go here!

@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'

class Greenhouses(Resource):
    def get(self):
        greenhouses = [greenhouse.to_dict(rules='-plant_beds') for greenhouse in Greenhouse.query.all()]
        return make_response(greenhouses, 200)

api.add_resource(Greenhouses, '/greenhouses')

class GreenhousesById(Resource):
    def get(self, id):
        greenhouse = Greenhouse.query.filter_by(id=id).first()
        if not greenhouse:
            return make_response({"error":"Greenhouse does not exist you nut!"},404)
        return make_response(greenhouse.to_dict())

api.add_resource(GreenhousesById, '/greenhouses/<int:id>')

class Zones(Resource):
    def get(self):
        zones = [zone.to_dict() for zone in Zone.query.all()]
        return make_response(zones, 200)

api.add_resource(Zones, '/zones')

class ZonesById(Resource):
    def get(self, id):
        zone = Zone.query.filter_by(id=id).first()
        if not zone:
            return make_response({"error":"That zone does not exist you fool!"},404)
        return make_response(zone.to_dict())

api.add_resource(ZonesById, '/zones/<int:id>')

class Plants(Resource):
    def get(self):
        plants = [plant.to_dict() for plant in Plant.query.all()]
        return make_response(plants, 200)

api.add_resource(Plants, '/[plants')

class PlantsById(Resource):
    def get(self, id):
        plant = Plant.query.filter_by(id=id).first()
        if not plant:
            return make_response({"error":"That plant does not exist you banana shape!"},404)
        return make_response(plant.to_dict())

api.add_resource(PlantsById, '/plants/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

