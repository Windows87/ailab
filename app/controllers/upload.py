import time
import os

from flask import jsonify, request
from app import app, db

from random import randrange
from app.controllers.users import getAuthor
from flask_cors import cross_origin

def generateRandomFilename():
    millis = int(round(time.time() * 1000))
    filename = str(millis) + '_' + str(randrange(millis)) + '.png'
    return filename

def uploadToServer(image, filename):
    image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

@app.route('/api/upload/', methods = ['POST'])
@cross_origin()
def uploadAPI():
    image = request.files['image']
    filename = generateRandomFilename()

    author = getAuthor()

    if type(author) is dict:
      return jsonify(error = author['error'], id = author['id']), 401

    uploadToServer(image, filename)

    return jsonify({
      "url": app.config['url'] + "/img/upload/" + filename
    })