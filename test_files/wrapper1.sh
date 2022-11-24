#!/bin/bash


#./usr/local/bin/pocketbase1 serve --http=0.0.0.0:8090 --dir=/pb_data1 --publicDir=/pb_public1 &
./usr/local/bin/pocketbase1 serve --http=0.0.0.0:8090 --dir=/app1/pb_data &

./usr/local/bin/pocketbase2 serve --http=0.0.0.0:8091 --dir=/app2/pb_data &

# Wait for any process to exit
wait -n
  
# Exit with status of process that exited first
exit $?