---
layout: docs
title: Content Types
permalink: /docs/content-types
---

# Content types

Every editable content object in Plate is basically an abstract object with no atttributes or content. The site builder grants the abstract object editable content by defining a content type for it and adding editable content fields. Plate adds some default content fields, depending on the content type.

Plate recognizes two kinds of content types:

#### - Inline element types
Editable inline elements with partials as theme files. Only addable as elements inside the `content_for` tag. E.g. images, galleries, editable texts, etc.

#### - Layoutable post types
Objects with it's own layout theme file and approachable via a url. E.g. pages, categories, blog posts, etc.

Both content types' objects can be referenced in the reference content field.
