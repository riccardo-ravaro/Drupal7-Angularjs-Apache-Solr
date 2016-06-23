include_recipe "apache2"

# Create vhost

web_app node['mysql']['dbname'] do
  docroot "/vagrant/docroot"
  allow_override "All"
  notifies :restart, "service[apache2]"
end

# Set up DB

mysql_connection_info = {
  :host => "localhost",
  :username => 'root',
  :password => node['mysql']['server_root_password']
}

mysql_database node['mysql']['dbname'] do
  connection mysql_connection_info
  action :create
end

mysql_database_user 'root' do
  connection mysql_connection_info
  password   node['mysql']['rootpassword']
  action     :grant
end

mysql_database_user node['mysql']['user'] do
  connection mysql_connection_info
  password   node['mysql']['password']
  action     :grant
end


#mysql -u root -p&lt;your_database_password&gt; -e "CREATE DATABASE &lt;your_database_name&gt;;"
#mysql -u root -p&lt;your_database_password&gt; -e "CREATE USER '&lt;your_database_user&gt;'@'localhost' IDENTIFIED BY '&lt;your_database_password&gt;';"
#mysql -u root -p&lt;your_database_password&gt; -e "GRANT ALL PRIVILEGES ON *.* TO '&lt;your_database_user&gt;'@'localhost';"
#mysql -u root -p&lt;your_database_password&gt; -e "FLUSH PRIVILEGES;"
#mysql -u root -p&lt;your_database_password&gt; &lt;your_database_name&gt; &lt; /var/www/vagrant/database_seed.sql
#mysql -u root -ppassword -e "CREATE USER '#{node['mysql']['mysqluser']}'@'localhost' IDENTIFIED BY '#{node['mysql']['password']}';"
# /usr/bin/mysql -u root -p#{node['mysql']['rootpassword']}  -D mysql -e "CREATE USER '#{node['mysql']['user']}'@'localhost' IDENTIFIED BY '#{node['mysql']['password']}';"
#  /usr/bin/mysql -u root -p#{node['mysql']['rootpassword']}  -e "GRANT ALL PRIVILEGES ON *.* TO '#{node['mysql']['user']}'@'localhost';"
#  /usr/bin/mysql -u root -p#{node['mysql']['rootpassword']}  #{node['mysql']['dbname']} < "/vagrant/#{node['mysql']['sqldump']}" 

bash 'create site db user' do
  code <<-EOF
  /usr/bin/mysql -u root -p#{node['mysql']['rootpassword']}  #{node['mysql']['dbname']} < "/vagrant/#{node['mysql']['sqldump']}"
    
  EOF
  #mysql -u root -h 127.0.0.1 -P 3306 -p#{Shellwords.escape(root_pass)} -D mysql -e "CREATE USER 'repl'@'127.0.0.1' IDENTIFIED BY 'REPLICAAATE';"
 # not_if "/usr/bin/mysql -u root -h 127.0.0.1 -P 3306 -p#{Shellwords.escape(root_pass)} -e 'select User,Host from mysql.user' | grep repl"
  action :run
end


# Install Pecl / Pear packages

drush = php_pear_channel "pear.drush.org" do
  action :discover
end

php_pear "drush" do
  channel drush.channel_name
  action :install
end

php_pear "Console_Table" do
  action :install
end

php_pear "xhprof" do
  preferred_state "beta"
  action :install
end

php_pear "PHP_CodeSniffer" do
  action :install
end

package "php5-xdebug" do
  action :install
end

package "php5-memcached" do
  action :install
end

# Export Drupal env variable

file "/etc/profile.d/drupal_env.sh" do
  content "export DRUPAL_ENV_NAME=vagrant"
end

# Create Varnish secret with fixed value

#file "/etc/varnish/secret_fixed" do
#  content "3a49978f-b3b8-4aad-a7b0-90c0bc77639a\n"
#  mode 00600
#end
