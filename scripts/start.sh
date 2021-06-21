trap "rm -rf _site" INT
bundle exec jekyll serve _config.dev.yml
