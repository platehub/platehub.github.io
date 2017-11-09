---
layout: docs
title: Content Fields
page_url: /docs/content-fields
menu_item: true
id: "content-fields"
sub_menu:
  - "[Name and ID](#name-and-id)"
  - "[Content Field kinds](#content-field-kinds)"
  - "[References](#references)"
  - "[Validation rules](#validation-rules)"
  - "[Creating Content Fields](#creating-content-fields)"
order: 5
---

After you create a [content type](/docs/content-types) you need to add fields to it, so the user can add his content to the object.

Content fields video tutorials (Dutch):
<iframe src="https://player.vimeo.com/video/241871837?color=e95d21&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<iframe src="https://player.vimeo.com/video/241874072?color=e95d21&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Name and ID

Content fields have a `name` and an `id`. The name is used as the label above the field in the edit screens. The id is the key that is used as an attribute to call on the object variable in the theme files. In the example of the 'Colored Button' [content type](/docs/content-types), you could add a field for the background color of the button.

<img src="/assets/img/content-fields-name-id-1.png">

In the user's edit screen for a colored button it would say 'Background color of the button' above the field. In the [theme file](/docs/theme-files) (`colored_buttons/_colored_button.plate`) you would use `colored_button.bg_color` to call the contents of the field on the [object](/docs/templating-reference/objects). In this case, `colored_button` being the object with the 'Colored button' [content type](/docs/content-types), and `bg_color` being the field id and attribute name for the colored_button object. Read the documentation on [objects](/docs/templating-reference/objects) for more on how to call the attributes inside the theme files.

## Content Field kinds

You can add the following kinds of content fields to a content type.

#### Text Field
A single line text field, that can be used for titles etc.

#### Text area
A multiline text field, suitable for longer texts. This field can be turned into a code field with syntax highlighting, so the user can type in code. This field is also best used when using the `edit_text_inline` templating tag.

#### Media field
A field that gives the user access to the media library, where he can pick or upload new images, PDF's and other attachments. Calling a media field object attribute returns an [attachment object](/docs/templating-reference/objects#attachment).

#### Choice field
This field gives the user one or more choices to choose from. You can add possible choices (predefined values), or pick a true/false choice option. The possible choice field kinds are:
- Radio button (1 choice)
- Checkboxes (Multiple choices, saved as an array)
- Dropdown (1 choice)
- An on/off switch (true or false)

#### References field
Read all about references fields [here](#references).

#### Link field
The user can choose a post from a dropdown to link to, an attachment from the media library, or just type in a (external) URL.

## References
In many cases you want to reference objects from another content type. For example, when you're creating a gallery, you want the user to be able to add one or more gallery items. However, these gallery items are standalone objects with a content type and fields themselves. To accomplish this you use the References field.

When creating a References field, you pick a content type to reference. The user chooses from all of this content type's objects from a list in the edit screen. Since there needs to be a value to recognize the referenced objects in this list, you also need to select a text field that is used to represent the object in this list. If the referenced content type does not have a text field, you cannot choose it to reference it.

<img src="/assets/img/content-fields-references-1.png" width="800">

If the referenced content type does not have a text field:
<img src="/assets/img/content-fields-references-3.png">

### Reference context
You alse need to pick a so-called 'Context' for the Reference field. You can choose from Global context and Local context.

#### Global context
The user can pick an object from a list of existing objects that belong to the designated content type, or create a new one. This context is used if you need to add one or more authors to a news article, for example. The same authors are added to other news articles, and those references need to link to the same object.

#### Local context
Everytime the user adds a reference, a new object of the designated content type gets created. Let's stick with the example of the image gallery: every time a gallery gets added a gallery item, a new record needs to be created, since other galleries do not need to reference that exact same object.

<img src="/assets/img/content-fields-references-2.png">

The distinction between these two contexts was made to prevent multiple objects with the exact same attributes being created. In the case of the author for news articles, every news article that has a reference to a certain author, references to the same author object. If an attribute for the author changes, i.e. the author's age, this change needs to be reflected in every reference to the author. So before picking a context, ask yourself: 'can there be multiple references to the same object in my project?' If so, pick global. If not, pick local.

## Validation rules

You can add validation rules to content fields. This means that end users filling in these fields must comply with these rules. If they do not, they cannot save the object they're editing/creating. The most commonly used validation rule is 'required', where the field must have a value before being savd. You can add the following validation Rules:

#### The user is required to enter something in this field
Speaks for itself.

#### Required length of content (text fields)
The content length of the text field must be between, greater than or lower than set numeric value(s).

#### Match content with a pattern (text fields)
You can pass a regular expression. Useful when the content must follow a certain pattern: email, zipcode, only numbers, etc.

#### Allowed file types (media field)
The selected media file must be of one of the allowed file types:
- Image
- PDF
- Audio
- Code
- Word Document (.doc, .docx)
- Excel Spreadsheet
- Powerpoint Presentation
- Font file

#### Required file size (media field)
The selected media file must be between, greater than or lower than set value(s) in file size.

#### Required amount of selected options (checkbox choice field)
The user must check a number of checkboxes that is between, greater than or lower than set numeric value(s).

#### Required amount of referenced objects (references field)
The user must create a number of references that is between, greater than or lower than set numeric value(s).

## Creating content fields

- Click on the Content Types menu item in the Site Dashboard
- Click on the content fields icon next to the content type you want to add the field to.

<img src="/assets/img/content-fields-creating-1.png" width="800">

- Click on the floating Add button

<img src="/assets/img/content-fields-creating-2.png" width="800">

- Pick a [content field kind](#content-field-kinds)

<img src="/assets/img/content-fields-creating-3.png" width="800">

- Put in the field [name and id](#name-and-id) and validation rules of your choosing
- Save
- You can now call the content field id in the content type's theme file, and the user can put content in the field in the edit screens.
