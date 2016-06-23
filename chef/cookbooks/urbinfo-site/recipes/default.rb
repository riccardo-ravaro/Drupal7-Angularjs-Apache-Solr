include_recipe "apache2"

# Create vhost

web_app 'urbinfo' do
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

mysql_database 'urbinfo' do
  connection mysql_connection_info
  action :create
end

mysql_database_user 'urbinfo' do
  connection mysql_connection_info
  password   'urbinfo'
  action     :grant
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
