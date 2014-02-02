
#
# use google-closure-compiler to compress js
#

module Jekyll

  class JsCompressor < Generator

    safe true

    def generate(site)

      libs = %w[
        site.js cart.js
      ].collect { |e| "_js/#{e}" }

      FileUtils.mkdir_p('js')
      system(
        "java -jar _tools/google-closure-compiler.jar --js #{libs.join(' ')}" +
        " > js/site.js"
      )
      puts 'wrote js/site.js.'
    end
  end
end

