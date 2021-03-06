---
layout: docs
title: Objects
page_url: /docs/templating-reference/objects
id: "templating-reference"
sub_menu:
  - "[Liquid](/docs/templating-reference#liquid)"
  - "[Tags](/docs/templating-reference/tags)"
  - "[Filters](/docs/templating-reference/filters)"
  - "include_sub_menu_sub"
sub_menu_sub:
  - "[attachment](#attachment)"
  - "[breadcrumbs](#breadcrumbs)"
  - "[column](#column)"
  - "[content_type](#content_type)"
  - "[element](#element)"
#  - "[form_message](#form_message)"
  - "[post](#post)"
  - "[request](#request)"
  - "[row](#row)"
  - "[section](#section)"
  - "[site](#site)"
---

Objects contain attributes that you can call in theme files. These attributes are mostly set by you ([content fields](/docs/content-fields)), and filled with a value by the user. To call the object's attribute, (E.g. a `post`'s `title`) you call it like a variable (wrapped in `{% raw %}{{{% endraw %}` and `{% raw %}}}{% endraw %}`).

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ post.title }}{% endraw %}
```
<p class='no-margin'>Output:</p>
```text
This is a great post!
```

In the list below you'll find documentation on the object's default attributes. But after adding a [content field](/docs/content-fields), the resulting attributes are called in the same way.

___

## attachment

The attachment object is returned when an attribute of a [media field](/docs/content-fields#media-field) is called. E.g. `{% raw %}{{ post.featured_image }}{% endraw %}` (when featured_image is a media field) returns an attachment object.

#### attachment.crop

Returns the crop values of the attachment if it's an image. The values are: `left, top, width, height`. By default the left and top are set to 0, and width and height to 100% of the image size, i.e. no crop. The attachment's crop values can be changed by [enabling inline crop in the `img_tag` filter](/docs/templating-reference/filters#inline-cropping).

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ attachment.crop }}{% endraw %}
```
<p class='no-margin'>Output (no crop):</p>
```text
0,0,450,360
```

<p class='no-margin'>Output (horizontal crop):</p>
```text
0,100,450,200
```

<p class='no-margin'>Output (vertical crop):</p>
```text
120,0,300,360
```

<p class='no-margin'>You can use the crop values in the <a href="/docs/templating-reference/filters#img_url"><code>img_url</code> filter</a> like this:</p>
```liquid
{% raw %}{{ attachment | img_url: 600, crop: attachment.crop }}{% endraw %}
```

#### attachment.src

