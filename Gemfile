source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins

# Essential plugins 
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-paginate"
  gem "jekyll-gist"
  gem "jekyll-include-cache"  # This is critical for Minimal Mistakes
end

# Windows and JRuby does not include zoneinfo files, so bundle them
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock http_parser.rb gem to v0.6.x on JRuby
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
