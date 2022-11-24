#!/bin/bash

# Start the first process
./usr/local/bin/pocketbase1 &
  
# Start the second process
# ./my_second_process &
  
# Wait for any process to exit
wait -n
  
# Exit with status of process that exited first
exit $?