# Default to development if environment is not set.
saved = environment
if (environment.nil?)
  environment = :development
else
  environment = saved
end

# Set this to the root of your project when deployed:
http_path = "/sites/all/themes/bootstrap_urbinfo/"
css_dir = "css"
fonts_dir = "css/fonts"
sass_dir = "sass"
images_dir = "images"
javascripts_dir = "js"

# Require any additional compass plugins here.
require 'bootstrap-sass'
require 'sass-globbing'

##
## You probably don't need to edit anything below this.
##

# You can select your preferred output style here (:expanded, :nested, :compact
# or :compressed).
output_style = (environment == :production) ? :compressed : :nested

# To enable relative paths to assets via compass helper functions. Since Drupal
# themes can be installed in multiple locations, we don't need to worry about
# the absolute path to the theme from the server.
relative_assets = true

# Conditionally enable line comments when in development mode.
line_comments = (environment == :production) ? false : true

# Output debugging info in development mode.
# sass_options = (environment == :production) ? {} : {:debug_info => true}

# Add the 'sass' directory itself as an import path to ease imports.
add_import_path 'sass'

enable_sourcemaps = true
sass_options = {:sourcemap => true}
