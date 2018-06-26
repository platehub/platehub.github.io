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
  - "[img_url](#img_url)"
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
Note that this method of loading jQuery is highly preferred over doing it yourself by storing it inside your theme or getting it from a CDN directly. Plate itself also uses jQuery in edit mode and this conflicts with yours if you load it directly in your theme. Using the `global_asset_url` filter for jQuery prevents this.

```ruby
"lightbox" # Default version: 2.10.0. Available types: css, js.
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
{{ "path-to-image.jpg" | img_tag: class: "image-class", alt: "image-alt" }}
{% endraw %}
```

<p class='no-margin'>Output:</p>
```html
<img src="path-to-image.jpg">
<img src="path-to-image.jpg" class="image-class" alt="image-alt">
```

If the image is set by a [media field](/docs/content-fields#media-field), it is possible to enable inline cropping on the image. This way the user can match the image's size to it's neighbours for example. 

#### Inline cropping
Enable inline cropping by adding the `inline_crop_for` argument. The value of the argument must be the attachment object you get by calling the media field's name on the content object. E.g. calling `post.featured_image` returns an attachment object. [(Read more on attachments)](/docs/templating-reference/objects#attachment).

<p class='no-margin'>Input:</p>
```liquid
{%- raw -%}
{{ "path-to-image.jpg" | img_tag: inline_crop_for: post.featured_image }}
{% endraw %}
```

The returned html is just the image, but the the user will now be able to enter into cropping mode from the object's edit screen. Make sure to use the [attachment's cropping values](/docs/templating-reference/objects#attachmentcrop) in the `img_url` filter, otherwise the user will not be able to see the result of his crop.

___

## img_url

Creates a thumbnail for an image [attachment](/docs/templating-reference/objects#attachment) and returns it's url. You can pass a width parameter and extra arguments with the `img_url` filter to define what thumbnail you want. The first parameter is the width. 

<p class='no-margin'>Input:</p>
```liquid
{%- raw -%}
{{ attachment | img_url: 300 }}
{% endraw %}
```

<p class='no-margin'>Output:</p>
```text
https://plate.libpx.com/eu-west-1/img/12ab34cd56/my-image.jpg?width=300
```

If you only pass the one argument (width) the aspect ratio is maintained. You can add the height argument to force dimensions, but also arguments like blur and dpr to create a thumbnail of the image to your liking.

<p class='no-margin'>Input:</p>
```liquid
{%- raw -%}
{{ attachment | img_url: 300, height: 200, mode: "stretch", blur: 5 }}
{% endraw %}
```

<p class='no-margin'>Output:</p>
```text
https://plate.libpx.com/eu-west-1/img/12ab34cd56/my-image.jpg?width=300&height=200&mode=stretch&blur=5
```

Below you can find all arguments you can use on the `img_url` and what they do.

#### `width`
Specifies the width of the output image in pixels.

If the width is set to 0 its value will be automatically calculated based on the supplied [height](#height) value, so that the original image aspect ratio is preserved. If both width and height are supplied, the image will be resized according to the [mode setting](#mode).

#### `height`
Specifies the height of the output image in pixels.

If the height is omitted or set to 0 (default) its value will be automatically calculated based on the supplied [width](#width) value, so that the original image aspect ratio is preserved. If both width and height are supplied, the image will be resized according to the [mode setting](#mode).

#### `mode`
Controls the resize mode when both a <a href="#width">width</a> and <a href="#height">height</a> are specified.

Available modes:

- `fit`: Resize to fit within the boundaries defined by the `width` and `height` parameters, while maintaining the original aspect ratio. If the output aspect ratio differs from the original, only one of the dimensions (width or height) will equal its set value, while the other will be smaller.
- `crop`: Resize to fill the entire area defined by `width` and `height`, by maintaining the aspect ratio, but possibly clipping part of the image.
- `stretch`: Resize to fill the entire area defined by `width` and `height`, by modifying the aspect ratio.

The default mode is `fit`.

<div class="sample-images">
  <div class="sample-image">
    <img src="https://libpixel.libpx.com/test/dusk.jpg?width=240&amp;height=240&amp;mode=fit"/>
    <code>mode=fit</code>
  </div>
  <div class="sample-image">
    <img src="https://libpixel.libpx.com/test/dusk.jpg?width=240&amp;height=240&amp;mode=crop"/>
    <code>mode=crop</code>
  </div>
  <div class="sample-image">
    <img src="https://libpixel.libpx.com/test/dusk.jpg?width=240&amp;height=240&amp;mode=stretch"/>
    <code>mode=stretch</code>
  </div>
</div>

#### `crop` 
Allows you to specify which part of the image is used.

To crop an image, you specify four parameters – the origin x and y (which defines the top left of the crop rectangle) and the dimensions w and h (which define the size of the rectangle).

Cropping is applied before other transformations. This means that the crop values must be relative to the original size of the image, even if you resize it in the same `img_url` filter. Note also that resizing may cause additional cropping of some part of the image if `mode: "crop"` is used.

Note: you can generate crop values by using [inline crop](#inline-cropping) on [attachments](/docs/templating-reference/objects#attachmentcrop).

<div class="sample-images">
  <div class="sample-image">
    <img src="https://libpixel.libpx.com/test/plant.jpg?width=240&amp;height=240&amp;mode=crop&amp;no crop"/>
    <code>no crop</code>
  </div>
  <div class="sample-image">
    <img src="https://libpixel.libpx.com/test/plant.jpg?width=240&amp;height=240&amp;mode=crop&amp;crop=100,100,1000,1000"/>
    <code>crop=100,100,1000,1000</code>
  </div>
  <div class="sample-image">
    <img src="https://libpixel.libpx.com/test/plant.jpg?width=240&amp;height=240&amp;mode=crop&amp;crop=500,500,1000,1000"/>
    <code>crop=500,500,1000,1000</code>
  </div>
</div> 

#### `dpr`
Specifies the device pixel ratio, between `0.1` and `10.0`.

Acts as a multiplier for both the width and height. For example, using `width: 320, height: 150, dpr: 2` is equivalent to `width: 640, height: 300`.

This allows you to easily specify an image with the correct resolution for high dpi devices such as iPhones.

The default dpr is `1.0`.

#### `blur`
Blurs the image by a value relative to the image size, between `0` and `100`. The default blur value is `0` (no blur).

#### `brightness`, `contrast`, `hue`, `saturation` and `gamma`
For each image setting of `brightness`, `contrast`, `hue`, `saturation` and `gamma`, it adjusts the setting of the image, with values between `-100` and `100`. 

The default value is `0` (no adjustment).

A saturation value of `-100` turns the image into grayscale. 

#### `quality`
Sets the quality of the output image, with values between `0` and `100`. This setting only affects JPEG images. Higher quality values result in images with a larger file size. 

The default quality is `85`, which is also recommended, since it's a perfect balance between file size and image quality.

#### `format`
Normally images are processed and presented in the same format as the input image. This parameter allows you to force the output image to a particular format.

You can force images to be output as jpeg, png or webp, using `format: "jpeg"`, `format: "png"` or `format: "webp"`.

If the original image has an alpha channel (e.g. transparent PNGs), a white background will be applied if the output format does not support transparency.

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

Select all objects in an array where the attribute (first argument) returns a certain value (second argument). The default comparison operator is `==` (equal to), but you can pass another operator as the third argument. You can choose from:

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

You can also compare by date and time, which gets parsed automatically when the passed attribute name returns a date. The words `now` or `today` are parsed as the current time.

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
