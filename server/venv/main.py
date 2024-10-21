from flask import Flask, jsonify,request
import sqlite3
from datetime import datetime
from flask_cors import CORS
import uuid  

app = Flask(__name__)
CORS(app)

def init_db():
    conn = sqlite3.connect('tasks.db')
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS tasks (
            id TEXT PRIMARY KEY,
            task_name TEXT NOT NULL,
            description TEXT,
            priority TEXT,
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

def get_db_connection():
    conn = sqlite3.connect('tasks.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/tasks', methods=['GET'])
def get_tasks():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM tasks')
    tasks = cursor.fetchall()
    tasks_list = []
    for task in tasks:
        tasks_list.append({
            'id': task['id'],
            'task_name': task['task_name'],
            'description': task['description'],
            'status': task['status'],
            'priority': task['priority'],
            'created_at': str(task['created_at'])
        })
    conn.close()    
    return jsonify(tasks_list)

@app.route('/tasks', methods=['POST'])
def create_task():
    conn = get_db_connection()
    cursor = conn.cursor()
    data = request.get_json()
    task_id =  str(uuid.uuid4()) 
    
    task_name = data.get('task_name')
    description = data.get('description')
    priority = data.get('priority')

    cursor.execute('''
        INSERT INTO tasks (id,task_name, description,priority) VALUES (?,?, ?,?)
    ''', (task_id ,task_name, description,priority))
    conn.commit()
    conn.close()
    response_data = {
        'id': task_id ,
        'task_name': task_name,
        'description': description,
        'priority': priority,
    }
    return jsonify(response_data)
@app.route('/tasks/<string:id>', methods=['DELETE'])
def delete_task(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM tasks WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    
    if cursor.rowcount == 0:
        return jsonify({'message': 'Task not found!'}), 404
    return jsonify({'message': 'Task deleted successfully!'})

@app.route('/tasks/<string:id>', methods=['PUT'])
def update_task(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    data = request.get_json()
    task_name = data.get('task_name')
    description = data.get('description')
    priority = data.get('priority')

    cursor.execute('''
        UPDATE tasks
        SET task_name = ?, description = ?, priority = ?
        WHERE id = ?
    ''', (task_name, description, priority, id))

    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        return jsonify({'message': 'Task not found!'}), 404

    return jsonify({'message': 'Task updated successfully!'})
@app.route('/tasks/status/<string:id>', methods=['PUT'])
def update_task_status(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''
        UPDATE tasks
        SET status = 'done'
        WHERE id = ?
    ''', (id,))

    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        return jsonify({'message': 'Task not found!'}), 404

    return jsonify({'message': 'Task status updated to "done" successfully!'})

@app.before_request
def setup():
    init_db()

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=8080)