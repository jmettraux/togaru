#!/usr/bin/env ruby

if ARGV.length < 1
  puts "USAGE: #{$0} {target dir}"
  exit 1
end

target = ARGV[0]

Dir['*'].each do |path|

  next unless path.downcase.match(/\.jpg$/)

  ext = File.extname(path)
  bas = File.basename(path, ext)

  puts path
  info = `identify #{path}`
  x, y = info.split[2].split('x').collect(&:to_i)
  rs = x > y ? '500' : 'x500'

  s = "convert #{path} -resize #{rs} #{target}/#{bas}#{ext.downcase}"
  puts(s)
  system(s)
end

