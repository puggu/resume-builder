pipeline{
    environment {

        def imageName = "afouruser/afour-services:leave_management_fe-${env.BRANCH_NAME}-v0.0-${env.BUILD_ID}"
        
        def DNS_NAME = "${env.BRANCH_NAME == "master" ? "lhcm.afourtech.com" : "staginglhcm.afourtech.com"}"
        
        def API_URL = "${env.BRANCH_NAME == "master" ? "https://erp.afourtech.com/api/lhcm/v1" : "https://stagingerp.afourtech.com/api/lhcm/v1"}"
        
        def HR_ACCESS = "${env.BRANCH_NAME == "master" ? "hrdept@afourtech.com" : "hrdept@afourtech.com,erpdev@afourtech.com"}"
        
        def ERP_URL = "${env.BRANCH_NAME == "master" ? "https://erp.afourtech.com" : "https://stagingerp.afourtech.com"}"

        //def BACKEND_IP = "${env.BRANCH_NAME == "master" ? "lhcm.afourtech.com" : "http://10.0.56.169:9010/"}"

    }


    agent any
    stages{
    
        stage('Variables Setup'){
            
            steps{
                    sh 'echo "API_URL = $API_URL\nHR_ACCESS = $HR_ACCESS\nERP_URL = $ERP_URL" > .env'
                    sh 'sed -i "s/#{DNS_NAME}#/$DNS_NAME/g" route_nginx.conf'
                    //sh 'sed -i "s,#{BACKEND_IP}#,$BACKEND_IP,g" route_nginx.conf'
                    
                }


        }


        stage('Install Dependencies'){
            when { anyOf { branch 'master'; branch 'staging' } }
            steps{
                    
                    sh 'npm install'

                   
                   
                    
                    
                }


        }
         stage('Build'){
            when { anyOf { branch 'master'; branch 'staging' } }
            steps{

                    sh "npm run build"
                }


        }
        stage("Build Docker Image") {
          when { anyOf { branch 'master'; branch 'staging' } }
          steps{
            script {
              docker.withRegistry("", "afour-services-dockerhub") {
                  sh "docker build --network=host -t ${imageName} ."
                }
            }
          }
        }

        stage("Push Image to Registry") {
          when { anyOf { branch 'master'; branch 'staging' } }
          steps{
            script {
              docker.withRegistry("", "afour-services-dockerhub") {
                  sh "docker push ${imageName}"
                  sh "docker rmi --force \$(docker images -q ${imageName} | uniq)"
                 }
            }
          }
        }

       stage("Deploy service on k8s-staging") {
            when {
                   branch 'staging'
            }
            steps {
              kubernetesDeploy(kubeconfigId: 'azure-staging-kubeconfig',
                 configs: 'leave_management_fe.yaml,leave_management_fe-svc.yaml',
                 enableConfigSubstitution: true)
            }
          }

       stage("Deploy service on k8s-prod") {
            when {
                   branch 'master'
            }
            steps {
              kubernetesDeploy(kubeconfigId: 'afour-internal-prod-kube',
                 configs: 'leave_management_fe.yaml,leave_management_fe-svc.yaml',
                 enableConfigSubstitution: true)
            }
          }

    }
     
    
        post {

        success{
            mail to: 'avadhutvijay.talbar@afourtech.com',
             subject: "[JENKINS]: ${currentBuild.fullDisplayName} Succeed",
             body: "Project Name : ${currentBuild.fullDisplayName}\n  Status       : Succeed\n  Log          : ${env.BUILD_URL}/consoleText"
            }

        failure{
           mail to: 'avadhutvijay.talbar@afourtech.com',
             subject: "[JENKINS]: ${currentBuild.fullDisplayName} Failed",
             body: "Project Name : ${currentBuild.fullDisplayName}\n  Status       : Failed\n  Log          : ${env.BUILD_URL}/consoleText"
        }
    }

  
}