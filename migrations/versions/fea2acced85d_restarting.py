"""restarting

Revision ID: fea2acced85d
Revises: 
Create Date: 2023-08-08 17:10:06.036025

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fea2acced85d'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('greenhouses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('air_temp', sa.Integer(), nullable=True),
    sa.Column('humidity', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_greenhouses'))
    )
    op.create_table('plants',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('diameter', sa.Integer(), nullable=True),
    sa.Column('height', sa.Integer(), nullable=True),
    sa.Column('expected_yield', sa.Integer(), nullable=True),
    sa.Column('temperature_range', sa.Integer(), nullable=True),
    sa.Column('moisture_range', sa.Integer(), nullable=True),
    sa.Column('sunlight_range', sa.Integer(), nullable=True),
    sa.Column('symbiotic_relations', sa.String(), nullable=True),
    sa.Column('growth_time', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_plants'))
    )
    op.create_table('zones',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date_time', sa.Integer(), nullable=True),
    sa.Column('air_temperature', sa.Integer(), nullable=True),
    sa.Column('humidity', sa.Integer(), nullable=True),
    sa.Column('moisture_level', sa.Integer(), nullable=True),
    sa.Column('soil_content', sa.String(), nullable=True),
    sa.Column('greenhouse_id', sa.Integer(), nullable=True),
    sa.Column('plant_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['greenhouse_id'], ['greenhouses.id'], name=op.f('fk_zones_greenhouse_id_greenhouses')),
    sa.ForeignKeyConstraint(['plant_id'], ['plants.id'], name=op.f('fk_zones_plant_id_plants')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_zones'))
    )
    op.create_table('plant_beds',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('plant_id', sa.Integer(), nullable=True),
    sa.Column('zone_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['plant_id'], ['plants.id'], name=op.f('fk_plant_beds_plant_id_plants')),
    sa.ForeignKeyConstraint(['zone_id'], ['zones.id'], name=op.f('fk_plant_beds_zone_id_zones')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_plant_beds'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('plant_beds')
    op.drop_table('zones')
    op.drop_table('plants')
    op.drop_table('greenhouses')
    # ### end Alembic commands ###
