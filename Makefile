run-dev:
	docker run \
	-d \
	-p 3000:3000 \
	-v '/Users/noiselim/projects/info-portal:/app' \
	-v /app/node_modules \
	--rm \
	--name node \
	info-portal

up:
	docker-compose up

down:
	docker-compose down