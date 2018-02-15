---
layout: docs
title: Filters
page_url: /docs/templating-reference/filters
id: "templating-reference"
sub_menu:
  - "[Liquid](/docs/templating-reference#liquid)"
  - "[Tags](/docs/templating-reference/tags)"
  - "include_sub_menu_sub"
  - "[Objects](/docs/templating-reference/objects)"
sub_menu_sub:
  - "[asset_url](#asset_url)"
  - "[empty?](#empty)"
  - "[global_asset_url](#global_asset_url)"
  - "[img_tag](#img_tag)"
  - "[not_empty?](#not_empty)"
  - "[parameterize](#parameterize)"
  - "[script_tag](#script_tag)"
  - "[stylesheet_tag](#stylesheet_tag)"
  - "[to_json](#to_json)"
  - "[where](#where)"
---

## asset_url
Returns the url of an asset inside the `assets` folder of your theme.

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ "css/style.css" | asset_url }}{% endraw %}
```

<p class='no-margin'>Output:</p>
```text
/theme/assets/css/style.css
```

___

## empty?
Returns `true` if content is 'empty'.

<p class='no-margin'>Input:</p>
```liquid
{%- raw -%}
{{ "" | empty? }}
{{ [] | empty? }}
{{ "nope" | empty? }}
{% endraw %}
```

<p class='no-margin'>Output:</p>
```text
true
true
false
```

___

## global_asset_url
Returns the url of a 'global asset'. Global assets are commonly used assets. By using these url's as input for a `script_tag` or `stylesheet_tag` you don't have to upload them yourself. Usually the url's are of the recommended CDN's.

The filter accepts two possible arguments: asset type (css/js) and version (default value depending on asset).

<p class='no-margin'>Input:</p>
```liquid
{%- raw -%}
{{ "bootstrap" | global_asset_url | stylesheet_tag }}
{{ "bootstrap" | global_asset_url: "js", "4.0.0-beta" | script_tag }}
{% endraw %}
```

<p class='no-margin'>Output:</p>
```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js"></script>
```

The following global assets are available:

```ruby
"bootstrap" # Default version: 3.3.7. Available types: css, js.
```
```ruby
"font_awesome" # Default version: 4.7.0. Available types: css.
```
```ruby
"jquery" # Default version: 3.2.1. Available types: js.
```
```ruby
"lightbox" # Default version: 2.9.0. Available types: css, js.
```
```ruby
"animate" # Default version: 3.5.2. Available types: css.
```
```ruby
"cycle2" # Default version: n/a. Available types: js.
```

___

## img_tag

Returns an HTML image tag. You can pass a string or a series of `key:value` arguments to set HTML attributes.

<p class='no-margin'>Input:</p>
```liquid
{%- raw -%}
{{ "path-to-image.jpg" | img_tag }}
{{ "path-to-image.jpg" | img_tag: "Image Name" }}
{{ "path-to-image.jpg" | img_tag: class: "image-class", alt: "image-alt" }}
{% endraw %}
```

<p class='no-margin'>Output:</p>
```html
<img src="path-to-image.jpg">
<img src="path-to-image.jpg" title="Image Name" alt="Image Name">
<img src="path-to-image.jpg" class="image-class" alt="image-alt">
```

The filter accepts an image url, but also an array of url's. In that case the filter will use the srcset responsive image option. Together with Plate's `responsive_img_urls` attribute for the `attachment` object ([read more](/docs/templating-reference/objects#attachmentresponsive_img_urls)) this is a good way to easily create responsive images.

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ attachment.responsive_img_urls | img_tag }}{% endraw %}
```

<p class='no-margin'>Output:</p>
```html
<img src="path1.jpg" srcset="path1.jpg 162w, path2.jpg 218w, path3.jpg 270w, path4.jpg 330w" sizes="(min-width:1200px) 270px, (min-width:992px) 218px, (min-width:768px) 162px, 330px">
```

**Heads up!** For now, the `responsive_img_urls` filter only works correctly for the default `image` content type.

___

## not_empty?

Opposite of `empty?` filter.

<p class='no-margin'>Input:</p>
```liquid
{%- raw -%}
{{ "" | not_empty? }}
{{ [] | not_empty? }}
{{ "nope" | not_empty? }}
{% endraw %}
```

<p class='no-margin'>Output:</p>
```text
false
false
true
```

___

## parameterize

Converts a string to a parameter.

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ "Hi there. How are we doing today?" | parameterize }}{% endraw %}
```

<p class='no-margin'>Output:</p>
```text
"hi_there_how_are_we_doing_today"
```

___

## script_tag

Returns a HTML script-tag

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ "path-to-asset.js" | script_tag }}{% endraw %}
```

<p class='no-margin'>Output:</p>
```html
<script src="path-to-asset.js" charset="utf-8"></script>
```

___

## stylesheet_tag

Returns a HTML stylesheet link-tag

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ "path-to-asset.css" | stylesheet_tag }}{% endraw %}
```

<p class='no-margin'>Output:</p>
```html
<link rel="stylesheet" href="path-to-asset.css"></link>
```

___

## to_json

Turns input into JSON, when possible. If input cannot be turned into JSON object, the filter just returns the input again.

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ site | to_json }}{% endraw %}
```

<p class='no-margin'>Output:</p>
```json
{"id": 783, "content_type": { "name": "site", "title": "Site" }, "name": "A beautiful Site", ...}
```

<p class='no-margin'>Input:</p>
```liquid
{%- raw -%}
# params = { 'param_key_1' => 'param_val_1', 'param_key_2' => 'param_val_2' }
{{ params | to_json }}
{% endraw %}
```

<p class='no-margin'>Output:</p>
```json
{"param_key_1": "param_val_1", "param_key_2": "param_val_2"}
```

___

## where

Select all the objects in an array where the attribute (first argument) returns a certain value (second argument). The default comparison operator is `==` (equal to), but you can pass another operator as the third argument. You can choose from:

`==` (equal to)  
`!=` (not equal to)  
`>` (greater than)  
`<` (less than)  
`>=` (greater than or equal to)  
`<=` (less than or equal to)  
`contains` (contains substring in String or a certain object in Array)

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ site.posts | where: "title", "Only this title" }}{% endraw %}
```

Returns all posts that have 'Only this title' as the title.

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ site.posts | where: "categories", category, "contains" }}{% endraw %}
```

Returns all posts that have the passed category as category. In this case `post.categories` returns an array, so the `contains` operator must be used.

You can also compare by date, which gets parsed automatically when the passed attribute name returns a date. The keys `now` or `today` are parsed as the current time.

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ site.posts | where: "published_at", 'March 25 2018', "<" }}{% endraw %}
```

Returns all posts that were published before 25 March 2018.

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ site.posts | where: "published_at", 'now', "<" }}{% endraw %}
```

Returns all posts that were published in the past.

#### Logical operators, and/or

You can pass more than three arguments to the where filter, to use multiple rules to compare in the selection. Every third argument is the comparison operator and is optional. E.g. passing  
`"published_at", 'March 25 2018', "title", "Only this title"`  
returns the same result as  
`"published_at", 'March 25 2018', "==", "title", "Only this title", "=="`.

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ site.posts | where: "title", "Only this title", "published_at", 'March 25 2018', "<" }}{% endraw %}
```

Returns every post that has "Only this title" as the title **OR** is created before March 25 2018.

If you want to have only the posts that have the title **AND** are created before March 25 2018, you can chain the filter like this:

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ site.posts | where: "title", "Only this title" | where: "published_at", 'March 25 2018', "<" }}{% endraw %}
```
