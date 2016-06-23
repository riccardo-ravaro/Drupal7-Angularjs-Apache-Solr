include_recipe "java"
include_recipe "hipsnip-solr"

remote_directory "/usr/share/solr/conf" do
  action :create
  owner node['jetty']['user']
  files_owner node['jetty']['user']
  source "conf"
  notifies :restart, "service[jetty]"
end
