#!/bin/sh

sed -i "s/8000/$BACKEND_PORT/g" /usr/share/nginx/html/js/App.js
nginx -g "daemon off;"
