from flask import jsonify, request
from app import app, db

from app.models.tables import Topic, SubTopic, TopicSubtopic
from flask_cors import cross_origin

@app.route('/api/topics/', methods = ['GET'])
@cross_origin()
def topicsGet():
  topics = Topic.query.all()
  return jsonify(topics)


@app.route('/api/topics/', methods = ['POST'])
@cross_origin()
def topicsPost():
  name = request.json['name']
  in_dropdown = 0

  if "in_dropdown" in request.json:
    in_dropdown = 1

  topic = Topic(name, in_dropdown)
  db.session.add(topic)
  db.session.commit()

  return jsonify(topic)

@app.route('/api/topics/<topic_id>/subtopics/', methods = ['POST'])
@cross_origin()
def topicsSubtopicPost(topic_id):
  subtopic_id = None

  if "subtopic_id" in request.json:
    subtopic_id = request.json['subtopic_id']

  if "name" in request.json:
    name = request.json['name']
    in_dropdown = 0

    if "in_dropdown" in request.form:
      in_dropdown = 1

    subtopic = SubTopic(name, in_dropdown)

    db.session.add(subtopic)
    db.session.commit()

    subtopic_id = subtopic.id

  topicSubtopic = TopicSubtopic(topic_id, subtopic_id)

  db.session.add(topicSubtopic)
  db.session.commit()

  topic = Topic.query.filter_by(id=topic_id).one()

  return jsonify(topic)  