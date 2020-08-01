apt-get install nginx

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

source .profile

git clone https://github.com/joelerll/sensors-iot.git

cd sensors-iot


nginx

/etc/nginx/sites-available

cp default.nginx /etc/nginx/sites-available/default

sudo systemctl restart nginx

yarn install

npm install

.env.production VUE_APP_URL=http://ec2-18-218-68-190.us-east-2.compute.amazonaws.com



