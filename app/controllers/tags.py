from flask import jsonify, request
from app import app, db

from app.models.tables import Tag
from app.controllers.users import getAuthor
from flask_cors import cross_origin

@app.route('/api/tags/', methods = ['GET'])
@cross_origin()
def tagsGet():
  tags = Tag.query.all()
  return jsonify(tags)


@app.route('/api/tags/', methods = ['POST'])
@cross_origin()
def tagsPost():
    name = request.json['name']

    author = getAuthor()

    if type(author) is dict:
      return jsonify(error = author['error'], id = author['id']), 401

    tag = Tag(name)
    db.session.add(tag)
    db.session.commit()

    return jsonify(tag)