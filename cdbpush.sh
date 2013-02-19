#!/bin/bash

rm -rf _attachments/*.*~
rm -rf _attachments/script/*.*~
rm -rf views/sourcesps/*.*~
rm -rf views/sourcess/*.*~
rm -rf views/sourcesp/*.*~
rm -rf views/pinnochios/*.*~
couchapp push http://localhost:5984/geppeto