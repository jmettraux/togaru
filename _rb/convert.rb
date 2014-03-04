#!/usr/bin/env ruby

target =
  if ARGV[0]
    File.absolute_path(File.dirname(__FILE__) + '/../images/photos/' + ARGV[0])
  else
    '.'
  end
p target

Dir["./*"].each do |path|

  next unless path.downcase.match(/\.jpg$/)

  ext = File.extname(path)
  bas = File.basename(path, ext)
  ext = ext.downcase

  bass = bas.split(' ')
  bass.delete('copia')
  bas = bass.join('_')

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

if ARGV[0]
  s = "ruby #{File.dirname(__FILE__)}/list.rb #{ARGV[0]}"
  puts
  puts(s)
  puts `#{s}`
end

