---
layout: docs
title: Content Types
permalink: /docs/content-types
sub_menu:
  - "[About Content Types](#about-content-types)"
  - "[Creating Content Types](#creating-content-types)"
order: 3
---

# Content types

Every editable content object in Plate is basically an abstract object with no atttributes or fields. You will grant the abstract object editable content by defining a content type for it and adding editable [content fields](/docs/content-fields). Plate also adds some default content fields, depending on the content type.

## About Content Types

Plate recognizes two kinds of content types:

#### Inline elements (Element types)
Editable inline elements with partials as theme files. Only addable as elements inside the `content_for` tag. E.g. images, galleries, editable texts, etc.

#### Layoutable posts (Post types)
Objects with it's own layout theme file and approachable via a url. E.g. pages, categories, blog posts, etc.

Both content types' objects can be referenced in the reference content field.

When [creating content types](#creating-content-types) you have to provide the following data:

#### 'Title' and 'Plural title'
These are used to define the content type in the edit screens, visible for the end user while adding or editing the objects with this content type.

#### 'Name for id' and 'Plural name for id'
These are used to define the content type inside the templating engine. These have to be parameterized (downcased, underscores instead of spaces). The singular name will be the variable that calls the object, on which you can call attributes. E.g. `category.name` will return 'Cats and Dogs', because you have an object with post type 'Category', and it's name is 'Cats and Dogs'.

#### Icon name
This is the icon that is used along with the titles in the edit screens.

#### Slug (Post type)
For Post types you have to type in the slug for each language your theme preview site is available in. The slug is the word that will be the first part of the url that for the post: `/:content-type-slug/:object-slug`. For example, in the case of the post type Categories: `/categories/cats-and-dogs`. In this case, `categories` is the slug for the Categories post type, `cats-and-dogs` the slug for the post (object with post type 'Category').

#### Example
Let's say you want to make a 'Colored Button' element content type. You'll fill out the following data:
- Title: `Colored Button`
- Plural title: `Colored Buttons`
- Name for id: `colored_button`
- Plural name for id: `colored_buttons`
- Icon: `crop_16_9`. This Material icon doesn't have anything to do with buttons, but it kinda looks like a button, so...

Now the end user can create actual Colored Button elements. How these buttons look like is up to you: you'll probably need to add [content fields](/docs/content-fields) to them, and have to create a theme file for it: `colored_buttons/colored_button.plate`


## Creating Content Types
- Click on the Content Types menu item in the Site Dashboard
- Click on the floating Add button
- Pick a kind of content type (see above)

<img src="/assets/img/content-types-1.png" width="800">

Fill out the neccessary fields (see [About Content Types](#about-content-types) to learn more about the functions of this data).

<img src="/assets/img/content-types-2.png" width="800">
