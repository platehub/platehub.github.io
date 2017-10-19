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
  - "[column](#column)"
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

#### attachment.src

Returns the url of the attachment.
<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ post.featured_image.src }}{% endraw %}
```
<p class='no-margin'>Output:</p>
```text
https://bucket.s3.amazonaws.com/files/featured-image-path.png
```

#### attachment.responsive_img_urls
Returns an array of responsive image sizes, one for each of the site's viewports. Works great in conjunction with the [img_tag filter](/docs/templating-reference/filters#img_tag).

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{{ post.featured_image.responsive_img_urls }}{% endraw %}
```
<p class='no-margin'>Output:</p>
```text
["https://bucket.s3.amazonaws.com/files/thumbs/path-xs.png", "https://bucket.s3.amazonaws.com/files/thumbs/path-sm.png", "htt...
```
___

## column
The column object is accessible in the `columns/_column.plate` theme file, if it's rendered by the `{% raw %}{% render_content %}{% endraw %}` tag inside the `{% raw %}{% content_for row %}{% endraw %}` block. Read more on how `content_for` works [here](/docs/templating-reference/tags#content_for).

#### column.elements
Returns array of elements that have the column object as parent.
```liquid
{% raw %}{{ column.elements }}{% endraw %}
```


___

## element
The element object is accessible in the `elements/_element.plate` theme file, if it's rendered by the `{% raw %}{% render_content %}{% endraw %}` tag inside the `{% raw %}{% content_for column %}{% endraw %}` block. Read more on how `content_for` works [here](/docs/templating-reference/tags#content_for).

The `elements/_element.plate` usually calls the `{% raw %}{% content_for element %}{% endraw %}` block, which renders the `:plural_element_type_name/_singular_element_type.plate` theme file, with access to the same element object. However, in this case calling the singular [content type](/docs/content-types) name returns the element object.

So,  
calling `{% raw %}{{ element }}{% endraw %}` in `elements/_element.plate` returns the element object, and  
calling `{% raw %}{{ social_media_button }}{% endraw %}` in `social_media_buttons/_social_media_button.plate` returns the same element object.

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
Returns post SEO title

#### post.seo_description
Returns post SEO description

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
full=1
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

#### site.:plural_post_type_name
Returns all posts (objects with the specified [post type](/docs/content-types#layoutable-posts-post-types)). E.g. `{% raw %}{{ site.pages }}{% endraw %}` returns all posts with the content type 'page'. Adding `_index` returns the index post (the post with the index template). E.g. `{% raw %}{{ site.pages_index }}{% endraw %}`.
