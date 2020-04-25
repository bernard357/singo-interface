help:
	@echo "install - install software and dependencies for this project"
	@echo "lint - check the code"
	@echo "serve - run the front-end locally"
	@echo "build - package front-end software"
	@echo "init - configure the back-end"
	@echo "status - check update of the back-end"
	@echo "push - update back-end resources"
	@echo "remove-from-git - example: PATH_TO_REMOVE=yarn.lock make remove-from-git"

install:
	npm install

lint:
	npm lint

serve:
	npm serve

build:
	npm build

init:
	amplify init
	amplify add auth
	amplify add api

status:
	amplify status

push:
	amplify push

remove-from-git:
	@[ ! -z "${PATH_TO_REMOVE}" ] || (echo "You should set PATH_TO_REMOVE. For example: PATH_TO_REMOVE=yarn.lock make remove-from-git"; exit 1)
	@read -p "Are you sure that you want to destroy file '${PATH_TO_REMOVE}'? [y/N]: " sure && [ $${sure:-N} == y ]
	git filter-branch --force --index-filter \
  	"git rm --cached --ignore-unmatch ${PATH_TO_REMOVE}" \
  	--prune-empty --tag-name-filter cat -- --all
	echo "${PATH_TO_REMOVE}" >> .gitignore
