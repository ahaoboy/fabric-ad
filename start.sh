# bash < <(echo ./init/init-env.sh)
# bash < <(echo ./init/init-up.sh)
# bash < <(echo ./init/init-server.sh)
./init/init-env.sh
source ~/.bashrc

./init/init-up.sh
source ~/.bashrc
./init/init-server.sh

