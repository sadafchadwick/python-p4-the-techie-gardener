from config import db
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

# convention = {
#     "ix": "ix_%(column_0_label)s",
#     "uq": "uq_%(table_name)s_%(column_0_name)s",
#     "ck": "ck_%(table_name)s_%(constraint_name)s",
#     "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
#     "pk": "pk_%(table_name)s"
# }

# metadata = MetaData(naming_convention=convention)

# db = SQLAlchemy(metadata=metadata)

# Models go here!
# class User(db.Model):
#     pass

class Greenhouse(db.Model):
    __tablename__='greenhouses'

    id = db.Column(db.Integer, primary_key=True)
    air_temp = db.Column(db.Integer)
    humidity =db.Column(db.Integer)

    # relationships
    zones= db.relationship('Zone', back_populates ='greenhouse')
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
    humidity_range=db.Column(db.Integer)
    symbiotic_relations=db.Column(db.String)

    # relationships
    zones= db.relationship('Zone', back_populates ='plants')
    greenhouse = association_proxy('plants', 'greenhouse')


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
    greenhouse= db.relationship('Greenhouse', back_populates ='zone')
    plants= db.relationship('Plant', back_populates ='zones')