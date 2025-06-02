from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import logging

app = Flask(__name__)
CORS(app)  # Permitir CORS para todas as rotas

# Configurar logging
logging.basicConfig(level=logging.DEBUG)

try:
    # Conectar à MongoDB
    client = MongoClient('mongodb://admin:password123@mongodb:27017/')
    db = client.voting_db
    votes_collection = db.votes
    app.logger.info("Conectado à MongoDB com sucesso")
except Exception as e:
    app.logger.error(f"Erro ao conectar à MongoDB: {e}")

@app.route('/api/vote', methods=['POST'])
def process_vote():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'status': 'error', 'message': 'Dados não fornecidos'}), 400
            
        option = data.get('option')
        app.logger.info(f"Voto recebido para opção: {option}")
        
        if option in ['1', '2', '3']:
            # Atualizar ou inserir voto
            result = votes_collection.update_one(
                {'option': option},
                {'$inc': {'count': 1}},
                upsert=True
            )
            app.logger.info(f"Voto processado: {result}")
            return jsonify({'status': 'success', 'message': 'Voto registado com sucesso'})
        else:
            return jsonify({'status': 'error', 'message': 'Opção inválida'}), 400
            
    except Exception as e:
        app.logger.error(f"Erro ao processar voto: {e}")
        return jsonify({'status': 'error', 'message': 'Erro interno do servidor'}), 500

@app.route('/api/results', methods=['GET'])
def get_results():
    try:
        results = {'1': 0, '2': 0, '3': 0}
        
        for vote in votes_collection.find():
            results[vote['option']] = vote['count']
        
        app.logger.info(f"Resultados enviados: {results}")
        return jsonify(results)
        
    except Exception as e:
        app.logger.error(f"Erro ao obter resultados: {e}")
        return jsonify({'1': 0, '2': 0, '3': 0})

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)