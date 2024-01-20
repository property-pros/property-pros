#!/bin/bash
echo "Configuring SSH key..."
mkdir -p ~/.ssh
echo "$SSH_KEY" | base64 --decode > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
ssh-keyscan github.com >> ~/.ssh/known_hosts
