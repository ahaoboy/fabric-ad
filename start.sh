# bash < <(echo ./init/init-env.sh)
# bash < <(echo ./init/init-up.sh)
# bash < <(echo ./init/init-server.sh)
./init/env-install.sh
source ~/.bashrc

./init/net-reset.sh
source ~/.bashrc


./init/export-env.sh
source ~/.bashrc

./init/server-start.sh
