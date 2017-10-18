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
  - "[contact_form](#contact_form)"
  - "[content_for](#content_for)"
  - "[edit_text_inline](#edit_text_inline)"
  - "[form_field](#form_field)"
  - "[form_label](#form_label)"
  - "[form_sender_field](#form_sender_field)"
  - "[include](#include)"
  - "[layout](#layout)"
  - "[tray](#tray)"
---

## contact_form
Renders an HTML contact form that sends out an email to the passed email address, and saves the message to the database, so the user can find it under 'Messages' in the site dashboard.

Accepts the following arguments:

`for`  
the Plate object that represents the form. This is usually an object with the default 'contact_form' content type. (Not required when called in theme file for [default contact_form content type](/docs/content-types#default-content-types))

`to`  
the email addres where the message is sent. (Required)

`fields`  
array of objects that represent the [fields](#form_field). At least the `required_attr` value must be a valid attribute to call on the field. (Required)

`required_attr`  
The attribute that is called on the fields to determine whether that field is required or not. Calling `required_attr` on the fields must return `true` or `false`. (Required)

`error_msg`  
The error message that is used in the '[request](/docs/templating-reference/objects#request)' object (`alert` attribute) when the form is invalid and doesn't get sent. (Not requird, default: 'Something went wrong while sending the message.')

`success_msg`  
same as `error_msg`, but for the message when the form does send (request attribute: `notice`). (Not required, default: 'Thank you for your message. We will reply as soon as possible.')

<p class='no-margin'>Input:</p>
```liquid
{%- raw -%}
{% contact_form to: contact_form.email, fields: contact_form.field_lines, required_attr: "required" %}
  {% for field in fields %}
    {% include field %}
  {% endfor %}
  <div><input type="submit" value="Send"></div>
{% endcontact_form %}
{% endraw %}
```

<p class='no-margin'>Output:</p>
```html
<form action="/form_messages" method="post" accept-charset="utf-8">
  <!-- Fields -->
  <div><input type="submit" value="Send"></div>
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

## form_field
Input field for a form. Only works inside `contact_form` tag. The first argument is the Plate object that represents a field. The second argument is the field's attribute name that returns the input name. The third argument is the field's type, which must be one of `text`, `textarea` and `checkbox`.

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{% form_field field_line, "name", field_line.type %}{% endraw %}
```

<p class='no-margin'>Output:</p>
```html
<!-- field_line.type = "text" -->
<!-- field_line.name = "Test Field"  -->
<input type="text" name="form_message[content][test_field]" id="3864_test_field">
```

___

## form_label
Label HTML tag for a form. Only works inside `contact_form` tag. Like `form_field`, the first argument is the Plate object that represents a field. The second argument is the field's attribute name that returns the label value.

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{% form_label field_line, "name" %}{% endraw %}
```

<p class='no-margin'>Output:</p>
```html
<label for="3864_test_field">Test Field</label>
```

___

## form_sender_field
Generates form input fields, but for the sender's data. This way Plate knows what field values represent the sender's name and email. Must also be called inside the `contact_form` tag. Accepts one argument, which must be one of two values: `sender_field_name` or `sender_field_email`.

<p class='no-margin'>Input:</p>
```liquid
{% raw %}{% form_sender_field "sender_field_email" %}{% endraw %}
```

<p class='no-margin'>Output:</p>
```html
<input type="text" name="form_message[meta][sender][email]" id="1876_sender_field_email">
```

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

Using this tag is not required, the default layout is `theme` (`layouts/theme.plate`).

**Don't forget to add the `{% raw %}{% include "content_for_head" %}{% endraw %}` tag in your theme layout file's `<head>`.**

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
