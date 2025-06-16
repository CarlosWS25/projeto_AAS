
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from werkzeug.utils import secure_filename
from flask import send_from_directory
import logging
import os

app = Flask(__name__)
CORS(app)

# Logging
logging.basicConfig(level=logging.DEBUG)

# MongoDB
try:
    client = MongoClient('mongodb://admin:password123@mongodb:27017/')
    db = client.video_db
    videos_collection = db.videos
    app.logger.info("Conectado à MongoDB com sucesso")
except Exception as e:
    app.logger.error(f"Erro ao conectar à MongoDB: {e}")

# Upload folder
UPLOAD_FOLDER = '/app/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER




@app.route('/static/<path:filename>')
def serve_video_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


# -------- VIDEO MANAGEMENT --------
@app.route('/api/videos', methods=['GET'])
def list_videos():
    try:
        videos = list(videos_collection.find({}, {'_id': 1, 'title': 1, 'description': 1, 'file_path': 1}))
        for video in videos:
            video['_id'] = str(video['_id'])
        return jsonify({'videos': videos})
    except Exception as e:
        app.logger.error(f"Erro ao listar vídeos: {e}")
        return jsonify({'error': 'Erro interno ao listar vídeos'}), 500

@app.route('/api/videos', methods=['POST'])
def add_video():
    try:
        if videos_collection.count_documents({}) >= 3:
            return jsonify({'error': 'Limite de 3 vídeos atingido'}), 400

        if 'file' not in request.files:
            return jsonify({'error': 'Ficheiro de vídeo em falta'}), 400
        file = request.files['file']

        title = request.form.get('title')
        description = request.form.get('description')

        if not file or not title or not description:
            return jsonify({'error': 'Título, descrição e ficheiro são obrigatórios'}), 400

        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        new_video = {
            'title': title,
            'description': description,
            'file_path': file_path
        }

        result = videos_collection.insert_one(new_video)
        return jsonify({'message': 'Vídeo adicionado com sucesso', 'video_id': str(result.inserted_id)}), 201
    except Exception as e:
        app.logger.error(f"Erro ao adicionar vídeo: {e}")
        return jsonify({'error': 'Erro ao adicionar vídeo'}), 500

@app.route('/api/videos/<video_id>', methods=['DELETE'])
def delete_video(video_id):
    try:
        video = videos_collection.find_one({'_id': ObjectId(video_id)})
        if not video:
            return jsonify({'message': 'Vídeo não encontrado'}), 404

        result = videos_collection.delete_one({'_id': ObjectId(video_id)})
        if result.deleted_count == 0:
            return jsonify({'message': 'Vídeo não encontrado'}), 404

        # Apagar o ficheiro físico
        try:
            os.remove(video['file_path'])
        except FileNotFoundError:
            app.logger.warning(f"Ficheiro não encontrado ao tentar apagar: {video['file_path']}")

        return jsonify({'message': 'Vídeo removido com sucesso'})
    except Exception as e:
        app.logger.error(f"Erro ao remover vídeo: {e}")
        return jsonify({'error': 'Erro ao remover vídeo'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
