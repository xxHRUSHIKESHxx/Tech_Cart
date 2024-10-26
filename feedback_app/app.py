from flask import Flask, request, jsonify

from flask_pymongo import PyMongo

from bson import ObjectId

from flask_cors import CORS
 
 
app = Flask(__name__)
 
CORS(app)

# MongoDB configuration

app.config["MONGO_URI"] = "mongodb://localhost:27017/capstone_feedback"

mongo = PyMongo(app)
 
# Feedback Collection

feedback_collection = mongo.db.feedback
 
@app.route('/')

def index():

    return "Welcome to the Feedback API"
 
@app.route('/submit_feedback', methods=['POST'])

def submit_feedback():

    # Get data from request

    data = request.get_json()
 
    # Required fields for user and feedback

    user_data = data.get('user', {})

    rating = data.get('rating', None)

    review = data.get('review', "")
 
    # Validate if required fields are present

    if not user_data or not rating:

        return jsonify({"error": "Missing required fields"}), 400
 
    # Prepare feedback document to be inserted into MongoDB

    feedback = {

        "user": {

            "id": user_data.get('id'),

            "username": user_data.get('username'),

            "email": user_data.get('email'),

            "is_admin": user_data.get('is_admin', False),

        },

        "rating": rating,

        "review": review

    }
 
    # Insert into MongoDB

    feedback_id = feedback_collection.insert_one(feedback).inserted_id
 
    # Return success response

    return jsonify({

        "message": "Feedback submitted successfully",

        "feedback_id": str(feedback_id)

    }), 201
 
# Route to retrieve all feedback

@app.route('/feedbacks', methods=['GET'])

def get_feedbacks():

    feedbacks = feedback_collection.find()

    result = []

    for feedback in feedbacks:

        result.append({

            "id": str(feedback["_id"]),

            "user": feedback["user"],

            "rating": feedback["rating"],

            "review": feedback["review"]

        })
 
    return jsonify(result), 200
 
if __name__ == '__main__':

    app.run(debug=True)

 