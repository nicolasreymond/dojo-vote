# dojo-elections

A web site to provide an support to suggest and vote for dojo topics.


## How To **Install**
  1. First connect on your VM via ssh.
To be able to install this app, be sure to have `docker-compose` instaled on your VM. Then,
  1. `git clone git@gitlab.com:epfl-dojo/dojo-elections.git`
  2. `docker-compose up`  
     Note: The first time you run this command, you might get an error:  
     `web_1_c4243leetc42 | npm WARN tar ENOENT: no such file or directory, open '/usr/app/node_modules/.staging/prepend-http-d1961be1/package.json'`  
     Just remove the `package-lock.json` in the web directory and try again.
  3. Head to `http://locahost:3000` and enjoy!