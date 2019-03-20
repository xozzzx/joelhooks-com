#!/usr/bin/env node
const fs = require('fs')
const slugify = require('slug')
const moment = require('moment')
const path = require('path')
const shortid = require('shortid')

const POST_PATH = path.resolve('./content/blog/')

const title = process.argv[2]

if (!title) {
  throw 'No title was supplied as an argument.'
}

const id = shortid.generate(4)
const slug = `${slugify(title.toLowerCase())}`
const date = moment().format('YYYY-MM-DD')
const dir = `${POST_PATH}/${date}--${slugify(title.toLowerCase())}~~${id}`

const frontmatter = `---
id: ${id}
slug: ${slug}
date: ${date}
title: "${title}"
published: false
---`.trim()

fs.writeFileSync(`${dir}/index.mdx`, frontmatter, function(err) {
  if (err) {
    return
  }
})
