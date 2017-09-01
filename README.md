<table>
  <tr>
    <td>travis.ci (build only)</td>
    <td>
      <a href="https://travis-ci.org/stopbystop/sbs-app">
        <img src="https://travis-ci.org/stopbystop/sbs-app.svg?branch=master" />
      </a>
    </td>
  </tr>
</table>


## What is sbs-app
This is the repository for StopByStop.com and Device applicatication UI

## Working in sbs-app repo
Never submit to master branch directly. Propose your changes in one of two ways
* If you have permissions to create branches in the repository, submit the changes into your branch and then open a pull request, from your branch to master
* If you don't have permissions to create branches in the repository, fork the repository into your repository, open a branch off master, submit the changes into that branch, then open a pull request from your fork. [This is a good reference](https://gist.github.com/Chaser324/ce0505fbed06b947d962)

## MVC and SPA UI
The project has two UI modes: MVC (classic navigation model) and SPA (single page app mode). MVC is what is running in production. SPA is currently under development, the entry point is src/cordova/www/index.html.

## Building and running (with dotnet installed)
* ``npm run build``

## Building and running (in Docker container)
* Build docker image (from ..): ``docker build -f ./sbs-gh/web.dockerfile -t bulankou/scratch:sbs-web .``
* Upload to repo ``docker push bulankou/scratch:sbs-web``
* Start docker container: ``docker run --name sbs-web -p 5000:5000 -d bulankou/scratch:sbs-web``

## Building Cordova app
* ``cd src/cordova``
* ``npm install``
* ``export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_144.jdk/Contents/Home``
* ``node_modules/cordova/bin/cordova build``

### Running SPA app locally
To run you can use http-server. It is already installed into dev dependencies after you run `npm install`:
* Run `http-server -S`  from repo root
* Navigate to https://localhost:8080/src/cordova/www/

## Running client unit tests
Run unit tests using http-server.
* Run `http-server -S`  from repo root
* Navigate to https://localhost:8080/test/qunit/all.html

## Viewing latest SPA UI from GitHub
You can view the latest version of SPA UI for a given branch using rawgit.com. For example: https://rawgit.com/stopbystop/sbs-app/master/src/cordova/www/index.html . Replace `master` with your branch name to see the how it appears and works in your branch

## Test pass isues opened last week
[query](https://github.com/stopbystop/sbs-app/issues?utf8=%E2%9C%93&q=is%3Aissue%20scenario%20created%3A%3E2016-10-26)    

## Debugging on Android devices
* https://taco.visualstudio.com/en-us/docs/run-app-apache/#android-devices

## Emulate device and location with Chrome developer tools
![img](http://i.imgur.com/7BHkQUD.png)

## Generate keys using openssl
* ``openssl req -new -x509 -newkey rsa:2048 -keyout localhost.key -out localhost.cer -days 365 -nodes -subj /CN=localhost``
* ``openssl pkcs12 -export -out localhost.pfx -inkey localhost.key -in localhost.cer``