Returns the original url of the attachment.
<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ post.featured_image.src }}{% endraw %}
```
<p class='no-margin'>Output:</p>
```text
https://plate-attachments.s3.amazonaws.com/images/12ab34cd56/featured-image-path.png
```

#### attachment.meta

Returns an object with the attachment's meta information, i.e. file mime type, file size, image dimensions if attachment is an image, etc.

<p class='no-margin'>Input:</p>
```liquid
{%- raw -%}
{{ attachment.meta }}
{{ attachment.meta.is_image }}
{{ attachment.meta.file_size }}
{{ attachment.meta.height }} x {{ attachment.meta.width }}
{% endraw %}
```
<p class='no-margin'>Output:</p>
```text
{"mime_type" => "image/jpeg", "file_size" => 12345, "ext" => "jpeg", "format" => "jpg"...
true
12345
450 x 360
```

The meta object has the following attributes for all files:
- `mime_type`
- `file_size`
- `ext` (file extension)

When the attachment is an image, it has the following attributes as well:
- `format` (image type: jpg, png, etc)
- `width`
- `height`
- `aspect_ratio`
- `landscape` (returns true when image is in landscape)

#### attachment.file_name

Returns the file's name, the part of the `src` url that represents the file.

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ post.featured_image.file_name }}{% endraw %}
```
<p class='no-margin'>Output:</p>
```text
featured-image-path.png
```

___

## breadcrumbs

Breadcrumbs allows you to iterate through the Post tree structure, from root up to the current post. It can help the site's visitor to navigate 'up' from the current post in the site. The breadcrumbs object is an array filled with objects representing each post 'above' the current post, including the current post. Each object in the breadcrumbs array contains a `title` and a `url` attribute.

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{% for breadcrumb in breadcrumbs %}
  <a href="{{breadcrumb.url}}">{{breadcrumb.title}}</a>
  {% unless forloop.last %} | {% endunless %}
{% endfor %}{% endraw %}
```

<p class='no-margin'>Output:</p>
```html
<a href="/">Home</a> |
<a href="/blogposts">Blogposts</a> |
<a href="/blogposts/news-message">News Message</a>
```
___

## column
The column object is accessible in the `columns/_column.plate` theme file, if it's rendered by the `{% raw %}{% render_content %}{% endraw %}` tag inside the `{% raw %}{% content_for row %}{% endraw %}` block. Read more on how `content_for` works [here](/docs/templating-reference/tags#content_for).

#### column.elements
Returns array of elements that have the column object as parent.
```liquid
{% raw %}{{ column.elements }}{% endraw %}
```

#### column.viewport_options
Returns an object with the column's viewport options. De available options are:

- `avg_image_width`: returns the column's average image width for every viewport, or for a specific viewport.

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ column.viewport_options.avg_image_width }}{% endraw %}
```
<p class='no-margin'>Output:</p>
```text
[360, 354, 466, 570]
```

<p class='no-margin'>Input (call for md viewport):</p>
```liquid
{%- raw -%}
{{ column.viewport_options.xs.avg_image_width }}
{{ column.viewport_options.md.avg_image_width }}
{% endraw %}
```
<p class='no-margin'>Output:</p>
```text
360
466
```

If the viewport breakpoint is `< 768px` it is assumed the viewport is intended for mobile devices. In this case  `avg_image_width` returns `360`, since most mobile devices are not wider than `360px`.

___

## content_type
The type object is accessible for Plate objects that have [content types](/docs/content-types), `element` and `post`.

#### content_type.name
Returns the name of the content type.

```liquid
{% raw %}{{ project.content_type.name }}{% endraw %}
```
```text
project
```

#### content_type.title
Returns the title of the content type.

```liquid
{% raw %}{{ social_media_button.content_type.title }}{% endraw %}
```
```text
Social Media Button
```

___

## element
The element object is accessible in the `elements/_element.plate` theme file, if it's rendered by the `{% raw %}{% render_content %}{% endraw %}` tag inside the `{% raw %}{% content_for column %}{% endraw %}` block. Read more on how `content_for` works [here](/docs/templating-reference/tags#content_for).

The `elements/_element.plate` usually calls the `{% raw %}{% content_for element %}{% endraw %}` block, which renders the `:plural_element_type_name/_singular_element_type.plate` theme file, with access to the same element object. However, in this case calling the singular [content type](/docs/content-types) name returns the element object.

So,  
calling `{% raw %}{{ element }}{% endraw %}` in `elements/_element.plate` returns the element object, and  
calling `{% raw %}{{ social_media_button }}{% endraw %}` in `social_media_buttons/_social_media_button.plate` returns the same element object.

#### element.content_type
Returns [content_ype](#content_type) object.

<!-- ___

## form_message -->

___

## post

Calling the post object returns the current post. Calling the post's singular [content type](/docs/content-types) name (E.g. 'category') also returns the post object. So both `{% raw %}{{ post }}{% endraw %}` and `{% raw %}{{ category }}{% endraw %}` return the same post in this case.

#### post.sections
Returns array of sections that have the post object as parent.
```liquid
{% raw %}{{ post.sections }}{% endraw %}
```

#### post.title
Returns post title.

#### post.slug
Returns post slug, the part of the URL that identifies the post.

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ post.slug }}{% endraw %}
```
<p class='no-margin'>Output:</p>
```text
this-is-a-great-post
```

#### post.published_at
The post's publish date and time.

#### post.url
The post url.

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ category.url }}{% endraw %}
```
<p class='no-margin'>Output:</p>
```text
/categories/mighty-fine-category
```

#### post.seo_title
Returns post SEO title.

#### post.seo_description
Returns post SEO description.

