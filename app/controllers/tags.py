from flask import jsonify, request
from app import app, db

from app.models.tables import Tag
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

    tag = Tag(name)
    db.session.add(tag)
    db.session.commit()

    return jsonify(tag)