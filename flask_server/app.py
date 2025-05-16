from flask import Flask, redirect, url_for, session, jsonify, request
from authlib.integrations.flask_client import OAuth
from bson import ObjectId
import datetime
import jwt
import os
from flask_cors import CORS
from dotenv import load_dotenv
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from google.oauth2 import id_token
from google.auth.transport import requests
import requests as req
import json

import stripe

import gspread
from oauth2client.service_account import ServiceAccountCredentials
from functools import wraps
from pymongo import ReturnDocument


load_dotenv()


SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")

SOUND_SERVER = os.getenv("SOUND_SERVER")

ENV_MODE = os.getenv("ENV_MODE")

webhook_secret = os.getenv('STRIPE_WEBHOOK_SECRET')

# stripe.api_key = os.getenv("STRIPE_API_KEY")
STRIPE_KEY =''
if ENV_MODE =='test_mode':
    STRIPE_KEY = os.getenv("STRIPE_TEST_API_KEY")
else:
    STRIPE_KEY=  os.getenv("STRIPE_API_KEY")
    
stripe.api_key = STRIPE_KEY



json_data = os.getenv('GOOGLE_SERVICE_ACCOUNT_JSON')
if not json_data:
    raise Exception("Service account JSON not found in environment")

creds_dict = json.loads(json_data)

# Google Sheets setup
SCOPE = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
# 
# CREDS_FILE = "creds.json"  # Your downloaded service account key


        
SPREADSHEET_NAME = "Muteify Email List"  # Your Google Sheet name

SPREADSHEET_ID = 0


ALL_PLANS = [
    {"name":'Basic-Trial',"minutes":60,"days":3,"test_prod_id":'prod_SIWSeodkjoYwtQ',"live_prod_id":'prod_SIvTcRCZbWzxMk'},
    {"name":'Premium-Trial',"minutes":60,"days":3,"test_prod_id":'prod_SIXfHdO7F14kgZ',"live_prod_id":'prod_SIvSsVTJBsFv1O'},
    {"name":'Basic',"minutes":45,"days":35,"test_prod_id":'prod_SIv7fc6J9GgW5Q',"live_prod_id":'prod_SIvOpOnPDR0pYn'},
    {"name":'Premium',"minutes":9999,"days":35,"test_prod_id":'prod_SIv58GHgV6gnWy',"live_prod_id":'prod_SIvQywR4mFMLzA'},
]

ADMIN_EMAILS = os.getenv('ADMIN_EMAILS', '')
ADMIN_EMAILS_LIST = [user.strip() for user in ADMIN_EMAILS.split(',') if user]


# Authorize gspread
creds = ServiceAccountCredentials.from_json_keyfile_dict(creds_dict, SCOPE)
client = gspread.authorize(creds)
sheet = client.open(SPREADSHEET_NAME).sheet1  # Access the first sheet

app = Flask(__name__)
CORS(app)


app.config["MONGO_URI"] = os.getenv("MONGO_DB_URL")
mongo = PyMongo(app)
bcrypt = Bcrypt(app)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Token is missing"}), 403

        try:
            token = token.split(" ")[1] if " " in token else token  # Handle "Bearer <token>"
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = data["email"]
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 403
        except Exception as e:
            print(e)
            return jsonify({"error": "Invalid token"}), 403

        return f(current_user, *args, **kwargs)
    return decorated

@app.route('/config', methods=['GET'])
@token_required
def get_user_config(current_user):
    users = mongo.db.users
    accounts = mongo.db.accounts

    # Fetch user and account
    user = users.find_one({"email": current_user})
    if not user:
        return jsonify({"error": "User not found"}), 404

    account = accounts.find_one({"userId": str(user["_id"])})
    if not account:
        return jsonify({"error": "Account not found"}), 404

    # Extract plan and usage
    plan = account.get("plan")
    
    print(plan)
    if not plan:
         return jsonify({
        "email": user.get("email"),
        "plan": plan,
        "error":True,
        "success":False,
        "sound_server":SOUND_SERVER
        })
        
    usage_records = account.get("usage", [])

    today_date = datetime.datetime.utcnow().strftime('%Y-%m-%d')
    today_usage_minutes = sum(u["minutes"] for u in usage_records if u["date"] == today_date)
    
    print('today_usage_minutes',today_usage_minutes)
    
    the_plan_obj = [it for it in ALL_PLANS if it["name"]==plan][0]
    
    print(the_plan_obj)

    allowed_minutes = the_plan_obj['minutes']  # default to 10 if not found
    
    print(plan,allowed_minutes)
    remaining_minutes = max(allowed_minutes - today_usage_minutes, 0)
    
    return jsonify({
    "email": user.get("email"),
    "plan": plan,
    "usage_today_minutes": round(today_usage_minutes, 2),
    "remaining_minutes_today":remaining_minutes,
    "error":False,
    "success":True,
    "sound_server":SOUND_SERVER
    }) 



