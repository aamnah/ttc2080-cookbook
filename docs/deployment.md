---
title: Deployment
date: 2024-12-06
draft: true
---


172.21.5.80

tail -f 10 /var/log/apache2/error.log

## Node

```bash
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# download and install Node.js (you may need to restart the terminal)
nvm install 22

# verifies the right Node.js version is in the environment
node -v # should print `v22.12.0`

# verifies the right npm version is in the environment
npm -v # should print `10.9.0`
```

## Apache

```bash
sudo apt update
sudo apt install apache2
```


Directory permissions needed in order to `git clone` in `/var/www`

```bash
sudo chown -R $USER /var/www
```

[ref](https://www.groveld.com/articles/give-user-permission-to-edit-and-add-files-in-var-www)



## Links
- https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment