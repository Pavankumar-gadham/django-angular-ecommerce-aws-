pipeline {
    agent any

    environment {
        BACKEND_DIR  = 'ecommerce'
        FRONTEND_DIR = 'ecommerce/ecommerce-frontend'   // ✅ correct path
        IMAGE_NAME   = 'my-ecommerce-app'
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Pulling source code..."
                checkout scm
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir("${BACKEND_DIR}") {
                    echo "Setting up virtualenv and installing Python dependencies..."
                    sh '''
                        python3 -m venv venv
                        . venv/bin/activate
                        pip install --upgrade pip
                        pip install -r requirements.txt
                    '''
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir("${FRONTEND_DIR}") {
                    echo "Installing Angular dependencies..."
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    echo "Building Angular app..."
                    sh 'npm run build -- --configuration production'
                }
            }
        }

        // other stages unchanged...
    }
}
