---
layout: docs
title: Themes & Theme files
page_url: /docs/theme-files
menu_item: true
id: "theme-files"
sub_menu:
  - "[Inline or 'Layoutable'](#inline-or-layoutable)"
  - "[Variables](#variables)"
  - "[Theme Layouts](#theme-layouts)"
  - "[Trays](#trays)"
  - "[Theme Templates](#theme-templates)"
  - "[Theme file paths](#theme-file-paths)"
  - "[Default Theme Files](/docs/default-theme-files)"
order: 6
---

Plate themes consist of theme files, which are only HTML files with a [templating engine](/docs/templating-reference) on top of it (extension `.plate`), and assets (CSS, JS, images, fonts, etc).

## Inline or 'Layoutable'

#### What is inline content?
Inline content is everything that falls within the [Plate Nested Layout component Structure](/docs/getting-started#the-plate-nested-layout-structure), from the Post level down: Sections, Rows, Columns, Elements.

#### Theme files for inline content components (Sections, Rows, Columns, Elements)
Because these layout components are inline, the theme files need to be seen as snippets of code. Thus they are handled as so-called [partials](#partials). That means the file name of these theme files must have a leading underscore.

E.g.  
`sections/_section.plate`  
`rows/_row.plate`

#### What is layoutable content?
Layoutable content have their own url, like pages, categories and news articles. This is the `Post` layout component. This content is called 'layoutable' because they inherit from a [theme layout](#theme-layouts) (default: `theme.plate`).

#### Theme files for layoutable content (Posts)
Layoutable content theme files are not partials, so they do not have a leading underscore. There must be two theme files in the designated folder: `show.plate` and `index.plate`, one for each [post type template](/docs/content-types#layoutable-posts-post-types).

## Variables
Aside from the variables you can set yourself (with the [assign tag](https://shopify.github.io/liquid/tags/variable/) for example), there are some default variables present in the theme files.

`site`  
The [site object](/docs/templating-reference/objects#site) for the current site.

`post`  
The current post ([layoutable content](#what-is-layoutable-content)). Also available by calling the singular name of the [content type](/docs/content-types). E.g. `page` or `category`.

`request`  
The [request object](/docs/templating-reference/objects#request).

Every time the [content_for](/docs/templating-reference/tags#content_for) tag is called for a Plate object, the name becomes a variable. If the object's content type is that of an element, the content type singular id is also available as a variable. E.g. `element` and `contact_form`.

## Theme Layouts
Every [layoutable content](#what-is-layoutable-content) theme file inherits from the theme Layout. This is a theme file where you put the `<head>` HTML tags, and all other stuff that needs to be shown on every web page of your site. The default theme layout is `theme` (theme file: `theme.plate`). You invoke the rest of the Plate content (scaffolding the [Plate layout structure](/docs/getting-started#the-plate-nested-layout-structure)) by calling the `{% raw %}{{ content_for_layout }}{% endraw %}` variable.

The layout theme files must always be placed in the `layouts` folder in the root of your theme. E.g. `layouts/theme.plate`.

You are **required** to include the following tag in the theme layout file's `<head>`:  
`{% raw %}{% include "content_for_head" %}{% endraw %}`  
This adds all Plate dependencies, like all assets used when the site is in edit mode.

**Heads up!** The Theme Layout is something else entirely than the [Plate Nested Layout structure](/docs/getting-started#the-plate-nested-layout-structure)!

## Trays
Trays are the same as sections, and have the same nested layout components (Rows, and so on). The main difference from sections is that trays do not fall inside the Nested Layout Structure. Trays only belong to the site. This way you can add a nested Layout structure from the section level down on any place you want, not just inside a Post context. This is useful for footers and headers for example. You want to have the nested layout structure here, but it doesn't necessarily fall under a post. You can render a tray by using the [tray tag](/docs/templating-reference/tags#tray).

#### Tray theme files
To use a tray, you need to create a (inline, so a [partial](#partials)) theme file for it inside the `trays` folder. The name of the theme file is the name of the tray. For example, creating the file `trays/_footer.plate` opens up the 'Footer' tray inside the [content types](/docs/content-types) dashboard, so you can add [content fields](/docs/content-fields) to it.

## Theme Templates
Certain [inline content types](#what-is-inline-content), like sections, can have different versions. For example, a section can have a version with a slider in it, and a version with just content and a top padding of 60. These different versions are called templates. You can define templates by adding it in the theme files's filename, separated by a dot. Like this:

`sections/_section.slider.plate`  
`sections/_section.background_image.plate`  

The names separated by the dot, in these cases 'slider' and 'background_image' are the template names. They pop up when adding [content fields](/content-fields) to the content type. When editing/creating a section you can choose a template, and the corresponding content fields will appear automatically to the user.
<img src="/assets/img/theme-files--templates-1.png">

As you can see there is also a 'Default section' template. This template corresponds to the `_sections/_section.plate` file name, so without a dot-separated template name. It's always a good idea to keep the 'default' template around. So in the case of the screenshot, there are two section theme files: `sections/_section.plate` and `sections/_section.cta.plate`.

**Heads up!** Theme templates only work for sections, for now.

## Theme file paths
Theme file paths for [Plate layout components](/docs/getting-started#the-plate-nested-layout-structure) are structured as follows: `:plural_name/:theme_file_name.:ext`. In the case of Inline Layout components, `:theme_file_name` is the singular name of the layout component or content type.

E.g.  
`sections/_section.plate`  
`posts/show.plate`

#### Content Types
Theme files for content types are structured the same way, but in this case the plural and singular names are set by you, when [creating content types](/docs/content-types#creating-content-types).

E.g.  
`pages/show.plate`  
`categories/show.plate`  
`colored_buttons/_colored_button.plate`  
`paragraphs/_paragraph.plate`

#### Assets
Assets (CSS, JS) must always be placed in the `assets` folder in the root of your theme. After that you can nest folders as deep as you want. These paths are all valid:

`assets/style.css`  
`assets/css/style.css`  
`assets/js/libs/my_js_lib.js`

#### Partials
Partials are snippets of code that can be included in other theme files, with the `include` tag. Partials are useful to keep your code clean and prevent unnecessary code repetition. Unlike some other theme files, you are not limited to where to put partials, except the `assets` folder. So the following paths are all valid:

`/_some_partial.plate`  
`paragraphs/_some_partial.plate`  
`theme/_some_partial.plate`  
