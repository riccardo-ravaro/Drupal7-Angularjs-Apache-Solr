# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # All Vagrant configuration is done here. The most common configuration
  # options are documented and commented below. For a complete reference,
  # please see the online documentation at vagrantup.com.

  config.vm.define "web", primary: true do |web|

    # Every Vagrant virtual environment requires a box to build off of.
    web.vm.box = "precise64"

    # The url from where the 'web.vm.box' box will be fetched if it
    # doesn't already exist on the user's system.
    web.vm.box_url = "http://files.vagrantup.com/precise64.box"

    # Create a forwarded port mapping which allows access to a specific port
    # within the machine from a port on the host machine. In the example below,
    # accessing "localhost:8080" will access port 80 on the guest machine.
    web.vm.network :forwarded_port, guest: 80, host: 8090
    #web.vm.network :forwarded_port, guest: 6081, host: 8090
    web.vm.network :forwarded_port, guest: 3306, host: 3307

    # Create a private network, which allows host-only access to the machine
    # using a specific IP.
    # web.vm.network :private_network, ip: "192.168.33.10"
    web.vm.network :private_network, ip: "10.11.12.10"

    # Create a public network, which generally matched to bridged network.
    # Bridged networks make the machine appear as another physical device on
    # your network.
    # web.vm.network :public_network

    # If true, then any SSH connections made will enable agent forwarding.
    # Default value: false
    web.ssh.forward_agent = true

    # Share an additional folder to the guest VM. The first argument is
    # the path on the host to the actual folder. The second argument is
    # the path on the guest to mount the folder. And the optional third
    # argument is a set of non-required options.
    web.vm.synced_folder "./", "/vagrant/", :nfs => true

    # Provider-specific configuration so you can fine-tune various
    # backing providers for Vagrant. These expose provider-specific options.
    # Example for VirtualBox:
    #
    # web.vm.provider :virtualbox do |vb|
    #   # Don't boot with headless mode
    #   vb.gui = true
    #
    #   # Use VBoxManage to customize the VM. For example to change memory:
    #   vb.customize ["modifyvm", :id, "--memory", "1024"]
    # end
    #
    # View the documentation for the provider you're using for more
    # information on available options.

    web.vm.provider :virtualbox do |vb|
      # Use VBoxManage to customize the VM. For example to change memory:
      vb.customize ["modifyvm", :id, "--memory", "4096"]
      # vb.gui = true
    end

    # Enable provisioning with chef solo, specifying a cookbooks path, roles
    # path, and data_bags path (all relative to this Vagrantfile), and adding
    # some recipes and/or roles.
    #
    web.vm.provision :chef_solo do |chef|
      chef.cookbooks_path = "chef/cookbooks"
      chef.add_recipe "apt"
      chef.add_recipe "git"
      chef.add_recipe "vim"
      chef.add_recipe "zip"
      chef.add_recipe "curl"
      chef.add_recipe "apache2"
      chef.add_recipe "apache2::mod_rewrite"
      chef.add_recipe "openssl"
      chef.add_recipe "mysql::server"
      chef.add_recipe "memcached"
      chef.add_recipe "php"
      chef.add_recipe "php::module_mysql"
      chef.add_recipe "php::module_apc"
      chef.add_recipe "php::module_gd"
      chef.add_recipe "php::module_curl"
      chef.add_recipe "apache2::mod_php5"
      chef.add_recipe "database::mysql"
      #chef.add_recipe "varnish"
      chef.add_recipe "java"
      chef.add_recipe "hipsnip-solr"
      chef.add_recipe "urbinfo-site"
      chef.add_recipe "urbinfo-solr"

      chef.json.merge!({
        "mysql" => {
          "server_root_password" => "password",
          "server_debian_password" => "password",
          "server_repl_password" => "password",
          "allow_remote_root" => true,
          "bind_address" => "0.0.0.0",
          "tunable" => {
            "max_allowed_packet" => "128M"
          }
        },
        "varnish" => {
          "vcl_cookbook" => "urbinfo-site",
          "backend_port" => "80",
          "secret_file" => "/etc/varnish/secret_fixed"
        },
        "java" => {
          "install_flavor" => "oracle",
          "jdk_version" => "7",
          "oracle" => {
            "accept_oracle_download_terms" => true
          }
        },
        "jetty" => {
          "port" => "8983"
        }
      })
    end

  end

end
