#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
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

    def post (self):
        try:
            data = request.get_json()
            new_greenhouse = Greenhouse(
                air_temp = data['air_temp'],
                humidity = data['humidity']
            )
        except ValueError:
            return make_response({"errors": ['validation errors']}, 400)

        db.session.add(new_greenhouse)
        db.session.commit()
        return make_response(new_greenhouse.to_dict(), 201)

api.add_resource(Greenhouses, '/greenhouses')

class GreenhousesById(Resource):
    def get(self, id):
        greenhouse = Greenhouse.query.filter_by(id=id).first()
        if not greenhouse:
            return make_response({"error":"Greenhouse does not exist you mother forker!"},404)
        return make_response(greenhouse.to_dict())

api.add_resource(GreenhousesById, '/greenhouses/<int:id>')

class Zones(Resource):
    def get(self):
        zones = [zone.to_dict() for zone in Zone.query.all()]
        return make_response(zones, 200)

    def post (self):
        try:
            data = request.get_json()
            new_zone = Zone(
                date_time = data['date_time'],
                air_temperature = data['air_temperature'],
                humidity = data['humidity'],
                moisture_level = data['moisture_level'],
                soil_content = data['soil_content'],
                greenhouse_id = data['greenhouse_id'],
                plant_id = data['plant_id']
            )
        except ValueError:
            return make_response({"errors": ['validation errors']}, 400)

        db.session.add(new_zone)
        db.session.commit()
        return make_response(new_zone.to_dict(), 201)

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

    def post (self):
        try:
            data = request.get_json()
            new_plant = Plant(
                name = data['name'],
                diameter = data['diameter'],
                height = data['height'],
                expected_yield = data['expected_yield'],
                temperature_range = data['temperature_range'],
                moisture_range = data['moisture_range'],
                sunlight_range = data['sunlight_range'],
                symbiotic_relations = data['symbiotic_relations'],
                growth_time = data['growth_time']
            )
        except ValueError:
            return make_response({"errors": ['validation errors']}, 400)

        db.session.add(new_plant)
        db.session.commit()
        return make_response(new_plant.to_dict(), 201)

api.add_resource(Plants, '/plants')

class PlantsById(Resource):
    def get(self, id):
        plant = Plant.query.filter_by(id=id).first()
        if not plant:
            return make_response({"error":"That plant does not exist you banana shaped fork!"},404)
        return make_response(plant.to_dict())

api.add_resource(PlantsById, '/plants/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

