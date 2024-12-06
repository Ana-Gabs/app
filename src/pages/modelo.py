from flask import Flask, request, jsonify
import numpy as np

app = Flask(__name__)


def clasificar_actividad(urgencia, importancia):
    if urgencia >= 0.5 and importancia >= 0.5:
        return 'Urgente e Importante (Cuadrante 1)'
    elif urgencia < 0.5 and importancia >= 0.5:
        return 'No Urgente pero Importante (Cuadrante 2)'
    elif urgencia >= 0.5 and importancia < 0.5:
        return 'Urgente pero No Importante (Cuadrante 3)'
    else:
        return 'No Urgente ni Importante (Cuadrante 4)'


@app.route('/agregar_actividad', methods=['POST'])
def agregar_actividad():
    try:
      
        data = request.get_json()
        nombre = data['nombre']
        urgencia = data['urgencia']  
        importancia = data['importancia']  

   
        if not (0 <= urgencia <= 1) or not (0 <= importancia <= 1):
            return jsonify({'error': 'Los valores de urgencia e importancia deben estar entre 0 y 1'}), 400

   
        clasificacion = clasificar_actividad(urgencia, importancia)


        
        return jsonify({'mensaje': 'Actividad agregada con éxito', 'clasificacion': clasificacion}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/obtener_actividades', methods=['GET'])
def obtener_actividades():

    actividades = [
        {"nombre": "Reunión de equipo", "clasificacion": "Urgente e Importante (Cuadrante 1)"},
        {"nombre": "Leer correos", "clasificacion": "No Urgente ni Importante (Cuadrante 4)"}
    ]
    return jsonify(actividades)

if __name__ == '__main__':
    app.run(debug=True)
