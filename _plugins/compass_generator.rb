
#
# compile _compass/
#

module Jekyll

  class CompassGenerator < Generator

    $CSS_MTIME = Time.new # use a class var at some point

    safe true

    def generate(site)

      mtime = Dir['_scss/*'].collect { |e| File.new(e).mtime }.max

      return if $CSS_MTIME >= mtime

      $CSS_MTIME = mtime

      puts; system 'bundle exec compass compile _compass/'
    end
  end
end

