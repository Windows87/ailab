import jwt

from flask import jsonify, request
from app import app, db

from app.models.tables import Author, AuthorSocialNetwork
from flask_cors import cross_origin

from werkzeug.security import check_password_hash

def getAuthor():
    token = None

    if 'authorization' in request.headers:
        token = request.headers['authorization']
    
    if not token:
        return { 'error': 'token missing', 'id': 4 }

    try:
        jwtContent = jwt.decode(token, app.config['TOKEN_SECRET'], algorithms=['HS256'])
    except:
        return { 'error': 'token invalid', 'id': 3 }

    author = Author.query.filter_by(id=jwtContent['authorId']).one()    

    print(author)

    return author

@app.route('/api/authors/', methods = ['GET'])
@cross_origin()
def authorsGet():
    author = getAuthor()

    if type(author) is dict:
        return jsonify(error = author['error'], id = author['id']), 401

    return jsonify(author)


@app.route('/api/authors/', methods = ['POST'])
@cross_origin()
def authorsPost():
    name = request.json['name']
    username = request.json['username']
    password = request.json['password']
    image = request.json['image']
    description = request.json['description']
    secretCode = request.json['secretcode']

    if(secretCode != app.config['REGISTER_SECRET_CODE']):
        return jsonify(error = 'secret code invalid', id = 4), 400

    author = Author(name, image, description, username, password)
    db.session.add(author)
    db.session.commit()

    if "socialnetworks" in request.json:
        socialnetworks = request.json['socialnetworks']

        for socialnetwork in socialnetworks:
            authorSocialNetwork = AuthorSocialNetwork(socialnetwork['socialNetworkId'], socialnetwork['link'], author.id)
            db.session.add(authorSocialNetwork)
        
        db.session.commit()

        author = Author.query.filter_by(id=author.id).one()

    return jsonify(author)

@app.route('/api/authors/authenticate/', methods = ['POST'])
@cross_origin()
def authenticate():
    username = request.json['username']
    password = request.json['password']
    author = None

    try:
        author = Author.query.filter_by(username=username).one()
    except:
        return jsonify(error = 'Username do not exist', id = 1), 400
    
    if(not check_password_hash(author.password, password)):
        return jsonify(error = 'Password incorrect', id = 2), 400
    
    encodedJwt = jwt.encode({'authorId': author.id }, app.config['TOKEN_SECRET'], algorithm='HS256')

    return jsonify(token = encodedJwt.decode('UTF-8'))
    