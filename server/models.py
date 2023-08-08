from config import db
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy


class Greenhouse(db.Model):
    __tablename__='greenhouses'

    id = db.Column(db.Integer, primary_key=True)
    air_temp = db.Column(db.Integer)
    humidity = db.Column(db.Integer)

    # relationships
    zones = db.relationship('Zone', back_populates ='greenhouse')
    plants = association_proxy('greenhouse', 'plants')


class Plant(db.Model):
    __tablename__= 'plants'

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String)
    diameter=db.Column(db.Integer)
    height=db.Column(db.Integer)
    expected_yield=db.Column(db.Integer)
    temperature_range=db.Column(db.Integer)
    moisture_range=db.Column(db.Integer)
    sunlight_range=db.Column(db.Integer)
    symbiotic_relations=db.Column(db.String)

    # relationships
    plant_bed= db.relationship('PlantBed', back_populates ='plants')
    greenhouse = association_proxy('plants', 'greenhouse')
    zone= association_proxy('plants', 'zones')


class Zone(db.Model):
    __tablename__= 'zones'

    id=db.Column(db.Integer, primary_key=True)
    date_time=db.Column(db.Integer)
    air_temperature=db.Column(db.Integer)
    humidity=db.Column(db.Integer)
    moisture_level=db.Column(db.Integer)
    soil_content=db.Column(db.String)

    # Foreign Keys
    greenhouse_id=db.Column(db.Integer, db.ForeignKey('greenhouses.id'))
    plant_id=db.Column(db.Integer, db.ForeignKey('plants.id'))

    # relationships
    greenhouse= db.relationship('Greenhouse', back_populates ='zones')
    plant_beds= db.relationship('PlantBed', back_populates ='zone')
    plants=association_proxy('zone', 'plants')


class PlantBed(db.Model):
    __tablename__ = 'plant_beds'

    id=db.Column(db.Integer, primary_key=True)

    #Foreign Keys
    plant_id=db.Column(db.Integer, db.ForeignKey('plants.id'))
    zone_id=db.Column(db.Integer, db.ForeignKey('zones.id'))

    #relationships
    zone= db.relationship('Zone', back_populates ='plant_beds')
    plants= db.relationship('Plant', back_populates ='plant_bed')

    # zone = association_proxy('plants', 'zones')
    # plants = association_proxy('zones', 'plants')