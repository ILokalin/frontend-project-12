install:
	npm ci && make -C frontend install

start-frontend:
	make -C frontend start -timeout=2000

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

build:
	npm run build:deploy

deploy:
	npm ci && cd ./frontend && npm ci && npm run build:deploy

freeport:
	sudo fuser -k 5001/tcp