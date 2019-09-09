docker build -t docker/betmelon-client:latest -t kingusha/betmelon-client:$SHA -f ./client/Dockerfile ./client
docker build -t docker/betmelon-server:latest -t kingusha/betmelon-server:$SHA -f ./server/Dockerfile ./server
docker build -t docker/betmelon-postgres:latest -t kingusha/betmelon-postgres:$SHA -f ./psqldb/Dockerfile ./psqldb

docker push kingusha/betmelon-client:latest
docker push kingusha/betmelon-server:latest
docker push kingusha/betmelon-postgres:latest

docker push kingusha/betmelon-client:$SHA
docker push kingusha/betmelon-server:$SHA
docker push kingusha/betmelon-postgres:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=kingusha/betmelon-server:$SHA
kubectl set image deployments/client-deployment client=kingusha/betmelon-client:$SHA
kubectl set image deployments/postgres-deployment postgres=kingusha/betmelon-postgres:$SHA