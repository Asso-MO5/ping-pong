# ping-pong

## Docker 

for build, use : 

 ```bash
docker build -t pingpong .
 ```

for launch : 

 ```bash
docker run --restart always -d --name pingpong -p 3900:3900 -p3905:3905 pingpong npm run start
 ```
 for update : 

 ```bash
cd /var/www/ping-pong && git pull && docker stop pingpong && docker rm pingpong && docker build -t pingpong . && docker run --restart always -d --name pingpong -p 3900:3900 -p3905:3905 pingpong npm run start
 ```

## ping 
```nginx

server {
        listen 80;
        listen [::]:80;
        server_name ping.kazerlelutin.space;
        return 301 https://$host$request_uri;
}

server {
        server_name ping.kazerlelutin.space;

        location / {
                proxy_pass http://51.15.225.140:3900;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
    #listen 443 ssl;
}

```

## pong 
```nginx

server {
        listen 80;
        listen [::]:80;
        server_name pong.kazerlelutin.space;
        return 301 https://$host$request_uri;
}

server {
        server_name pong.kazerlelutin.space;

        location / {
                proxy_pass http://51.15.225.140:3901;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
    #listen 443 ssl;
}

```