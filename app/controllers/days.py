from flask import jsonify, request
from app import app, db

from app.models.tables import Day
from flask_cors import cross_origin

@app.route('/api/days/', methods = ['GET'])
@cross_origin()
def daysGet():
  days = Day.query.all()
  return jsonify(days)