---
layout: docs
title: Themes & Theme files
permalink: /docs/theme-files
sub_menu:
  - "[Inline or 'Layoutable'](#inline-or-layoutable)"
  - "[Theme file paths](#theme-file-paths)"
  - "[Theme Layouts](#theme-layouts)"
  - "[Trays](#trays)"
  - "[Theme Templates](#theme-templates)"
order: 5
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

## Theme Layouts
Every [layoutable content](#what-is-layoutable-content) theme file inherits from the Theme Layout. This is a theme file where you put the `<head>` HTML tags, and all other stuff that needs to be shown on every web page of your site. The default Theme layout is `theme` (theme file: `theme.plate`) and cannot be changed at this time. You invoke the rest of the Plate content (scaffolding the [Plate layout structure](/docs/getting-started#the-plate-nested-layout-structure)) by calling the `content_for_layout` variable.

The layout theme files must always be placed in the `layouts` folder in the root of your theme. E.g. `layouts/theme.plate`.

**Heads up!** The Theme Layout is something else entirely than the [Plate Nested Layout structure](/docs/getting-started#the-plate-nested-layout-structure)!

## Trays

## Theme Templates
