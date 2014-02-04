#!/usr/bin/env ruby

target = File.absolute_path(ARGV[0] || '.')

Dir["./*"].each do |path|

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

  if ARGV[0] # else it's a dry run
    system(s)
    info = `identify "#{tpath}"`
    info = info[info.index('JPEG')..-1]
    puts '    ' + info
  end
end

