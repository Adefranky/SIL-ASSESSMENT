pipeline {
    agent any

    tools {
        nodejs 'Node 18.17.0'  // Make sure this matches your Jenkins NodeJS installation name
    }

    environment {
        CI = 'true'
        HEROKU_API_KEY = credentials('heroku-api-key')  // Create this credential in Jenkins
        HEROKU_APP_NAME = 'morning-harbor-44913'       // Replace with your app name
    }

    stages {
        stage('Clone') {
            steps {
                // Clean workspace using Windows command
                powershell 'if (Test-Path -Path .\\* ) { Remove-Item .\\* -Recurse -Force }'
                git branch: 'main',
                    url: 'https://github.com/Adefranky/SIL-ASSESSMENT.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Use bat for Windows command execution
                bat 'npm install -g @angular/cli'
                bat 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                bat 'ng lint'
            }
        }

        stage('Test') {
            steps {
                bat 'ng test --watch=false --browsers ChromeHeadless'
            }
        }

        stage('Build') {
            steps {
                bat 'ng build --configuration=production'
            }
        }

        stage('Deploy to Heroku') {
            steps {
                script {
                    // Install Heroku CLI using PowerShell
                    powershell '''
                        # Check if Heroku CLI is installed
                        if (!(Get-Command heroku -ErrorAction SilentlyContinue)) {
                            # Download and install Heroku CLI
                            Set-ExecutionPolicy Bypass -Scope Process -Force
                            $installerUrl = "https://cli-assets.heroku.com/heroku-x64.exe"
                            $installerPath = "$env:TEMP\\heroku-installer.exe"
                            Invoke-WebRequest -Uri $installerUrl -OutFile $installerPath
                            Start-Process -FilePath $installerPath -ArgumentList "/S" -Wait
                            Remove-Item $installerPath
                        }
                    '''
                    
                    // Login to Heroku using the API key
                    bat 'echo %HEROKU_API_KEY% | heroku auth:token'
                    
                    // Configure Git for Windows
                    bat '''
                        git config --global user.email "jenkins@example.com"
                        git config --global user.name "Jenkins"
                        
                        REM Initialize git if not already done
                        if not exist .git (
                            git init
                        )
                        
                        REM Add Heroku remote
                        git remote remove heroku
                        git remote add heroku https://git.heroku.com/%HEROKU_APP_NAME%.git
                        
                        REM Add and commit build files
                        git add .
                        git commit -m "Deploy from Jenkins Build %BUILD_NUMBER%"
                        
                        REM Push to Heroku
                        git push heroku HEAD:main -f
                    '''
                }
            }
        }
    }

    post {
        always {
            // Clean workspace using Windows command
            powershell 'if (Test-Path -Path .\\* ) { Remove-Item .\\* -Recurse -Force }'
        }
        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Build or deployment failed!'
        }
    }
}