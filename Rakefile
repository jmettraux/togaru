
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

