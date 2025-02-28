from flask import Flask, render_template, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__, template_folder="templates")  # Ensure templates folder is used

# Load the trained model and encoders
model = joblib.load("prescription_model.pkl")
label_encoders = joblib.load("label_encoders.pkl")
condition_to_drug = joblib.load("condition_to_drug.pkl")

@app.route("/")
def home():
    return render_template("index.html")  # Serve the frontend

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        new_data_encoded = {}

        # Rename input fields to match trained model features
        rename_map = {
            "condition": "CONDITION",
            "drug_prescribed": "drug",
            "dose": "dose_val_rx",
            "route_of_administration": "route",
            "gender": "gender"
        }

        # Convert input fields
        formatted_data = {rename_map[k]: v for k, v in data.items() if k in rename_map}

        # Encode categorical values
        for key, value in formatted_data.items():
            if key in label_encoders:
                try:
                    formatted_data[key] = label_encoders[key].transform([value])[0]
                except ValueError:
                    formatted_data[key] = -1  # Handle unseen labels
            else:
                formatted_data[key] = value

        # Convert to DataFrame
        new_df = pd.DataFrame([formatted_data])

        # Ensure columns are in the correct order
        expected_columns = model.feature_names_in_
        new_df = new_df.reindex(columns=expected_columns, fill_value=0)

        # Make Prediction
        prediction = model.predict(new_df)
        predicted_condition = label_encoders["CONDITION"].inverse_transform(prediction)[0]
        correct_drug = condition_to_drug.get(predicted_condition, "Unknown")

        return jsonify({"predicted_condition": predicted_condition, "suggested_drug": correct_drug})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