@app.route('/auth/google',methods=["POST"])
def google_auth():
    users = mongo.db.users
    accounts = mongo.db.accounts
    data = request.json
    
    code = data.get("code")
    scope = data.get("scope")
    origin = data.get("origin")
    redirect_uri = data.get('redirect_uri')
    
    print(code)
    print(origin)
    print(redirect_uri)
    
    token_url = 'https://oauth2.googleapis.com/token'
    
    token_response = req.post(token_url, data={
        'code': code,
        'client_id': GOOGLE_CLIENT_ID,
        'client_secret': GOOGLE_CLIENT_SECRET,
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code',
    }).json()
    
    
    # print(token_response)
  
    
    access_token = token_response.get('access_token')
    expires_in = token_response.get('expires_in')  # in seconds
    id_token_jwt = token_response.get('id_token')  # JWT token
    
    idinfo = id_token.verify_oauth2_token(id_token_jwt, requests.Request(), GOOGLE_CLIENT_ID)
    email = idinfo.get('email')
    
    if email:
        token = ''
        user = users.find_one({"email": email})
        print('user in acount',user)
        if user:
            token = jwt.encode({"email": email, "exp": datetime.datetime.utcnow() + datetime.timedelta(days=21)}, SECRET_KEY, algorithm="HS256") 
        else:
             print('making new user')
             user_dict= {"email": email,"plan":"Trial"}
             if(email in ADMIN_EMAILS_LIST):
                print('Email should be an admin')
                user_dict['plan'] = 'Basic'
                
             user_result = users.insert_one(user_dict)
             print(user_result)
             user_id = str(user_result.inserted_id)
             acc_dict = {
                "userId": user_id,
                "usage": [],
                "payments": [],
            }
             if(email in ADMIN_EMAILS_LIST):
                today_str = datetime.datetime.today().strftime('%Y-%m-%d') 
                
                exp_date = (datetime.datetime.today() + datetime.timedelta(days=30)).strftime('%Y-%m-%d')
                
                grace_date = (datetime.datetime.today() + datetime.timedelta(days=33)).strftime('%Y-%m-%d')
                
                print('Email should be an admin')
                acc_dict['plan'] = 'Basic'
                acc_dict['plan_started'] = today_str
                acc_dict['plan_expiring'] = exp_date
                acc_dict['plan_final_date'] = grace_date
                
                
             accounts.insert_one(acc_dict)
             
             token = jwt.encode({"email": email, "exp": datetime.datetime.utcnow() + datetime.timedelta(days=21)}, SECRET_KEY, algorithm="HS256")
            
        return jsonify({"token": token,"success":True,"error":False})
    else:
        return jsonify({"error": "No email found"}), 401
    
    




@app.route("/signup", methods=["POST"])
def signup():
    
    users = mongo.db.users
    accounts = mongo.db.accounts
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if users.find_one({"email":email}):
        return jsonify({"error": "User with email  already exists"}), 409

    hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
    user_dict= {"email": email, "password": hashed_pw}
    if(email in ADMIN_EMAILS_LIST):
        print('Email should be an admin')
        user_dict['plan'] = 'Basic'
    user_result = users.insert_one(user_dict)
    # print(user_result)
    
    user_id = str(user_result.inserted_id)
    acc_dict = {
        "userId": user_id,
        "usage": [],
        "payments": [],
    }
    if(email in ADMIN_EMAILS_LIST):
        print('Email should be an admin')
        acc_dict['plan'] = 'Basic'
        today_str = datetime.datetime.today().strftime('%Y-%m-%d') 
                
        exp_date = (datetime.datetime.today() + datetime.timedelta(days=30)).strftime('%Y-%m-%d')
        
        grace_date = (datetime.datetime.today() + datetime.timedelta(days=33)).strftime('%Y-%m-%d')
        
        print('Email should be an admin')
        acc_dict['plan'] = 'Basic'
        acc_dict['plan_started'] = today_str
        acc_dict['plan_expiring'] = exp_date
        acc_dict['plan_final_date'] = grace_date
    accounts.insert_one(acc_dict)
    token = jwt.encode({"email": email, "exp": datetime.datetime.utcnow() + datetime.timedelta(days=21)}, SECRET_KEY, algorithm="HS256")
    return jsonify({"message": "User created successfully","success":True,"error":False,"token":token}), 201

