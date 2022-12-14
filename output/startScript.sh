#!/bin/bash
./apps/app1 serve --http=0.0.0.0:8090 --dir=/app1/pb_data &
wait -n
exit $?