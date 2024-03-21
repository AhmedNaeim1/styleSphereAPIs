from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_restful_swagger import swagger
from controllers.order_controller import order_blueprint
from config import Config
from config import db
from flask_swagger_ui import get_swaggerui_blueprint

app = Flask(__name__)

SWAGGER_URL = '/orrderAPI/docs'  
API_URL = '/static/swagger.json'  

swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,  
    API_URL,
    config={ 
        'app_name': "Order application"
    },
   
)

app.register_blueprint(swaggerui_blueprint)


api = Api(app)

app.config.from_object(Config)
db.init_app(app)

app.register_blueprint(order_blueprint)

if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=5001)
