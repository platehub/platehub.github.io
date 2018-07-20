---
layout: docs
title: Tags
page_url: /docs/templating-reference/tags
id: "templating-reference"
sub_menu:
  - "[Liquid](/docs/templating-reference#liquid)"
  - "include_sub_menu_sub"
  - "[Filters](/docs/templating-reference/filters)"
  - "[Objects](/docs/templating-reference/objects)"
sub_menu_sub:
  - "[content_for](#content_for)"
  - "[edit_text_inline](#edit_text_inline)"
  - "[form](#form)"
  - "[http_request](#http_request)"
  - "[include](#include)"
  - "[layout](#layout)"
  - "[paginate](#paginate)"
  - "[register_form_field](#register_form_field)"
  - "[tray](#tray)"
---

## form
Renders an HTML form that sends out an email to the passed email address, and saves the message to the database, so the user can find it under 'Messages' in the site dashboard.

Accepts the following arguments:

`for`  
the Plate object that represents the form. This is usually an object with the default 'contact_form' content type. (Not required when called in theme file for [default contact_form content type](/docs/content-types#default-content-types))

`to`  
the email addres where the message is sent. (Required)

`error_msg`  
The error message that is used in the '[request](/docs/templating-reference/objects#request)' object (`alert` attribute) when the form is invalid and doesn't get sent. (Not required, default: 'Something went wrong while sending the message.')

`success_msg`  
same as `error_msg`, but for the message when the form does send ([request](/docs/templating-reference/objects#request) attribute: `notice`). (Not required, default: 'Thank you for your message. We will reply as soon as possible.')

`success_url`  
The url where the user is redirected to after a successful form submission. (Not required, by default the user gets redirected to the page where the submitted form was located)

<p class='no-margin'>Input:</p>
```liquid
{%- raw -%}
{% form for: form, to: form.email, success_url: form.success_page_link %}
  {% for field in form.field_lines %}
    {% include field %}
  {% endfor %}
  <div>
    <input type="submit" >
  </div>
{% endform %}
{% endraw %}
```

<p class='no-margin'>Output:</p>
```html
<form action="/form_messages" method="post" accept-charset="utf-8">
  <!-- Fields -->
  <div><input type="submit" value="Send"></div>
</form>
```

Every other attribute that you pass will be parsed as HTML attribute in the HTML form-tag.

<p class='no-margin'>Input:</p>
```liquid
{%- raw -%}
{% form class: "contact-form" %}
{% endraw %}
```

<p class='no-margin'>Output:</p>
```html
<form action="/form_messages" method="post" accept-charset="utf-8" class="contact-form">
  <!-- Fields -->
</form>
```

___

## content_for
Content renderer for objects inside the Plate [Nested Layout Structure](/docs/getting-started#the-plate-nested-layout-structure): `Post`, `Section`, `Row`, `Column` and `Content Element`. This not only renders the content, but also makes sure the content is editable for the user in the site's edit mode, and adds HTML attributes for positioning so the content shows in the right place.

<p class='no-margin'>Input:</p>
```liquid
{%- raw -%}
{% content_for post %}
  {% render_content %}
{% endcontent_for %}
{% endraw %}
```

<p class='no-margin'>Output:</p>
```html
<div data-id="post_6734" class="plate--page-content-wrapper">
  <!-- Content for post -->
</div>
```

You can add custom HTML attributes to extend the HTML container with. If you add `disable_handles: true`, the content won't show editing handles in edit mode, so the user is kept from editing the content.

<p class='no-margin'>Input:</p>
```liquid
{%- raw -%}
{% content_for post, class: "test-class", data_test_data: "data-test-value", disable_handles: true %}
  {% render_content %}
{% endcontent_for %}
{% endraw %}
```

<p class='no-margin'>Output:</p>
```html
<div data-id="post_6734" class="plate--page-content-wrapper test-class" data-test-data="data-test-value"> <!-- Handles disabled -->
  <!-- Content for post -->
</div>
```

You can also add custom HTML attributes to the `render_content` tag inside the `content_for` block. This generates a div within the outer container, containing the content. This especially comes in handy for sections (which usually are full page width), that have a container div inside (that conforms to the [Plate responsive grid system](/docs/getting-started#the-plate-grid-system)).

<p class='no-margin'>Input:</p>
```liquid
{%- raw -%}
{% content_for section %}
  {% render_content class: "test-class" %}
{% endcontent_for %}
{% endraw %}
```

<p class='no-margin'>Output:</p>
```html
<div data-id="section_44341" class="plate--section"> <!-- fullwidth -->
  <div class="plate--container test-class"> <!-- grid -->
    <!-- Content -->
  </div>
</div>
```

___

## edit_text_inline
Renders regular HTML of a [text area](/docs/content-fields#text-area) value, but with an inline WYSIWYG html editor in the site's edit mode. Accepts the content field's name as an attribute.

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{% edit_text_inline "body" %}{% endraw %}
```

<p class='no-margin'>Output (in edit mode):</p>
```html
<div data-plate-inline-text-editable>
  <!-- WYSIWYG editable content -->
</div>
```

___

## http_request
Makes a request to the passed target and fetches the body. Useful for API connections. HTTP Headers and params can be set for the request. Inside the block the response is accessible as `response` variable.

Accepts the following arguments:

`target`  
The target for the HTTP request. E.g. https://www.apiserver.com/api/v1/api_endpoint

`params`  
Multiple key/value attributes that serve as url parameters for GET requests, and request body for POST, PUT and DELETE requests.

`headers`  
Multiple key/value attributes that serve as request headers. The keys must be downcased and with underscores, but get converted to camelcased with dashes. E.g. `{x_my_header_key: "header_val"}` becomes the header: `X-My-Header-Key: header_val`.

`method`  
Sets the request method: GET, POST, PUT or DELETE. Defaults to GET.

<p class='no-margin'>Input:</p>
```liquid
{%- raw -%}
{% http_request target: 'https://www.apiserver.com/api/v1/api_endpoint', method: 'get', params: { param_key_1: 'param_val_1' }, headers: { authentication: 'Token token=ksuhf3ygjyw3fskuddh3uhr4hwr556h6j6eda' } %}

{{ response }}
{{ response | to_json }}

{% for response_item in response %}
  {{ response_item.result_key }}
{% endfor %}

{{ params }}

{% endhttp_request %}
{% endraw %}
```

<p class='no-margin'>Output:</p>
```text
[{"result_key" => "result value 1"}, {"result_key" => "result value 2"}]
[{"result_key": "result value 1"}, {"result_key": "result value 2"}]

result value 1
result value 2

{'param_key_1' => 'param_val_1'}
```

Note that the arguments `params` and `headers` have nested key/value pair arguments. These need to be surrounded by curly braces (`{ ... }`).

The following variables are available inside the block:

`response`  
The response of the request. If the response was JSON, the data converts to a Liquid [object](/docs/templating-reference/objects). You can use the [to_json](/docs/templating-reference/filters#to_json) filter to turn it back to json.

`params`  
The passed params as a Liquid [object](/docs/templating-reference/objects).

`method`  
The request method. GET, POST, PUT or DELETE

`target`  
The full target url, so including passed params. E.g. https://www.apiserver.com/api/v1/api_endpoint?param_key_1=param_val_1

___

## include
Overrides Liquid's include tag. Inserts a snippet of code from another file. The file must be a [partial](/docs/them-files#partial).

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{% include "field_lines/sender_field", field_type: field_line.type %}{% endraw %}
```

Note that you don't have to include the file's extension `.plate`. The theme file's path is `field_lines/_sender_field.plate`. You can also pass named variables to the included file by adding `key: value` arguments, each separated by a comma. In the example a variable `field_type` is available in the included theme file.

You can also pass a Plate object instead of a string for a location.

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{% include field %}{% endraw %}
```

Assuming that the variable `field` is an object with the [content type](/docs/content-types) 'field_line(s)', this is the equivalent of:

```liquid
{% raw %}{% include "field_lines/field_line", field_line: field_line %}{% endraw %}
```

___

## layout
Sets the [theme layout](/docs/theme-files#theme-layouts). Whatever you pass must be a layout theme file in the `layouts` folder.

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{% layout "some_layout" %}{% endraw %}
```

This renders the `layouts/some_layout.plate` theme layout file.

Using this tag is not required, the default layout is `theme` (`layouts/theme.plate`). If you do not want any layout, use:
```liquid
{% raw %}{% layout false %}{% endraw %}
```

**Don't forget to add the `{% raw %}{% include "content_for_head" %}{% endraw %}` tag in your theme layout file's `<head>`.**

___

## paginate
Allows to paginate an array of objects. Inside the `paginate` tag a `paginate` object will be available.

Accepts the following arguments:

`object_array`  
an Array of objects, for example `site.pages`. (Required)

`per_page`  
amount of items shown per page. (Not required, default: 10)

`window_size`  
how many pages should be visible from the current page. E.g. if the current page is 5, and window size is 2, the pages available will be 3, 4, 5, 6, 7. Note that the first and the last page are always visible. (Not required, default: 3)

`pagination_name`  
The name of the url parameter that is used to determine the current pagination number. This allows to paginate multiple arrays of objects. (Not required, default: "page")

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{% paginate ... pagination_name: "turn" %}{% endraw %}
```

<p class='no-margin'>Output:</p>
```text
/the-paginated-content?turn=4 # 4th pagination page
```

<!-- `next_text`  
the title for the next page button. (Not required, default: &rsaquo;)

`previous_text`  
the title for the previous page button. (Not required, default: &lsaquo;) -->

The following code will paginate all projects of the site. On each page, 2 projects will be available.

<p class='no-margin'>Input:</p>
```liquid
{%- raw -%}
{% paginate object_array: site.projects, per_page: 2, window_size: 2 %}
  <h1>Current page: {{paginate.current_page}}</h1>
  {% for project in paginate.items %}
    <h3>{{project.title}}</h3>
  {% endfor %}
  <a href="{{paginate.previous.url}}">&laquo; Prev</a>
  <ul>
    {% for pagination_page in paginate.pages %}
      <li><a href="{{pagination_page.url}}">{{pagination_page.index}}</a></li>
    {% endfor %}
  </ul>
  <a href="{{paginate.next.url}}">Next &raquo;</a>
{% endpaginate %}
{% endraw %}
```

### `paginate` object
Inside the `paginate` block, a `paginate` object is available with the following attributes.
- `current_page`: the current page, a number.
- `items`: an array of items in the slice of the input `object_array` corresponding to the current page.
- `page_count`: the number of pages.
- `pages`: an array of objects representing the pagination pages. All objects in `pages` have the attributes  
`url` (returning the url of a pagination page, e.g. /this-url?page=3),  
`index` (the pagination page's index number),  
`is_link` (whether the pagination page is a link or not). `is_link` returns false at the current pagination page or if the page falls outside the `window_size` (in which case it's merely a '...').
- `next`: represents the next pagination page. Also has `url`, `index` and `is_link` attributes.
- `previous`: represents the previous pagination page. Also has `url`, `index` and `is_link` attributes.

___

## register_form_field

Registers a form field by name, in Plate. This ensures that when a form is submitted
Plate expects this form, and possibly validates the field. The tag can only be used
 within a [form](/docs/templating-reference/tags#form) block. It accepts the name of
 the field as an input (for example "Naam" or "Email"), but also whether this field
 should be validated (with the `required` argument).

 Accepts the following arguments (excluding the first argument, which is the name):

 `required`  
 whether the registered field should be validated on presence. (Default: `false`)

 <p class='no-margin'>Example:</p>
 ```liquid
 {% raw %}{% register_form_field field_line.name, required: field_line.required %}{% endraw %}
 ```

Note that this tag does not directly output anything in the HTML. In the background
 this tag adds some information to a hash that is generated by the [form](/docs/templating-reference/tags#form) tag.

The generate the html, use the [form_input_name](/docs/templating-reference/filters#form_input_name) and [html_input](/docs/templating-reference/filters#html_input) filters.

<p class='no-margin'>Input:</p>
```liquid
{%- raw -%}
{{ "Name" | form_input_name | html_input: "checkbox" }}
{% endraw %}
```

<p class='no-margin'>Output:</p>
```html
<input type="checkbox" name="form_message[content][name]">
```
 
___

## tray
Renders a [tray](/docs/theme-files#trays).

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{% tray "footer" %}{% endraw %}
```

Includes `trays/_footer.plate`. You can access the tray object inside the theme file by calling the name of the tray as a variable, in this case `footer`. Trays behave the same like sections, so your tray theme file would look like this:

```liquid
{%- raw -%}
{% content_for footer %}
  {% render_content %}
{% endcontent_for %}
{% endraw %}
```
