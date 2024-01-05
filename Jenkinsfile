pipeline {
    agent any

    environment {
        NODEJS_HOME = tool 'nodejs'
        DOCKERHUB_CREDENTIALS = credentials('id_hub')
        DOCKER_IMAGE_NAME = 'faniry123/back'
        DOCKER_IMAGE_TAG = "${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}"
        OLD_DOCKER_IMAGE_TAG = "${DOCKER_IMAGE_NAME}:${BUILD_NUMBER - 1}"
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // Construction de l'image Docker
                    docker.build("${DOCKER_IMAGE_TAG}", '.')
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    // Connexion à Docker Hub en utilisant les identifiants
                    withCredentials([usernamePassword(credentialsId: 'id_hub', usernameVariable: 'DOCKERHUB_CREDENTIALS_USR', passwordVariable: 'DOCKERHUB_CREDENTIALS_PSW')]) {
                        sh "echo \$DOCKERHUB_CREDENTIALS_PSW | docker login -u \$DOCKERHUB_CREDENTIALS_USR --password-stdin"
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // Pousser l'image Docker vers Docker Hub
                    sh "docker push ${DOCKER_IMAGE_TAG}"
                }
            }
        }

        stage('Stop and Remove Containers Using Previous Docker Images') {
            steps {
                script {
                    // Récupérer la liste des IDs des conteneurs utilisant les anciennes images
                    def oldContainerIDs = sh(script: 'docker ps -a --filter "ancestor=${OLD_DOCKER_IMAGE_TAG}" --format "{{.ID}}"', returnStdout: true).trim()

                    // Vérifier si des conteneurs ont été trouvés avant de tenter de les arrêter et de les supprimer
                    if (oldContainerIDs && oldContainerIDs.trim().size() > 0) {
                        echo "Arrêt et suppression des conteneurs utilisant l'ancienne image..."
                        // Stopper et supprimer les conteneurs
                        oldContainerIDs.split('\n').each { containerID ->
                            sh "docker stop ${containerID}"
                            sh "docker rm ${containerID}"
                        }

                        // Supprimer l'ancienne image
                        sh "docker rmi -f ${OLD_DOCKER_IMAGE_TAG}"
                    } else {
                        echo "Aucun conteneur utilisant l'ancienne image n'a été trouvé."
                    }
                }
            }
        }
    }

    post {
        always {
            // Déconnexion de Docker Hub après la fin de la pipeline
            sh 'docker logout'
        }
    }
}
