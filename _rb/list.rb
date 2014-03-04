#!/usr/bin/env ruby

target =
  if ARGV[0]
    File.absolute_path(File.dirname(__FILE__) + '/../images/photos/' + ARGV[0])
  else
    '.'
  end
#p target

srcs = []
Dir["#{target}/*.jpg"].each do |path|
  srcs << "    <img src=\"/images/photos/#{ARGV[0]}/#{File.basename(path)}\" />"
end

File.open("#{target}/list.html", 'wb') do |f|
  f.write("\n")
  f.write(srcs.join("\n"))
  f.write("\n")
end

