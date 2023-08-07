"""table?

Revision ID: feab25096da0
Revises: 
Create Date: 2023-08-07 16:33:48.084303

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'feab25096da0'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('greenhouses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('air_temp', sa.Integer(), nullable=True),
    sa.Column('humidity', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('plants',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('diameter', sa.Integer(), nullable=True),
    sa.Column('height', sa.Integer(), nullable=True),
    sa.Column('expected_yield', sa.Integer(), nullable=True),
    sa.Column('temperature_range', sa.Integer(), nullable=True),
    sa.Column('moisture_range', sa.Integer(), nullable=True),
    sa.Column('humidity_range', sa.Integer(), nullable=True),
    sa.Column('symbiotic_relations', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
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
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('zones')
    op.drop_table('plants')
    op.drop_table('greenhouses')
    # ### end Alembic commands ###
