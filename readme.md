# ![PocketBase](https://pocketbase.io/images/logo.svg) Pocket**Base** *Docker Multihost*

## About
Generates setup files for hosting multiple instances of pocketbase in the same docker container. Useful if you have several small applications and don't want to pay less for hosting all of them.

```
├── output
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── index.html
│   ├── nginx.conf
│   ├── startScript.sh
```

## Getting started
Create the .env file and add the variables needed. 
```
    npm run generate - Will generate the files to the output folder with NODE_ENV set to production
    npm run generate:dev - Same as above with NODE_ENV set to development
```
```
    Generates the files as well as running docker compose down && docker compose build && docker compose up
    npm run start
    npm run start:dev
```

## **Environment Variables**
Create .env file in the root directory of the project.  
Accepted names are **.env.production** and **.env.development**
```
APPS=app1,app2
VOLUME=/absolute/path/toVolume
MEMORY='2g'
CPUS='1.0'
```

### **Apps**
List of apps to build seperated by ,

### **Volume**
Absolute local path to volume folder
#TODO - add render disk

### **Memory**
The Memory limit for the container. 

The value  should be a positive integer followed by the suffix b, k, m, or g (short for bytes, kilobytes, megabytes, or gigabytes) as a string. 

Ex: 2g = 2 gigabytes, 512m = 512 MB

#### **CPUS**
If you have a host with 2 CPUs and want to give a container access to one of them, use the option "1.0"

Can also be set to "0.5"


<br/>
<br/>

## **Dashboard**

Available at localhost:80


<br/>
<br/>

## **Sources**

https://stackoverflow.com/questions/65627946/how-to-start-nginx-server-within-alpinelatest-image-using-rc-service-command