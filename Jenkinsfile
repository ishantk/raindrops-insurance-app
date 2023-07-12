pipeline {
    agent any

    tools {nodejs "NodeJS"}
  
    stages {
        stage('Source') {
            steps {
                // Get  code from a GitHub repository
                git 'https://github.com/ishantk/raindrops-insurance-app.git'

                // Run npm install
                sh "nvm use 16.14"
                sh "npm install"

                echo 'Source Stage Finished'
            }
        }

        stage('Build') {
            steps {
                // Run ng build command
                sh "ng build"
                echo 'Build Stage Finished'
            }
        }

        stage('Containerize') {
            steps {
                // Run docker command to build a container
                sh "docker build -t raindrops-insurance-app ."
                echo 'Containerizing the App with Docker'
            }
        }

        stage('Deploy') {
            steps {
                // Run the image in port 4201
                sh "docker run -d -p 4201:80 raindrops-insurance-app"
                echo 'Deploy the App with Docker'
            }
        }
    }
}