@app.route("/login", methods=["POST"])
def login():
    users = mongo.db.users
    data = request.json
    email = data.get("email")
    password = data.get("password")
    user = users.find_one({"email": email})

    if user:
        if bcrypt.check_password_hash(user["password"], password):
            token = jwt.encode({
                "email": email,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(days=21)
            }, SECRET_KEY, algorithm="HS256")
            return jsonify({"token": token,"success":True,"error":False})
        else:
            return jsonify({"error": "Invalid credentials"}), 401
    else:
        return jsonify({"error": "No user with this email"}), 401
    
    
    
@app.route('/submit-email', methods=['POST'])
def submit_email():
    data = request.get_json()
    email = data.get('email')
    
    print(email)

    if not email:
        return jsonify({"error": "Email is required"}), 400

    try:
        sheet.append_row([email])
        return jsonify({"message": "Email added successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
   
   
def createPaymentLink(productId,meta_data):  
    priceItem =stripe.Price.create(
    currency= 'gbp',
    unit_amount= 100,
    product=productId,
    );
    
    linkObject = stripe.PaymentLink.create(
        line_items=[{"price": priceItem["id"], "quantity": 1}],
        customer_creation="always",
        metadata=meta_data,
    )
    
    return linkObject

@app.route('/stripe/get-link', methods=['POST'])
@token_required
def create_link(current_user):
# def create_link(current_user):
    users = mongo.db.users
    accounts = mongo.db.accounts
    
    data = request.json
    
    the_user = users.find_one({"email": current_user})
    
    the_account = accounts.find_one({"userId": str(the_user['_id'])})
    
    print(the_account)
    
    print(the_account["userId"])

    
    if(the_account and "plan" in the_account and "plan_expiring" in the_account):
        print('EXISTING PLAN, CHEECKING IF EXIRED')
        today = datetime.datetime.today()
        
        date_obj = datetime.datetime.strptime(the_account['plan_expiring'], '%Y-%m-%d')
        if date_obj>  today:
            print('plan still valid')
            return jsonify({"message": 'You have an existing plan',"success":False,"error":True}),400
    # current_user = 'austinandogola@gmail.com'
    
    # productId = data.get('productId',"prod_SIWSeodkjoYwtQ")
    productName = data.get('productName')
    
    plan = [p for p in ALL_PLANS if p["name"]==productName][0]
    
    print(plan)
    
    productId=''
    if ENV_MODE =='test_mode':
        productId = plan['test_prod_id']
    else:
        productId = plan['live_prod_id']
        
    meta_data = {'user_id':current_user,"product_name":productName}
    
    payment_dict = createPaymentLink(productId,meta_data)
    
    return jsonify({"payment_url": payment_dict['url'],"success":True,"error":False}),200
    
    


    
    
# createPaymentLink('prod_SIWSeodkjoYwtQ','austinandogola@gmail.com')
    
    

@app.route('/webhook', methods=['POST'])
def webhook():
    accounts = mongo.db.accounts
    payments = mongo.db.payments
    users = mongo.db.users
    payload = request.data
    sig_header = request.headers.get('Stripe-Signature')
    
    # print(payload)
    
    # Convert bytes to string
    payload_str = payload.decode('utf-8')
    
    payload_json = json.loads(payload_str)

    # print("Parsed JSON object:", payload_json)  # Now it's a Python dict
    payload_data = payload_json["data"]
    data_object = payload_data["object"]
    event_type = payload_json["type"]
    
    # print(payload_json)
    
    print(event_type)
   
    if 'checkout.session' in event_type  :
        # payment_intent_id = data_object['id']
        customer_id = data_object['customer']
        payment_status = data_object['payment_status']
        amount_total = data_object['amount_total']
        currency = data_object['currency']
        meta_data = data_object['metadata']
        payment_intent = data_object['payment_intent']
       
       
        # print(data_object)
        # print('payment_status',payment_status)
        # print('amount_total',amount_total)
        # print('currency',currency)
        # print('meta_data',meta_data)
        # print('payment_intent',payment_intent)
        
        update_data ={
                # "payment_intent": payment_intent,
                "payment_status": payment_status,
                "amount": amount_total,
                "currency": currency,
                "customer_id": customer_id,
                "user_id":meta_data['user_id'],
                'product_name':meta_data['product_name']
                }
        
        payment_record = payments.find_one({"payment_intent": payment_intent})
        # print(payment_record)
        if not payment_record:
            print('No payment record , adding')
            # payment_result = payments.insert_one()
        else:
            print('payment record found, updating')
        
        payment_result =payments.find_one_and_update(
            {"payment_intent": payment_intent},     # Filter: document with this _id
            {"$set": update_data},  # Update: set new/updated fields
            upsert=True    ,# Insert if doesn't exist
            return_document=ReturnDocument.AFTER
        )
        
        # print(payment_result)
        
        the_user = users.find_one({"email": meta_data['user_id']})
        
        print(the_user)
        
        the_account = accounts.find_one({"userId": str(the_user['_id'])})
        
        print(the_account)
        
        past_payments = the_account['payments']
        
        past_payments.append(payment_intent)
        
        
        
        plan_name = meta_data['product_name']
        
       
        today_str = datetime.datetime.today().strftime('%Y-%m-%d') 
        
        exp_days = 30
        exp_date = ''
        grace_date = ''
        if 'Trial' in plan_name:
            exp_days = 3
            exp_date = (datetime.datetime.today() + datetime.timedelta(days=3)).strftime('%Y-%m-%d')
            grace_date = (datetime.datetime.today() + datetime.timedelta(days=3)).strftime('%Y-%m-%d')
            
        else:
            exp_date = (datetime.datetime.today() + datetime.timedelta(days=30)).strftime('%Y-%m-%d')
            grace_date = (datetime.datetime.today() + datetime.timedelta(days=33)).strftime('%Y-%m-%d')
        
        
        
        
        plan_data = {
            'plan': plan_name,
            'plan_started':today_str,
            'plan_expiring':exp_date,
            'plan_final_date':grace_date,
            'payments':past_payments
        }
        new_acc = accounts.find_one_and_update(
            {"userId": str(the_user['_id'])},
            {"$set": plan_data},
            return_document=ReturnDocument.AFTER
        )
        
        print(new_acc)
        
        
        
    elif 'charge.succeeded' in event_type  :
        charge_amount = data_object['amount_captured']
        currency = data_object['currency']
        customer_id = data_object['customer']
        payment_method = data_object['payment_method']
        receipt_url = data_object['receipt_url']
        paid = data_object['paid']
        payment_intent = data_object['payment_intent']
        created = data_object['created']
        
        update_data={
                # "payment_intent": payment_intent,
                # "payment_status": payment_status,
                "amount": charge_amount,
                "currency": currency,
                "customer_id": customer_id,
                "payment_method":payment_method,
                "paid":paid,
                "receipt_url":receipt_url,
                "created":created
                }
        
        payment_record = payments.find_one({"payment_intent": payment_intent})
        print(payment_record)
        if not payment_record:
            print('No payment record , adding')
        else:
            print('payment record found,updating')
            
        payment_result = payments.find_one_and_update(
            {"payment_intent": payment_intent},     # Filter: document with this _id
            {"$set": update_data},  # Update: set new/updated fields
            upsert=True   ,          # Insert if doesn't exist,
            return_document=ReturnDocument.AFTER
        )
        
        print(payment_result)
   
    
    return jsonify({"message":"DONE"})

@app.route('/get_duration/<video_id>', methods=['GET'])
def get_audio_duration(video_id):
    return redirect(f'http://213.173.105.105:10250/get_duration/{video_id}')

@app.route("/separate/partial/YT", methods=["POST"])
@token_required
def partialSeparateYoutubeAudio(current_user):

    users = mongo.db.users
    accounts = mongo.db.accounts
            
    user = users.find_one({"email": current_user})
    if not user:
        return jsonify({"error": "User not found"}), 404

    account = accounts.find_one({"userId": str(user["_id"])})
    if not account:
        return jsonify({"error": "Account not found"}), 404
    
    plan = account.get("plan")
    usage_records = account.get("usage", [])
    
    if not plan:
        return jsonify({"error":True,"message":"You don't have a usage plan"}), 404
    
    today_date = datetime.datetime.utcnow().strftime('%Y-%m-%d')
    today_usage_minutes = sum(u["minutes"] for u in usage_records if u["date"] == today_date)
    
    the_plan_obj = [it for it in ALL_PLANS if it["name"]==plan][0]

    allowed_minutes = the_plan_obj['minutes']  # default to 10 if not found
    
    print(plan,allowed_minutes)
    remaining_minutes = max(allowed_minutes - today_usage_minutes, 0)
    
    data = request.json
    videoUrl = data.get("videoUrl")
    start=data.get("start","0")
    end=data.get("end","10000")
    
    requested_duration_seconds = (end - start) / 1000.0
    requested_duration_minutes = requested_duration_seconds / 60.0
    
    if today_usage_minutes + requested_duration_minutes > allowed_minutes:
        return jsonify({"error":True,"message": "Daily usage limit exceeded"}), 403
    
    if "youtube.com" in videoUrl or "youtu.be" in videoUrl:
        video_id = videoUrl.split("v=")[-1] if "v=" in videoUrl else videoUrl.split("/")[-1]
    else:
        return jsonify({"error": "Invalid YouTube URL or ID"}), 400
    
    return redirect(f'http://213.173.105.105:10250/separate/partial/YT?videoUrl={videoUrl}&start={start}&end={end}')
    

    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)