from config import db
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
import json
from sqlalchemy.ext.mutable import MutableDict



class Greenhouse(db.Model, SerializerMixin):
    __tablename__ = 'greenhouses'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    air_temp = db.Column(db.Integer)
    humidity = db.Column(db.Integer)

    zones = db.relationship('Zone', back_populates='greenhouse', foreign_keys="Zone.greenhouse_id")


class Zone(db.Model, SerializerMixin):
    __tablename__ = 'zones'

    id = db.Column(db.Integer, primary_key=True)
    plant_list = db.Column(db.String)  # Store list of dictionaries as JSON

    greenhouse_id = db.Column(db.Integer, db.ForeignKey('greenhouses.id'))
    plant_id = db.Column(db.Integer, db.ForeignKey('plants.id'))

    greenhouse = db.relationship('Greenhouse', back_populates='zones', foreign_keys=[greenhouse_id])
    plants = db.relationship('Plant', back_populates='zone', foreign_keys=[plant_id])



class Plant(db.Model, SerializerMixin):
    __tablename__ = 'plants'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    planted_on = db.Column(db.DateTime, server_default=db.func.now())
    diameter = db.Column(db.Integer)
    height = db.Column(db.Integer)
    expected_yield = db.Column(db.Integer)
    temperature_range = db.Column(db.Integer)
    moisture_range = db.Column(db.Integer)
    sunlight_range = db.Column(db.Integer)
    symbiotic_relations = db.Column(db.String)
    growth_time = db.Column(db.Integer)
    color = db.Column(db.String)
   

    zone = db.relationship('Zone', back_populates='plants')