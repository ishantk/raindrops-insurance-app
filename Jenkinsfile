pipeline {
    agent any
  
    stages {

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
