#!/bin/bash
./apps/app1 serve --http=0.0.0.0:8090 --dir=/app1/pb_data &
./apps/app2 serve --http=0.0.0.0:8091 --dir=/app2/pb_data &
./apps/app3 serve --http=0.0.0.0:8092 --dir=/app3/pb_data &
./apps/fightnight serve --http=0.0.0.0:8093 --dir=/fightnight/pb_data &
wait -n
exit $?