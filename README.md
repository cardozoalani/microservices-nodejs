## Setup

```bash
#make sure to have git installed 
git --version

git pull https://github.com/cardozoalani/services.git
# Install minikube or eneabling kubernetes

#make sure you have Docker installed
docker --version

#make sure you have setup properly the Docker Group.

sudo usermod -aG docker $USER && newgrp docker


```
For **MacOs and Windows** kubernetes can be added from the Docker Tool 
Docker settings -> Kubernetes Tab -> enable kubernetes -> apply & restart.

For **Linux** need to install minikube

[Install minikube](https://minikube.sigs.k8s.io/docs/start/).



# Install ingress-nginx
The load valancer can be intalled following this guide

[Install ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/)

# Add path in hosts file to develop locally
For **MacOS/Linux** 

```bash
 $ minikube ip
  192.168.49.2
```

```bash
 $ sudo nano /etc/hosts
      GNU nano 4.8                       /etc/hosts                                 
127.0.0.1       localhost
192.168.49.2    challenge.dev --> add this path with ip of minukube
```

Save changes:
```bash
    CTRL+X 
    Y
    ENTER
```

For **Windows**

Type:
```bash
  minikube ip
```
Response:
```bash
  192.168.49.2
```
Use the following instructions if you’re running Windows 10 or Windows 8:

1. Press the Windows key.

2. Type Notepad in the search field.

3. In the search results, right-click Notepad and select Run as administrator.

4. From Notepad, open the following file:
```bash
c:\Windows\System32\Drivers\etc\hosts
```
Add this path with ip of minukube.
```bash
192.168.49.2    challenge.dev --> add this path with ip of minukube
```
Select File > Save to save your changes.

# install kubectl
[ install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)
# Install skaffold

[Install skaffold](https://skaffold.dev/docs/install/)

# Common Commands within k8s
## Adding secrets to kubernetes

## Necessary secrets: 
```bash
  secret: jwt-key-chall | constant: JWT_KEY <-- secret of jsonWebToken
  secret: mongo-username-msusers-secret | constant: MONGO_USERNAME <-- userame of cluseter mongodb 
  secret: mongo-password-msusers-secret | constant: MONGO_PASSWORD <-- password of cluseter mongodb 
  secret: access-key-id-aws | constant: IAM_USER_KEY <-- Access key ID of aws s3
  secret: secret-access-key-aws | constant: IAM_USER_SECRET<-- Secret access key of aws s3
  secret: bucket-name-aws | constant: BUCKET_NAME<-- Name of bucket of aws s3
  secret: namespace-aws | constant: NAMESPACE <-- Namespace of aws s3
```
```bash
  kubectl create secret generic secret-name --from-literal MY_SECRET_KEY=apisecretkeyyouwanttoaddtofile
```
## List existing secrets
```bash
  kubectl get secrets
```
## Start up repo locally

```bash
  cd services/ && skaffold dev
```

## Running tests
From services

```bash
 cd auth && npm run test 
```
```bash
 cd files && npm run test 
```

## Running a migration
- We use https://github.com/seppevs/migrate-mongo as migration tool which needs to be installed locally.

