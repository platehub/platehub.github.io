---
layout: docs
title: Getting Started
page_url: /docs/getting-started
menu_item: true
id: "getting-started"
sub_menu:
  - "[Nested Layout Structure](#the-plate-nested-layout-structure)"
  - "[Plate themes](#plate-themes)"
order: 2
---

Plate is a frontend-based Content Management System (CMS) that offers clean simplicity in terms of content editing; the user does not have to manage his content in a backend, but edits it inline. That is what makes Plate truly WYSIWYG.

## The Plate Nested Layout Structure

The layout of a post in Plate is built out of the following nested layout components.

`Post` > `Section` > `Row` > `Column` > `Content Element`

The dragging/dropping of content elements, and resizing plus changing the order of sections, rows and columns gives the user ultimate freedom to set up the posts layout as he sees fit.

![Plate content scheme](/assets/img/getting-started--content-schema.png)

## Plate themes

Every Plate site uses a theme. Themes are made out of plain HTML/CSS/JS, and a templating layer: [Liquid](https://shopify.github.io/liquid/), extended with Plate specific functionality.

### How to create a theme

You can create an empty theme by going to your [partner dashboard](https://www.startwithplate.com/dashboard), and clicking on 'Themes' in the sidebar menu. Next click on 'Create New Theme'. To download the theme files after creating it, click on 'Download Theme'. To continue working with your theme, check out [Themes & Theme files](/docs/theme-files).

<img src="/assets/img/getting-started--themes-1.png" width="600"><img src="/assets/img/getting-started--themes-2.png" width="600">

### What happens with your theme when it is picked?
When a user picks your theme, a site gets created with not only the theme files, but also the preview content and content types of your preview site. So make sure you keep your preview site just a preview site.

A couple of tips to create a preview site:
- Use [Lorem Ipsum](https://lipsum.com/) as a placeholder for text content
- Use stock images as a placeholder for images
- Make sure to not include any references to existing companies or organizations in content fields, titles, etc.
- If you are creating a theme for a specific client, still follow these tips. You never know if you can use this theme again in the future, and it's hard to remove all references to your client afterwards.
