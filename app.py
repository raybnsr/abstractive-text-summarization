from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import BartTokenizer, BartForConditionalGeneration
import torch

# Inisialisasi aplikasi Flask
app = Flask(__name__)
CORS(app)  # Izinkan CORS untuk frontend

# Load model dan tokenizer
MODEL_PATH = "./model"  # Ganti dengan path model Anda
tokenizer = BartTokenizer.from_pretrained(MODEL_PATH)
model = BartForConditionalGeneration.from_pretrained(MODEL_PATH)

# Endpoint untuk ringkasan
@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    if not data or 'input_text' not in data:
        return jsonify({"error": "Masukkan teks untuk diringkas."}), 400
    
    input_text = data['input_text']
    
    # Tokenisasi input
    inputs = tokenizer.encode("summarize: " + input_text, return_tensors="pt", max_length=1024, truncation=True)
    
    # Generasi ringkasan
    summary_ids = model.generate(
        inputs, 
        max_length=512, 
        min_length=150, 
        length_penalty=1.0, 
        num_beams=12, 
        early_stopping=True
    )
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    
    return jsonify({"summary": summary})

# Menjalankan aplikasi
if __name__ == '__main__':
    app.run(debug=True)




# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from transformers import BartForConditionalGeneration, BartTokenizer
# import torch

# app = Flask(__name__)

# # Load model dan tokenizer
# model_dir = "./model"
# tokenizer = BartTokenizer.from_pretrained(model_dir)
# model = BartForConditionalGeneration.from_pretrained(model_dir)

# # Endpoint ringkasan
# @app.route("/summarize", methods=["POST"])
# def summarize():
#     data = request.get_json()

#     if not data or "input_text" not in data:
#         return jsonify({"error": "Masukkan teks yang valid untuk diringkas."}), 400

#     input_text = data["input_text"]

#     try:
#         # Tokenisasi input
#         inputs = tokenizer(
#             input_text,
#             return_tensors="pt",
#             max_length=1024,
#             truncation=True,
#             padding="max_length"
#         )
#         # Inferensi model
#         output = model.generate(
#             inputs["input_ids"],
#             max_length=200,
#             min_length=50,
#             length_penalty=2.0,
#             num_beams=4,
#             early_stopping=True
#         )
#         summary = tokenizer.decode(output[0], skip_special_tokens=True)

#         return jsonify({"summary": summary}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True)