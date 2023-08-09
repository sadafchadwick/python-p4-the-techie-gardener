from config import db
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
# from flask_bcrypt import Bcrypt

# bcrypt = Bcrypt( app )

class Greenhouse(db.Model, SerializerMixin):
    __tablename__='greenhouses'

    id = db.Column(db.Integer, primary_key=True)
    air_temp = db.Column(db.Integer)
    humidity = db.Column(db.Integer)

    # relationships
    zones = db.relationship('Zone', back_populates ='greenhouse')
    plants = association_proxy('greenhouse', 'plants')


class Plant(db.Model, SerializerMixin):
    __tablename__= 'plants'

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String)
    planted_on = db.Column(db.DateTime, server_default=db.func.now())
    diameter=db.Column(db.Integer)
    height=db.Column(db.Integer)
    expected_yield=db.Column(db.Integer)
    temperature_range=db.Column(db.Integer)
    moisture_range=db.Column(db.Integer)
    sunlight_range=db.Column(db.Integer)
    symbiotic_relations=db.Column(db.String)
    growth_time = db.Column(db.Integer)
    color = db.Column(db.String)

    # relationships
    plant_bed= db.relationship('PlantBed', back_populates ='plants')
    greenhouse = association_proxy('plants', 'greenhouse')
    zone= association_proxy('plants', 'zones')


class Zone(db.Model, SerializerMixin):
    __tablename__= 'zones'

    id=db.Column(db.Integer, primary_key=True)
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


class PlantBed(db.Model, SerializerMixin):
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



# class User( db.Model, SerializerMixin ):
#     __tablename__ = 'users'

#     serialize_rules = ( '-_password_hash', )

#     id = db.Column( db.Integer, primary_key = True )
#     name = db.Column( db.String )

#     _password_hash = db.Column( db.String )

#     @property
#     def password_hash( self ):
#         return self._password_hash

#     @password_hash.setter
#     def password_hash( self, new_password_string ):

#         # take the plaintext string and convert to "byte object"
#         plain_byte_obj = new_password_string.encode( 'utf-8' )

#         # create new encrypted object
#         encrypted_hash_object = bcrypt.generate_password_hash( plain_byte_obj )
        
#         # generate string of characters from encrypted instance
#         hash_object_as_string = encrypted_hash_object.decode( 'utf-8')

#         # finally, change instance attribute
#         self._password_hash = hash_object_as_string
    

#     # a tool to check to see if a password given, is the real password
#     def authenticate( self, some_string ):
#         return bcrypt.check_password_hash( 
#             self.password_hash, 
#             some_string.encode( 'utf-8' )
#         )