pipeline {
    agent any

    environment {
        // Define environment variables if needed
        NODE_VERSION = '20'
    }

    stages {
        stage('Install') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install' // Use bat for Windows batch commands
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                bat 'npm test'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                bat 'npm run build'
            }
        }

        // Add more stages if needed (e.g., deployment)
    }

    post {
        always {
            echo 'This will always run'
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
