#!/bin/bash
./apps/test1 serve --http=0.0.0.0:8090 --dir=/test1/pb_data &
./apps/test2 serve --http=0.0.0.0:8091 --dir=/test2/pb_data &
wait -n
exit $?