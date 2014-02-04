
#
# use google-closure-compiler to compress js
#

module Jekyll

  class JsCompressor < Generator

    $JS_MTIME = Time.new # use a class var at some point

    safe true

    def generate(site)

      libs = Dir['_js/*.js']
      mtime = libs.collect { |e| File.new(e).mtime }.max

      return if $JS_MTIME >= mtime

      $JS_MTIME = mtime

      FileUtils.mkdir_p('js')
      system(
        "java -jar _tools/google-closure-compiler.jar --js #{libs.join(' ')}" +
        " > js/site.js"
      )
      puts "\nwrote js/site.js."
    end
  end
end

