#!/usr/bin/env ruby

Dir["./*"].each do |path|

  if m = path.match(/^(.+) copia\.(.+)$/)

    n = "#{m[1]}.#{m[2]}"
    puts "mv \"#{path}\" #{n}"
    puts `mv \"#{path}\" #{n}`
  end
end

