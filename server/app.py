from models import db, Greenhouse, Zone, Plant
from flask_migrate import Migrate
from flask import Flask, request, make_response, jsonify, session
from flask_restful import Api, Resource
import os
from flask_cors import CORS
from werkzeug.exceptions import NotFound
from config import app, api, db 


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)
api=Api(app)

CORS(app)

# Views go here!

@app.route('/')
def index():
    return '<h1>The Techie Gardener</h1>'


class Greenhouses(Resource):
    def get(self):
        greenhouses = [greenhouse.to_dict() for greenhouse in Greenhouse.query.all()]
        return make_response(greenhouses, 200)

    def post (self):
        try:
            data = request.get_json()
            new_greenhouse = Greenhouse(
                name = data['name'],
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

    def patch(self, id):
        try:
            greenhouse = Greenhouse.query.filter_by(id = id).first()
            data = request.get_json()
            for attr in data:
                setattr(greenhouse, attr, data[attr])
            db.session.commit()
            return make_response(greenhouse.to_dict(), 202)
        except AttributeError:
            return make_response({"error": "Greenhouse does not exists!"}, 404)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

    def delete(self, id):
        try:
            greenhouse = Greenhouse.query.filter_by(id = id).first()
        except:
            return make_response({"error": "Greenhouse not found"}, 404)

        db.session.delete(greenhouse)
        db.session.commit()
        return make_response({}, 204)

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

    def patch(self, id):
        try:
            zone = Zone.query.filter_by(id = id).first()
            data = request.get_json()
            for attr in data:
                setattr(zone, attr, data[attr])
            db.session.commit()
            return make_response(zone.to_dict(), 202)
        except AttributeError:
            return make_response({"error": "Zone does not exists!"}, 404)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

    def delete(self, id):
        try:
            zone = Zone.query.filter_by(id = id).first()
        except:
            return make_response({"error": "Zone does not exist in this matrix!"}, 404)

        db.session.delete(zone)
        db.session.commit()
        return make_response({}, 204)

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
                planted_on = data['planted_on'],
                diameter = data['diameter'],
                height = data['height'],
                expected_yield = data['expected_yield'],
                temperature_range = data['temperature_range'],
                moisture_range = data['moisture_range'],
                sunlight_range = data['sunlight_range'],
                symbiotic_relations = data['symbiotic_relations'],
                growth_time = data['growth_time'],
                color = data['color']
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

    def patch(self, id):
        try:
            plant = Plant.query.filter_by(id = id).first()
            data = request.get_json()
            for attr in data:
                setattr(plant, attr, data[attr])
            db.session.commit()
            return make_response(zone.to_dict(), 202)
        except AttributeError:
            return make_response({"error": "Plant was never planted!"}, 404)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

    def delete(self, id):
        try:
            plant = Plant.query.filter_by(id = id).first()
        except:
            return make_response({"error": "This plant was never planted!"}, 404)

        db.session.delete(plant)
        db.session.commit()
        return make_response({}, 204)

api.add_resource(PlantsById, '/plants/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)