import pandas as pd
import numpy as np
import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template, send_from_directory

engine = create_engine('postgres://postgres:postgres@localhost:5432/cat_db')
Base = automap_base()
Base.prepare(engine, reflect=True)


All = Base.classes.details_all

session = Session(engine)

app = Flask(__name__, static_url_path='')

@app.route("/")
def index():
        return render_template('index.html')



@app.route("/api/v1.0/all_geoJSON")
def all_geoJSON():
        results_all = session.query(All.url, All.ref_no, All.pet_name, All.status, All.description, All.address, All.longitude, All.latitude, All.color, All.hex_color).all()
        
        features_test = []
        all_final = {
                "type": "FeatureCollection",
                "features": features_test
        }

        for x in results_all:
                metadata = {                
                        "type": "Feature",
                        "geometry": {
                                "type": "Point",
                                "coordinates": [float(x.longitude), float(x.latitude)]
                        },
                        "properties": {
                                "name": x.pet_name,
                                "status": x.status,
                                "pet_id": x.ref_no,
                                "description": x.description,
                                "color": x.color,
                                "color_hex": x.hex_color,
                                "address": x.address,
                                "url": x.url
                        }
                }
                features_test.append(metadata)

        return jsonify(all_final)


if __name__ == "__main__":
    app.run(debug=True)