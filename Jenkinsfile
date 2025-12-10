pipeline {
    agent any

    environment {
        BACKEND_DIR = 'ecommerce'
        FRONTEND_DIR = 'ecommerce-frontend'
        IMAGE_NAME = "my-ecommerce-app"
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
                    echo "Setting up Python environment..."
                    sh 'python3 -m venv venv'
                    sh '. venv/bin/activate && pip install -r requirements.txt'
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
                    echo "Building Angular application..."
                    sh 'npm run build -- --configuration production'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image"
                sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying application (placeholder)"
                echo "Later this can push image, update K8s manifests, or run docker-compose"
            }
        }
    }

    post {
        success { echo "🎉 Pipeline executed successfully!" }
        failure { echo "❌ Pipeline failed. Check logs." }
    }
}
