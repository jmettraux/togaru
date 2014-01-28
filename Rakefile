
desc %{
  does rm -fR _site/
}
task :clean do
  sh('rm -fR _site/')
end

desc %{
  generate (continually) and serve the Jekyll site on port 4000
}
task :serve do
  puts
  puts '  http://localhost:4000/'
  puts
  sh('bundle exec jekyll serve --watch')
end

desc "shortcut for 'rake serve'"
task :s => :serve

desc %{
  builds the jekyll site
}
task :build do
  sh('bundle exec jekyll build')
end

desc "shortcut for 'rake build'"
task :b => :build

desc %{
  triggers Compass compilation
}
task :css do
  sh('bundle exec compass compile _compass/')
end

desc "shortcut for 'rake css'"
task :c => :css

# hidden, used only once
task :copy do

  sh('cp _compass/vendor/font-awesome/fonts/* fonts/')
end

## hidden, not much use
#task :kss do
#  sh('find . -name .sass-cache | xargs rm -fR')
#end

desc "uploads the website"
task :u => :build do

  sh('rsync -azve ssh _site/* lin:www/tg/')
end

#
# images

desc "shrink images in current dir and place shrinked in target path"
task :shrink, :path do |t, args|

  target = args[:path] || "(no_path)"
  target = File.absolute_path("#{Rake.original_dir}/#{args[:path]}")

  Dir["#{Rake.original_dir}/*"].each do |path|

    next unless path.downcase.match(/\.jpg$/)

    ext = File.extname(path)
    bas = File.basename(path, ext)
    ext = ext.downcase

    info = `identify "#{path}"`
    info = info[info.index('JPEG')..-1]
    puts
    puts '.'
    puts '  ' + path
    puts '    ' + info

    #x, y = info.split[2].split('x').collect(&:to_i)
    #rs = x > y ? '500' : 'x500'
    rs = '830x500'

    tpath = "\"#{target}/#{bas}#{ext}\""
    s = "convert \\\n  \"#{path}\" \\\n  -resize #{rs} \\\n  #{tpath}"

    puts(s)

    if args[:path] # else it's a dry run
      system(s)
      info = `identify "#{tpath}"`
      info = info[info.index('JPEG')..-1]
      puts '    ' + info
    end
  end
end