#### post.content_type
Returns [content_type](#content_type) object.

#### post.parent
Returns parent, if there is a parent set in the Post settings.

#### post.translations
Returns an array of translations of the Post. Can be empty.

___

## request
The request object has attributes of the current state of the web page.

#### request.fullpath
Returns full path, include query string.

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ request.fullpath }}{% endraw %}
```
<p class='no-margin'>Output:</p>
```text
/this/is-a/path?full=1
```

#### request.path
Returns only path, without query string.

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ request.path }}{% endraw %}
```
<p class='no-margin'>Output:</p>
```text
/this/is-a/path
```

#### request.query
Returns query string. Everything after '?'.

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ request.query }}{% endraw %}
```
<p class='no-margin'>Output:</p>
```text
full=1&page=5
```

#### request.query_object
Converts the query string into an object

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ request.query_object }}{% endraw %}
```
<p class='no-margin'>Output:</p>
```text
{"full" => "1", "page" => "5"}
```

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ request.query_object.page }}{% endraw %}
```
<p class='no-margin'>Output:</p>
```text
5
```

#### request.url
Returns the full current url.

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ request.url }}{% endraw %}
```
<p class='no-margin'>Output:</p>
```text
https://www.my-plate-site.com/this/is-a/path?full=1
```

#### request.flash
Contains browser flash messages like form errors.

<p class='no-margin'>Input:</p>
```liquid
{%- raw -%}
{{ request.flash.alert }}
{% for error_msg in request.flash.errors %}
  - {{ error_msg }}
{% endfor %}
{% endraw %}
```
<p class='no-margin'>Output:</p>
```text
Something went wrong while sending the message.
- Name is required
- Email is invalid
```

___

## row
The row object is accessible in the `rows/_row.plate` theme file, if it's rendered by the `{% raw %}{% render_content %}{% endraw %}` tag inside the `{% raw %}{% content_for section %}{% endraw %}` block. Read more on how `content_for` works [here](/docs/templating-reference/tags#content_for).

#### row.columns
Returns array of columns that have the row object as parent.
```liquid
{% raw %}{{ row.columns }}{% endraw %}
```

___

## section
The section object is accessible in the `sections/_section.plate` theme file, if it's rendered by the `{% raw %}{% render_content %}{% endraw %}` tag inside the `{% raw %}{% content_for post %}{% endraw %}` block. Read more on how `content_for` works [here](/docs/templating-reference/tags#content_for).

#### section.rows
Returns array of rows that have the section object as parent.
```liquid
{% raw %}{{ section.rows }}{% endraw %}
```

#### section.name
Returns the section name

___

## site
The site object is accessible everywhere. The site object has the following default attributes, but is also extendible by adding [content fields](/docs/content-fields).

#### site.name
Returns the site name

#### site.domain
Returns the site's primary full domain. E.g. www.my-plate-site.com.

#### site.:plural_post_type_name
Returns all posts (objects with the specified [post type](/docs/content-types#layoutable-posts-post-types)). E.g. `{% raw %}{{ site.pages }}{% endraw %}` returns all posts with the content type 'page'. Adding `_index` returns the index post (the post with the index template). E.g. `{% raw %}{{ site.pages_index }}{% endraw %}`.

#### site.languages
Returns an array of objects representing the available languages for the site. 

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ site.languages }}{% endraw %}
```
<p class='no-margin'>Output:</p>
```text
[
  { "shortcode" => "nl", "name" => "Dutch, "url" => "/dutch-url" },
  { "shortcode" => "en", "name" => "English, "url" => "/en/english-url" },
  { "shortcode" => "de", "name" => "German, "url" => "/de/german-url" }
]
```

The url attribute returns the url of the translation for the Post you are on. If there is no translation found, the root url for the language is returned. E.g. '/en' for English, '/fr' for French, and so on.


<p class='no-margin'>Input:</p>
```liquid
{% raw %}
{% for language in site.languages %}
  <a href="{{ language.url }}">{{ language.name }}</a>
{% endfor %}
{% endraw %}
```
<p class='no-margin'>Output:</p>
```html
<a href="/dutch-url">Dutch</a>
<a href="/en/english-url">English</a>
<a href="/de">German</a> <!-- uses root german url if no translation is found !>

```
