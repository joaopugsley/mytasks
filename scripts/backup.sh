#!/bin/bash

# get current dir
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/"

# load env vars
if [ -f "$DIR/../.env" ]; then
    set -o allexport
    source "$DIR/../.env"
    set +o allexport
elif [ -f "$DIR/../.env.local" ]; then
    set -o allexport
    source "$DIR/../.env.local"
    set +o allexport
else
    echo "error: .env not found"
    exit 1
fi

# get today's date
DATE=$(date +"%d-%m-%Y")

# backup dir
BACKUP_DIR="$DIR/backup/"

# ensure the dir exists
mkdir -p "$BACKUP_DIR"

# dump the sql database into a sql file
mysqldump -h 127.0.0.1 -P 3306 -u root -p$MYSQL_ROOT_PASSWORD $MYSQL_DATABASE > "$BACKUP_DIR/$MYSQL_DATABASE-$DATE".sql

# zip the sql file
gzip $BACKUP_DIR/$MYSQL_DATABASE-$DATE.sql