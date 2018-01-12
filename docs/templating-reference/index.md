---
layout: docs
title: Plate Templating Reference
page_url: /docs/templating-reference
id: "templating-reference"
menu_item: true
sub_menu:
  - "[Liquid](/docs/templating-reference#liquid)"
  - "[Tags](/docs/templating-reference/tags)"
  - "[Filters](/docs/templating-reference/filters)"
  - "[Objects](/docs/templating-reference/objects)"
order: 7
---

## Liquid

Plate uses [Liquid](https://shopify.github.io/liquid/) as the templating engine, supplemented with Plate-specific tags and filters. Please go to [https://shopify.github.io/liquid/](https://shopify.github.io/liquid/) to learn more about Liquid and how it works. You can also find documentation on the default Liquid tags and filters there. The Plate-specific tags and filters are documented on this site.

Liquid consists of three categories: Tags, Filters and Objects.

## Tags
With Tags you can use some programming logic inside Liquid. E.g. to show content only under certain conditions, you'd use the `if` tag.

<p class='no-margin'>Input:</p>
```liquid
{%- raw -%}
{% if site.name == "A beautiful site" %}
  This is indeed one beautiful site!
{% endif %}
{% endraw %}
```

<p class='no-margin'>Output:</p>
```text
# This is only shown if the site's title equals 'A beautiful site'
This is indeed one beautiful site!
```

Go to the [Tags](/docs/templating-reference/tags) page to read the docs on Tags.

## Filters
Filters manipulate content that is put in. A filter functions as a little machine where you put something in, and it returns something else. Filters are separated by a pipe (`|`).

<p class='no-margin'>Input:</p>
```liquid
{%- raw -%}
{{ "A beautiful site" | reverse }}
{% endraw %}
```

<p class='no-margin'>Output:</p>
```text
etis lufituaeb A
```

Go to the [Filters](/docs/templating-reference/filters) page to read the filters docs.

## Objects
An Object represents a certain record (from the Plate database) inside Liquid. You can call attributes on an object. E.g. to get the current site's name, you'd call the attribute `name` on the object `site`:

<p class='no-margin'>Input:</p>
```liquid
{%- raw -%}
{{ site.name }}
{% endraw %}
```

<p class='no-margin'>Output:</p>
```text
A beautiful site
```

Some objects are globally available, and some only in certain theme files. Globally available objects are:
- [Site](/docs/templating-reference/objects#site)
- [Post](/docs/templating-reference/objects#post)
- [Request](/docs/templating-reference/objects#request)
- [Breadcrumbs](/docs/templating-reference/objects#breadcrumbs)

Go to the [Objects](/docs/templating-reference/objects) page to read the docs on Objects.
