import pandas as pd
import mysql.connector
from dotenv import load_dotenv
from datetime import datetime
import os

env_files = ['.env', '.env.local']
env_file = next((file for file in env_files if os.path.exists(f'../{file}')), None)

if env_file is None:
    raise FileNotFoundError(".env file not found")

load_dotenv(dotenv_path=env_file)

config = {
    'host': 'localhost',
    'database': os.getenv('MYSQL_DATABASE'),
    'user': os.getenv('MYSQL_USER'),
    'password': os.getenv('MYSQL_PASSWORD'),
    'port': 3306,
    'auth_plugin': 'mysql_native_password'
}

def main():
    try:
        conn = mysql.connector.connect(**config)

        current_date = datetime.now().strftime('%d-%m-%Y')

        folder_path = f'./reports/{current_date}'

        os.makedirs(folder_path, exist_ok=True)

        user_created_at_query = 'SELECT id, username FROM user WHERE DATE(created_at) = CURDATE();'
        task_created_at_query = 'SELECT * FROM task WHERE DATE(created_at) = CURDATE();'
        task_updated_at_query = 'SELECT * FROM task WHERE DATE(updated_at) = CURDATE();'

        user_created_today = pd.read_sql(user_created_at_query, conn);
        task_created_today = pd.read_sql(task_created_at_query, conn);
        task_updated_today = pd.read_sql(task_updated_at_query, conn);

        user_created_today.to_csv(f'{folder_path}/user-created-today.csv', index=False)
        task_created_today.to_csv(f'{folder_path}/task-created-today.csv', index=False)
        task_updated_today.to_csv(f'{folder_path}/task-updated-today.csv', index=False)

        print(f"report generated successfully")

    except mysql.connector.Error as err:
        print(f"error: {err}")

    finally:
        if 'conn' in locals():
            conn.close()

if __name__ == "__main__":
    main()