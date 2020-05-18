from flask import jsonify, request
from app import app, db

from app.models.tables import Day
from app.controllers.users import getAuthor
from flask_cors import cross_origin

@app.route('/api/days/', methods = ['GET'])
@cross_origin()
def daysGet():
  author = getAuthor()

  if type(author) is dict:
    return jsonify(error = author['error'], id = author['id']), 401

  days = Day.query.all()
  return jsonify(days)