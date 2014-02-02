
#
# compile _compass/
#

module Jekyll

  class CompassGenerator < Generator

    safe true

    def generate(site)

      puts; system 'bundle exec compass compile _compass/'
    end
  end
end

