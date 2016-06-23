# config valid only for Capistrano 3.1
lock '3.1.0'

set :application, 'urbinfo'
set :repo_url, 'git@github.com:urbinfo/urbinfo.git'

# Default branch is :master
ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }

# Default current_release directory is /var/www/my_app
# set :deploy_to, '/var/www/urbinfo'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, %w{config/database.yml}

# Default value for linked_dirs is []
# set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}
set :linked_dirs, %w{docroot/sites/default/files private}

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

after "deploy:publishing", "npm:install"
after "deploy:publishing", "grunt:build"
after "deploy:publishing", "drush:site_offline"
after "deploy:publishing", "drush:update_db"
after "deploy:publishing", "drush:features_revert"
after "deploy:publishing", "drush:clear_cache"
after "deploy:publishing", "drush:site_online"
