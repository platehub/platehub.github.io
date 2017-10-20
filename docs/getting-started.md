---
layout: docs
title: Getting Started
page_url: /docs/getting-started
menu_item: true
id: "getting-started"
sub_menu:
  - "[Nested Layout Structure](#the-plate-nested-layout-structure)"
  - "[Grid system](#the-plate-grid-system)"
  - "[Plate themes](#plate-themes)"
  - "[Creating a Site](#creating-a-site)"
  - "[Uploading your theme](#uploading-your-theme)"
order: 2
---

Plate is a frontend-based Content Management System (CMS) that offers clean simplicity in terms of content editing; the user does not have to manage his content in a backend, but edits it inline. That is what makes Plate truly WYSIWYG.

## The Plate Nested Layout Structure

The layout of a post in Plate is built out of the following nested layout components.

`Post` > `Section` > `Row` > `Column` > `Content Element`

The dragging/dropping of content elements, and resizing plus changing the order of sections, rows and columns gives the user ultimate freedom to set up the posts layout as he sees fit.

![Plate content scheme](/assets/img/getting-started--content-schema.png)

## The Plate Grid system

When you add the `{% raw %}{% include "content_for_head" %}{% endraw %}` Plate also loads a grid system that is utilized by the nested layout structure to build the layout. You can use this grid system in your own theme. The grid works much like [Bootstrap's grid](https://getbootstrap.com/docs/3.3/css/#grid).

<p class="no-margin">Example:</p>
```html
<div class="plate--container">
  <div class="plate--row">
    <div class="plate--column sm-4">
      ...
    </div>
    <div class="plate--column sm-4">
      ...
    </div>
    <div class="plate--column sm-4">
      ...
    </div>
  </div>
</div>
```

The default responsive grid sizes are:
- `xs` (max 767px)
- `sm` (max 991px)
- `md` (max 1200px)
- `lg` (> 1200px)

The `plate--container` div has the same max width as the current grid size. `plate--container-fluid` always has 100% width.

The maximum amount of column units inside `plate--row` is 12.

`plate--column` has a gutter width of 30px (15px on each side). Columns are initially horizontally aligned, but break to vertically if the screen size is smaller than the named grid-size. E.g. `sm-4` breaks off to vertical aligning if the screen size is smaller than 992px (`sm` is max 991px).

Of course you are not required to use Plate's grid system. If you like another grid system better, you are free to use that one.

## Plate themes

Every Plate site uses a theme. Themes are made out of plain HTML/CSS/JS, and a templating layer: [Liquid](https://shopify.github.io/liquid/), extended with [Plate specific functionality](/docs/templating-reference/).

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

## Creating a site
As a partner you can create sites for your client. To do this follow these steps:

- In the partner dashboard, go to 'All sites'
- Click on the floating Add button.

<img src="/assets/img/getting-started--creating-a-site-1.png" width="600">

- Fill out the neccessary fields: site name, domain and a theme.
- Fill out name and contact email of your client's organization, or pick it from the dropdown if it already exists.

<img src="/assets/img/getting-started--creating-a-site-2.png" width="600">


### A site's theme
The chosen theme gets copied to the site, so you or the site's end user can change it without changing the source theme. To download a site's theme, go to the Site dashboard, and click on 'Site settings'. you can download the site's theme by clicking on the 'Theme' tab.


## Uploading your theme
After [creating and downloading your theme](#how-to-create-a-theme) (you can also [download a specific site's theme](#a-sites-theme)) you want to add changes to it and upload these changes. Plate's dev team created a deployment tool to make sure this process goes with as much ease as possible. You only have to turn on the listener, and go edit your theme files. The theme tool does the rest.

Read more about the [Plate Theme Tool](/docs/theme-tool).
