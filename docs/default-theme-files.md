---
layout: docs
title: Default Theme Files
page_url: /docs/default-theme-files
id: "theme-files"
sub_menu:
  - "[Inline or 'Layoutable'](/docs/theme-files#inline-or-layoutable)"
  - "[Theme file paths](/docs/theme-files#theme-file-paths)"
  - "[Variables](/docs/theme-files#variables)"
  - "[Theme Layouts](/docs/theme-files#theme-layouts)"
  - "[Trays](/docs/theme-files#trays)"
  - "[Theme Templates](/docs/theme-files#theme-templates)"
  - "[Default Theme Files](/docs/default-theme-files)"
---
Because every Plate site must have a bare minimum of content, we defined some [default content types](/docs/content-types#default-content-types). You can find the default theme files for these content types here, plus some that are not linked to a content type.

If you do not create theme files with the same path in your own theme, these theme files are used. If you do create them, your version will override the defaults.

### `layouts/theme.plate`

```liquid
{%- raw -%}
<head>
  {% include "content_for_head" %}
</head>
<body>
  {{ content_for_layout }}
</body>
{% endraw %}
```

### `pages/index.plate`

```liquid
{%- raw -%}
{% content_for page %}
  {% render_content %}
{% endcontent_for %}
{% endraw %}
```

### `pages/show.plate`

```liquid
{%- raw -%}
{% content_for page %}
  {% render_content %}
{% endcontent_for %}
{% endraw %}
```

### `sections/_section.plate`

```liquid
{%- raw -%}
{% content_for section %}
  {% render_content %}
{% endcontent_for %}
{% endraw %}
```

### `rows/_row.plate`

```liquid
{%- raw -%}
{% content_for row %}
  {% render_content %}
{% endcontent_for %}
{% endraw %}
```

### `columns/_column.plate`

```liquid
{%- raw -%}
{% content_for column %}
  {% render_content %}
{% endcontent_for %}
{% endraw %}
```

### `elements/_element.plate`

```liquid
{%- raw -%}
{% content_for element %}
  {% render_content %}
{% endcontent_for %}
{% endraw %}
```

### `paragraphs/_paragraph.plate`

```liquid
{%- raw -%}
{% edit_text_inline "body" %}
{% endraw %}
```

### `images/_image.plate`

```liquid
{%- raw -%}
{% if image.link != "" %}
  <a href="{{ image.link }}">{{ image.image.responsive_img_urls | img_tag }}</a>
{% else %}
  {{ image.image.responsive_img_urls | img_tag }}
{% endif %}
{% endraw %}
```

### `html_codes/_html_code.plate`

```liquid
{%- raw -%}
{{ html_code.body }}
{% endraw %}
```

### `menus/_menu.plate`

```liquid
{%- raw -%}
<ul>
  {% for menu_item in menu.menu_items %}
    {% include menu_item %}
  {% endfor %}
</ul>
{% endraw %}
```

### `menu_items/_menu_item.plate`

```liquid
{%- raw -%}
<li class="{% if request.path == menu_item.link %}active{% endif %}">
  <a href="{{ menu_item.link }}">{{ menu_item.name }}</a>
  {% if menu_item.sub_menu_items.first %}
    <ul class="{{ sub_menu_class }}">
      {% for sub_menu_item in menu_item.sub_menu_items %}
        {% include sub_menu_item %}
      {% endfor %}
    </ul>
  {% endif %}
</li>
{% endraw %}
```

### `contact_forms/_contact_form.plate`

```liquid
{%- raw -%}
{% include "contact_forms/contact_form_errors" %}
{% contact_form to: contact_form.email, fields: contact_form.field_lines, required_attr: "required" %}
  {% for field in fields %}
    {% include field %}
  {% endfor %}
  <div>
    <input type="submit" value="Versturen">
  </div>
{% endcontact_form %}
{% endraw %}
```

### `contact_forms/_contact_form_errors.plate`

```liquid
{%- raw -%}
{% if request.flash.alert %}
  <p style="color:red;">
    {{ request.flash.alert }}
  </p>
  <ul style="color:red;">
    {% for error_msg in request.flash.errors %}
      <li>{{ error_msg }}</li>
    {% endfor %}
  </ul>
{% endif %}
{% endraw %}
```

### `field_lines/_field_line.plate`

```liquid
{%- raw -%}
<div>
  {% if field_line.type == "sender_field_name" or field_line.type == "sender_field_email" %}
    {% include "field_lines/sender_field", field_type: field_line.type, name: field_line.name %}
  {% else %}
    {% form_label field_line, "name" %}<br>{% form_field field_line, "name", field_line.type %}
  {% endif %}
</div>
{% endraw %}
```

### `field_lines/_sender_field.plate`

```liquid
{%- raw -%}
{% form_label field_type, name %}<br>
{% form_sender_field field_type %}
{% endraw %}
```
