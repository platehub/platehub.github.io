---
layout: docs
title: Content Types
page_url: /docs/content-types
menu_item: true
id: "content-types"
sub_menu:
  - "[About Content Types](#about-content-types)"
  - "[Creating Content Types](#creating-content-types)"
  - "[Default Content Types](#default-content-types)"
order: 3
---

Every editable content object in Plate is basically an abstract object with no atttributes or fields. You will grant the abstract object editable content by defining a content type for it and adding editable [content fields](/docs/content-fields). Plate also adds some default content fields, depending on the content type.

## About Content Types

Plate recognizes two kinds of content types:

#### Inline elements (Element types)
Editable inline elements with partials as theme files. Represented by the `Content Element` in the [Plate Nested Layout Structure](/docs/getting-started#the-plate-nested-layout-structure). E.g. images, galleries, editable texts, etc.

#### [Layoutable](/docs/theme-files#what-is-layoutable-content) posts (Post types)
Objects that are approachable via a url. E.g. pages, categories, blog posts, etc. their theme files inherit directly from a theme layout. It has two different templates: `index` and `show`. The role of `index` is that of an overview page, `show` the detail page. However, `index` is a single page too, but with the `index.plate` theme file. This way users can change the same attributes for overview pages as detail pages, like header photos etc. Layoutable content types (post types) have URL's based on their on their objects' [slugs](#slug-only-post-type).

Both content types' objects can be referenced in the reference content field.

When [creating content types](#creating-content-types) you have to provide the following data:

#### 'Title' and 'Plural title'
These are used to define the content type in the edit screens, visible for the end user while adding or editing the objects with this content type.

#### 'Name for id' and 'Plural name for id'
These are used to define the content type inside the templating engine. These have to be parameterized (downcased, underscores instead of spaces). The singular name will be the variable that calls the object, on which you can call attributes. E.g. `category.name` will return 'Cats and Dogs', because you have an object with post type 'Category', and it's name is 'Cats and Dogs'.

#### Icon name
This is the icon that is used along with the titles in the edit screens.

#### Slug (only Post type)
For Post types you have to type in the slug for each language your site is available in. The slug is the word that will be the first part of the url for the post: `/:content-type-slug/:object-slug`. For example, in the case of the post type Categories: `/categories/cats-and-dogs`. In this case, `categories` is the slug for the Categories post type, `cats-and-dogs` the slug for the post (object with post type 'Category').

A site always has a root post type (usually Page) that hides the post type's slug from the url. That means that `/` and `/page-slug` work, and Plate recognizes 'Page' as the selected Post type.

#### Example
Let's say you want to make a 'Colored Button' element content type. You'll fill out the following data:
- Title: `Colored Button`
- Plural title: `Colored Buttons`
- Name for id: `colored_button`
- Plural name for id: `colored_buttons`
- Icon: `crop_16_9`. This Material icon doesn't have anything to do with buttons, but it kinda looks like a button, so...

Now the end user can create actual Colored Button elements. How these buttons look like is up to you: you'll probably need to add [content fields](/docs/content-fields) to them, and have to create a theme file for it in your theme: `colored_buttons/_colored_button.plate`


## Creating Content Types
- Click on the Content Types menu item in the Site Dashboard
- Click on the floating Add button
- Pick a kind of content type (Element type or Post type)

<img src="/assets/img/content-types-1.png" width="800">

Fill out the necessary fields (see [About Content Types](#about-content-types) to learn more about the functions of this data).

<img src="/assets/img/content-types-2.png" width="800">

## Default Content Types

Every Plate site must have a bare minimum of content types, so there are a couple of defaults that you cannot edit or delete. You can extend them with extra custom [content fields](/docs/content-fields). The following is a list of default content types and their default content fields.

#### Paragraph
Inline editable text. Default content fields:
- Body

#### image
A single image. Default content fields:
- Image
- Link

#### Contact form
Contact form.  Default content fields:
- Target email
- Field lines (reference to default content type 'Form field')

#### Image gallery
Multiple images.  Default content fields:
- Gallery items (reference to default content type 'Gallery image')

#### HTML code
Inline HTML code.  Default content fields:
- Body

#### Menu
Inline menu.  Default content fields:
- Menu items (reference to default content type 'Menu item')

#### Post
Post type for blog posts. (post type with the name posts. Confusing, we know.) No default content fields.

#### Page
Post type for regular pages. No default content fields.
